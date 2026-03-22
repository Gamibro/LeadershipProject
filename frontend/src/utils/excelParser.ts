import * as XLSX from 'xlsx';
import { Department, Project } from '../types';

// Function to parse date string like "3-Mar" → "03-03-2026"
function parseExcelDate(dateValue: any): string {
  if (!dateValue) return '';

  const dateStr = String(dateValue).trim();

  // Try to parse formats like "3-Mar", "03-Mar", "3-March", etc.
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // Match pattern like "3-Mar" or "03-Mar" or "3-March"
  const match = dateStr.match(/^(\d{1,2})[-/]([A-Za-z]{3,})$/i);

  if (match) {
    const day = parseInt(match[1], 10);
    const monthStr = match[2].toLowerCase().substring(0, 3);

    const monthIndex = monthNames.findIndex(m => m.toLowerCase() === monthStr);

    if (monthIndex !== -1) {
      const year = 2026;
      const formattedDay = day.toString().padStart(2, '0');
      const formattedMonth = (monthIndex + 1).toString().padStart(2, '0');

      return `${formattedDay}-${formattedMonth}-${year}`;
    }
  }

  // Optional: fallback if somehow we get a numeric serial (shouldn't happen with cell.w)
  if (!isNaN(Number(dateStr))) {
    const serial = Number(dateStr);
    const utc_days = Math.floor(serial - 25569);
    const utc_value = utc_days * 86400;
    const date_info = new Date(utc_value * 1000);
    const fractional_day = serial % 1;
    date_info.setSeconds(Math.round(fractional_day * 86400));

    const day = date_info.getUTCDate().toString().padStart(2, '0');
    const month = (date_info.getUTCMonth() + 1).toString().padStart(2, '0');
    const year = date_info.getUTCFullYear();

    return `${day}-${month}-${year}`;
  }

  return '';
}

export interface ExcelDataResult {
  departments: Department[];
  date: string;
}

export async function parseExcelFile(filePath: string): Promise<ExcelDataResult> {
  try {
    const response = await fetch(filePath);
    const arrayBuffer = await response.arrayBuffer();

    const workbook = XLSX.read(arrayBuffer, { type: 'array' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    const rawData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][];

    // ────────────────────────────────────────────────
    // Extract date from cell A1 using the formatted (display) value
    // ────────────────────────────────────────────────
    let extractedDate = '';

    // Get the actual cell object for A1
    const cell = worksheet['A1'];

    if (cell) {
      // Use formatted display value if available ("3-Mar")
      if (cell.w !== undefined && cell.w.trim()) {
        extractedDate = parseExcelDate(cell.w);
        console.log('Extracted formatted date from A1 (cell.w):', cell.w, '→', extractedDate);
      }
      // Fallback to raw value only if no formatted text (should be rare)
      else if (cell.v !== undefined) {
        extractedDate = parseExcelDate(cell.v);
        console.log('Fallback: raw value from A1 (cell.v):', cell.v, '→', extractedDate);
      }
    }

    // If still empty, you can log the whole first row for debugging
    if (!extractedDate && rawData[0]) {
      console.log('First row raw data:', rawData[0]);
    }

    const departments = new Map<string, Department>();

    // ────────────────────────────────────────────────
    // Parse the MAIN LEADERBOARD TABLE
    // Header → row index 5 (0-based), data from row 6
    // ────────────────────────────────────────────────
    for (let i = 6; i < rawData.length && i <= 20; i++) {
      const row = rawData[i];
      if (!row || row.length < 13) continue;

      const code = String(row[0] || '').trim().toUpperCase();
      if (!code || !['DBU','DFI','DHA','DMD','DMP','DPR','DYA'].includes(code)) continue;

      const allocation   = Number(row[1]) || 0;
      const participants = Number(row[2]) || 0;
      const submissions  = Number(row[3]) || 0;

      const totalMarksSubmitted = Number(row[4]) || 0;
      const completed           = Number(row[5]) || 0;
      const totalMarksCompleted = Number(row[6]) || 0;

      const completedPointsAvg  = Number(row[8]) || 0;
      const submissionRatio     = Number(row[9]) || 0;
      const participationRatio  = Number(row[10]) || 0;

      // Leaderboard marks are in column N (index 13) and cm in O (index 14)
      const marks         = Number(row[13]) || 0;
      const leaderboardCm = Number(row[14]) || 0;

      departments.set(code, {
        code,
        allocation,
        participants,
        submissions,
        marks,
        projects: [],
        totalMarksSubmitted,
        completed,
        totalMarksCompleted,
        completedPointsAvg,
        submissionRatio,
        participationRatio,
        leaderboardCm
      });
    }

    // ────────────────────────────────────────────────
    // Parse PROJECT LISTS
    // ────────────────────────────────────────────────
    let currentDept: string | null = null;

    for (let i = 15; i < rawData.length; i++) {
      const row = rawData[i];
      if (!row || row.length < 3) continue;

      const colA = String(row[0] || '').trim().toUpperCase();

      if (['DBU','DFI','DHA','DMD','DMP','DPR','DYA'].includes(colA)) {
        currentDept = colA;
        continue;
      }

      if (colA === '' && String(row[1] || '').trim().toLowerCase().includes('project no')) {
        continue;
      }

      if (currentDept && row[1] && row[2]) {
        const projectNo   = String(row[1]).trim();
        const projectName = String(row[2]).trim();

        if (projectNo.startsWith('WB-') && projectName) {
          const dept = departments.get(currentDept);
          if (dept) {
            const exists = dept.projects.some(p => p.number === projectNo);
            if (!exists) {
              dept.projects.push({
                id: `${currentDept}-${dept.projects.length + 1}`,
                number: projectNo,
                name: projectName
              });
            }
          }
        }
      }

      if (currentDept && row.every(cell => cell == null || cell === '')) {
        currentDept = null;
      }
    }

    const result = Array.from(departments.values())
      .sort((a, b) => b.marks - a.marks);

    console.log('Parsed Leader Board Marks 3-3.xlsx successfully');
    console.table(result.map(d => ({
      code: d.code,
      marks: d.marks,
      cm: d.leaderboardCm,
      projects: d.projects.length,
      completed: d.completed,
      completedPointsAvg: (d.completedPointsAvg ?? 0).toFixed(2),
      submissionRatio: (d.submissionRatio ?? 0).toFixed(2),
      participationRatio: (d.participationRatio ?? 0).toFixed(2)
    })));

    return {
      departments: result,
      date: extractedDate
    };

  } catch (error) {
    console.error('Excel parsing failed:', error);
    return {
      departments: [],
      date: ''
    };
  }
}