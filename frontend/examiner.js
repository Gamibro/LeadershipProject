const XLSX = require('xlsx');

const wb = XLSX.readFile('public/Leader Board Marks 3-3.xlsx');
const ws = wb.Sheets[wb.SheetNames[0]];
const data = XLSX.utils.sheet_to_json(ws, {header: 1});

console.log('=== FIRST 25 ROWS ===');
data.slice(0, 25).forEach((row, i) => {
  console.log(`Row ${i+1}:`, JSON.stringify(row));
});

console.log('\n=== Looking for department rows (DBU, DFI, DHA, DMD, DMP, DPR, DYA) ===');
data.forEach((row, i) => {
  const colA = String(row[0] || '').trim().toUpperCase();
  if (['DBU','DFI','DHA','DMD','DMP','DPR','DYA'].includes(colA)) {
    console.log(`Row ${i+1} (Department ${colA}):`, JSON.stringify(row));
  }
});
