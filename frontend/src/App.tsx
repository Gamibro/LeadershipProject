import { useState, useEffect } from 'react';
import { ShowsBoard } from './components/ShowsBoard';
import { DepartmentTable } from './components/DepartmentTable';
import { Department } from './types';
import { parseExcelFile } from './utils/excelParser';
// Initial Data
// const INITIAL_DATA: Department[] = [
// {
//   code: 'DBU',
//   allocation: 48,
//   participants: 38,
//   submissions: 2,
//   marks: 43.71,
//   projects: [
//   {
//     id: '1',
//     number: 'WB-050',
//     name: 'ORDERING STATIONERY QUARTERLY'
//   },
//   {
//     id: '2',
//     number: 'WB-051',
//     name: 'REDUCING PAPER USAGE IN DRYDOCK QUOTATIONS PROCESS'
//   }]

// },
// {
//   code: 'DFI',
//   allocation: 7,
//   participants: 3,
//   submissions: 0,
//   marks: 10.0,
//   projects: []
// },
// {
//   code: 'DHA',
//   allocation: 56,
//   participants: 27,
//   submissions: 2,
//   marks: 53.39,
//   projects: [
//   {
//     id: '3',
//     number: 'WB-053',
//     name: 'LABEL SYSTEM FOR IDENTIFY THE VEHICLE OWNERS CONTACT'
//   },
//   {
//     id: '4',
//     number: 'WB-059',
//     name: 'REDUCE WATER BATTLE CONSUMPTION'
//   }]

// },
// {
//   code: 'DMD',
//   allocation: 48,
//   participants: 35,
//   submissions: 2,
//   marks: 60.29,
//   projects: [
//   {
//     id: '5',
//     number: 'WB-060',
//     name: 'LONG RANGE WIRELESS FIRE ALARM INDICATOR RECEIVER'
//   },
//   {
//     id: '6',
//     number: 'WB-052',
//     name: 'REUSABLE FLOOR PROTECTION SOLUTION'
//   }]

// },
// {
//   code: 'DMP',
//   allocation: 23,
//   participants: 21,
//   submissions: 0,
//   marks: 18.18,
//   projects: []
// },
// {
//   code: 'DPR',
//   allocation: 402,
//   participants: 259,
//   submissions: 7,
//   marks: 44.78,
//   projects: [
//   {
//     id: '7',
//     number: 'WB-047',
//     name: 'DEVELOP A VACUUM CLEANER'
//   },
//   {
//     id: '8',
//     number: 'WB-048',
//     name: 'DEVELOP A DIVIDER'
//   },
//   {
//     id: '9',
//     number: 'WB-049',
//     name: 'ELIMINATED THE NEED FOR ADDITIONAL THIRD PARTY CRANE RENTAL BY DEPLOYING AN IN-HOUSE 160 T CAPACITY CRANE EXECUTE THE ASSEMBLY OPERATIONS'
//   },
//   {
//     id: '10',
//     number: 'WB-054',
//     name: 'CREATE AN EXCEL FILE FOR STANDARDIZE ATTENDANCE OF SUB CONTRACTS'
//   },
//   {
//     id: '11',
//     number: 'WB-055',
//     name: 'BUILD VACUUM TESTING BOXES'
//   },
//   {
//     id: '12',
//     number: 'WB-058',
//     name: 'BULB HOLDER FOR SANDBLASTING'
//   }]

// },
// {
//   code: 'DYA',
//   allocation: 123,
//   participants: 77,
//   submissions: 3,
//   marks: 53.16,
//   projects: [
//   {
//     id: '13',
//     number: 'WB-057',
//     name: 'KEROSENE BATH'
//   },
//   {
//     id: '14',
//     number: 'WB-061',
//     name: 'HYDRAULIC BENCH PRESS- 10 T'
//   },
//   {
//     id: '15',
//     number: 'WB-062',
//     name: 'REDUCE GAS USER END HOLE FROM 7MM TO 1 MM'
//   }]

// }];

export function App() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [competitionDate, setCompetitionDate] = useState<string>('09-02-2026');
  const [isLoadingExcel, setIsLoadingExcel] = useState(false);

  const handleUpdateDepartment = (updatedDept: Department) => {
    setDepartments((prev) =>
    prev.map((dept) => dept.code === updatedDept.code ? updatedDept : dept)
    );
  };

  // Load Excel data on initial render
  useEffect(() => {
    const loadExcelData = async () => {
      setIsLoadingExcel(true);
      
      try {
        // Load Excel data
        const excelData = await parseExcelFile('/Leader Board Marks 3-3.xlsx');
        if (excelData && excelData.departments && excelData.departments.length > 0) {
          setDepartments(excelData.departments);
          if (excelData.date) {
            setCompetitionDate(excelData.date);
          }
        }
      } catch (error) {
        console.error('Failed to load Excel data:', error);
        // Keep initial data if Excel loading fails
      } finally {
        setIsLoadingExcel(false);
      }
    };

    loadExcelData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {isLoadingExcel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 shadow-xl">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7B8CDE] mx-auto mb-4"></div>
              <p className="text-gray-700 font-semibold">Loading Excel data...</p>
            </div>
          </div>
        </div>
      )}

      <main className="container mx-auto px-4 py-8">
        {/* New Combined Board Section */}
        <section className="mb-12">
          <ShowsBoard departments={departments} competitionDate={competitionDate} />
        </section>

        {/* Table Section */}
        <section className="mb-16">
          <DepartmentTable departments={departments} />
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white py-8 mt-auto">
        <div className="container mx-auto px-4 flex justify-center">
          <img
            src="/4.png"
            alt="Colombo Dockyard PLC - an Odyssey of Excellence"
            className="h-20 md:h-24 object-contain" />

        </div>
      </footer>
    </div>);

}
