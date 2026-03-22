import React from 'react';
import { motion } from 'framer-motion';
import { Department } from '../types';
interface LeaderboardChartProps {
  departments: Department[];
}
export function LeaderboardChart({ departments }: LeaderboardChartProps) {
  // Find the maximum marks to calculate percentages
  const maxMarks = Math.max(...departments.map((d) => d.marks), 100); // Default to 100 if all are 0
  return (
    <div className="w-full max-w-5xl mx-auto bg-white rounded-3xl shadow-lg p-8 mb-12">
      <div className="space-y-6">
        {departments.map((dept) => {
          const percentage = dept.marks / maxMarks * 100;
          return (
            <div key={dept.code} className="flex items-center gap-4">
              {/* Department Label */}
              <div className="w-16 font-bold text-gray-800 text-lg shrink-0">
                {dept.code}
              </div>

              {/* Bar Track */}
              <div className="flex-1 h-8 bg-gray-100 rounded-full relative overflow-visible">
                {/* Animated Bar */}
                <motion.div
                  className="h-full bg-[#00D4FF] rounded-l-full relative flex items-center"
                  initial={{
                    width: 0
                  }}
                  animate={{
                    width: `${percentage}%`
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 50,
                    damping: 15
                  }}
                  style={{
                    minWidth: '2rem'
                  }} // Ensure ship is always visible
                >
                  {/* Ship Emoji at the tip */}
                  <div className="absolute right-0 translate-x-1/2 -translate-y-1 text-2xl transform scale-x-[-1]">
                    🚢
                  </div>
                </motion.div>
              </div>

              {/* Score Label (Optional, but good for clarity) */}
              <div className="w-16 text-right font-medium text-gray-600 shrink-0">
                {dept.marks.toFixed(2)}
              </div>
            </div>);

        })}
      </div>
    </div>);

}