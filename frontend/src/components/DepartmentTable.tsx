import React, { Fragment } from 'react';
import { Department } from '../types';

interface DepartmentTableProps {
  departments: Department[];
}

export function DepartmentTable({ departments }: DepartmentTableProps) {
  // Helper to render a progress bar for ratios (decimal values like 4.44)
  const renderRatio = (value: number) => (
    <div className="flex items-center gap-2">
      <span className="w-12 text-right">{value.toFixed(2)}</span>
      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-500 rounded-full transition-all duration-500"
          style={{ width: `${Math.min(value, 100)}%` }}
        />
      </div>
    </div>
  );

  // Number of columns in the table (used for projects row colSpan)
  const COLUMN_COUNT = 12;

  return (
    <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 pb-12">
      {/* ===== DESKTOP: separate tables per department ===== */}
      <div className="hidden md:block space-y-6">
        {departments.map((dept) => (
          <div key={dept.code} className="overflow-x-auto rounded-lg shadow-md border border-blue-100">
            <table className="w-full min-w-[1200px] table-auto border-collapse bg-white">
              <thead className="bg-[#7B8CDE] text-white">
                {/* Group headers row */}
                <tr className="text-sm">
                  <th
                    rowSpan={2}
                    className="px-4 py-3 text-left font-semibold uppercase tracking-wider border-r border-blue-200"
                  >
                    Dept
                  </th>
                  <th
                    colSpan={4}
                    className="px-4 py-2 text-center font-semibold uppercase tracking-wider border-r border-blue-200 border-b border-white"
                  >
                    Basic
                  </th>
                  <th
                    colSpan={2}
                    className="px-4 py-2 text-center font-semibold uppercase tracking-wider border-r border-blue-200 border-b border-white"
                  >
                    Marks Progress
                  </th>
                  <th
                    colSpan={3}
                    className="px-4 py-2 text-center font-semibold uppercase tracking-wider border-r border-blue-200 border-b border-white"
                  >
                    Ratios
                  </th>
                  <th
                    rowSpan={2}
                    className="px-4 py-3 text-center font-semibold uppercase tracking-wider border-r border-blue-200"
                  >
                    Leaderboard<br />CM
                  </th>
                  <th
                    rowSpan={2}
                    className="px-4 py-3 text-center font-semibold uppercase tracking-wider bg-blue-600"
                  >
                    Board<br />Marks
                  </th>
                </tr>
                {/* Sub‑headers row */}
                <tr className="bg-[#7B8CDE]/90 text-white text-xs">
                  <th className="px-4 py-2 text-left font-medium border-r border-blue-200">Allocations</th>
                  <th className="px-4 py-2 text-left font-medium border-r border-blue-200">Participation</th>
                  <th className="px-4 py-2 text-left font-medium border-r border-blue-200">Submission</th>
                  <th className="px-4 py-2 text-left font-medium border-r border-blue-200">Completed</th>
                  <th className="px-4 py-2 text-left font-medium border-r border-blue-200">Submission Marks</th>
                  <th className="px-4 py-2 text-left font-medium border-r border-blue-200">Completed Marks</th>
                  <th className="px-4 py-2 text-left font-medium border-r border-blue-200">Submission</th>
                  <th className="px-4 py-2 text-left font-medium border-r border-blue-200">Participation</th>
                  <th className="px-4 py-2 text-left font-medium border-r border-blue-200">Completed Pts Avg</th>
                </tr>
              </thead>
              <tbody>
                <Fragment key={dept.code}>
                  {/* Main row */}
                  <tr className="bg-white hover:bg-blue-50/50 transition-colors">
                    <td className="sticky left-0 bg-inherit px-4 py-3 font-bold text-gray-800 border-r border-blue-100">
                      {dept.code}
                    </td>
                    <td className="px-4 py-3 text-gray-800 border-r border-blue-100">{dept.allocation}</td>
                    <td className="px-4 py-3 text-gray-800 border-r border-blue-100">{dept.participants}</td>
                    <td className="px-4 py-3 text-gray-800 border-r border-blue-100">{dept.submissions}</td>
                    <td className="px-4 py-3 text-gray-800 border-r border-blue-100">{dept.completed || 0}</td>
                    <td className="px-4 py-3 text-gray-800 border-r border-blue-100">{dept.totalMarksSubmitted || 0}</td>
                    <td className="px-4 py-3 text-gray-800 border-r border-blue-100">{dept.totalMarksCompleted || 0}</td>
                    <td className="px-4 py-3 border-r border-blue-100">
                      {renderRatio(dept.submissionRatio || 0)}
                    </td>
                    <td className="px-4 py-3 border-r border-blue-100">
                      {renderRatio(dept.participationRatio || 0)}
                    </td>
                    <td className="px-4 py-3 text-gray-800 border-r border-blue-100">
                      {dept.completedPointsAvg?.toFixed(2) || '0.00'}
                    </td>
                    <td className="px-4 py-3 text-center border-r border-blue-100">
                      <span className="inline-flex items-center gap-1">
                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2 2 2 2-2 2 2 2-2 2 2 2-2 2 2" />
                        </svg>
                        {dept.leaderboardCm?.toFixed(1) || '0.0'} cm
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center font-bold text-blue-900 bg-blue-50/50">
                      {dept.marks.toFixed(2)}
                    </td>
                  </tr>
                  {/* Nested projects row */}
                  <tr>
                    <td colSpan={COLUMN_COUNT} className="p-0 border-b border-blue-100">
                      <div className="bg-white px-6 py-4">
                        <div className="rounded-lg border border-blue-100 overflow-hidden">
                          <div className="bg-[#7B8CDE]/10 px-4 py-2 text-sm font-semibold text-blue-900">
                            Projects – {dept.code}
                          </div>
                          {dept.projects.length > 0 ? (
                            <div className="divide-y divide-blue-50 max-h-60 overflow-y-auto">
                              {dept.projects.map((project) => (
                                <div key={project.id} className="flex items-start gap-4 px-4 py-2 hover:bg-blue-50/50">
                                  <span className="text-xs font-mono text-gray-500 w-20">{project.number}</span>
                                  <span className="text-sm text-gray-700 flex-1">{project.name}</span>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="px-4 py-3 text-sm text-gray-500 italic">No projects listed</div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                </Fragment>
              </tbody>
            </table>
          </div>
        ))}
      </div>

      {/* ===== MOBILE CARD VIEW (unchanged) ===== */}
      <div className="md:hidden space-y-4">
        {departments.map((dept) => (
          <div key={dept.code} className="bg-white rounded-lg shadow-md border border-blue-100 overflow-hidden">
            {/* Header */}
            <div className="bg-[#7B8CDE] px-4 py-3 flex justify-between items-center">
              <span className="text-white font-bold text-lg">{dept.code}</span>
              <span className="text-white text-2xl font-bold">{dept.marks.toFixed(2)}</span>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-px bg-blue-100">
              <StatCard label="Allocation" value={dept.allocation} />
              <StatCard label="Participants" value={dept.participants} />
              <StatCard label="Submissions" value={dept.submissions} />
              <StatCard label="Sub. Marks" value={dept.totalMarksSubmitted || 0} />
              <StatCard label="Completed" value={dept.completed || 0} />
              <StatCard label="Comp. Marks" value={dept.totalMarksCompleted || 0} />
              <StatCard label="Comp. Avg" value={dept.completedPointsAvg?.toFixed(2) || '0.00'} />
              <StatCard
                label="Submission Ratio"
                value={
                  <div className="flex items-center gap-1">
                    <span>{(dept.submissionRatio || 0).toFixed(1)}%</span>
                    <div className="w-12 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500" style={{ width: `${Math.min(dept.submissionRatio || 0, 100)}%` }} />
                    </div>
                  </div>
                }
              />
              <StatCard
                label="Participation Ratio"
                value={
                  <div className="flex items-center gap-1">
                    <span>{(dept.participationRatio || 0).toFixed(1)}%</span>
                    <div className="w-12 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500" style={{ width: `${Math.min(dept.participationRatio || 0, 100)}%` }} />
                    </div>
                  </div>
                }
              />
              <StatCard label="Leaderboard CM" value={`${(dept.leaderboardCm || 0).toFixed(2)} cm`} />
            </div>

            {/* Projects */}
            <div className="p-3">
              <div className="bg-blue-50/50 rounded-lg border border-blue-100 overflow-hidden">
                <div className="bg-[#7B8CDE]/20 px-4 py-2 text-sm font-semibold text-blue-900">PROJECTS</div>
                {dept.projects.length > 0 ? (
                  <div className="divide-y divide-blue-100 max-h-48 overflow-y-auto">
                    {dept.projects.map((project) => (
                      <div key={project.id} className="px-4 py-2">
                        <div className="text-xs font-semibold text-gray-500">{project.number}</div>
                        <div className="text-sm text-gray-700">{project.name}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="px-4 py-3 text-sm text-gray-500 italic text-center">No projects listed</div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Helper component for mobile stat cards
const StatCard = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="bg-[#EBF0FF] px-3 py-2">
    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">{label}</div>
    <div className="text-base font-semibold text-gray-800">{value}</div>
  </div>
);