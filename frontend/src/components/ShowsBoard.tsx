import { motion } from 'framer-motion';
import { Department } from '../types';
interface ShowsBoardProps {
  departments: Department[];
  competitionDate?: string;
}
export function ShowsBoard({ departments, competitionDate }: ShowsBoardProps) {
  // Find the maximum marks to calculate percentages
  const maxMarks = Math.max(...departments.map((d) => d.marks), 100);
  return (
    <div className="w-full max-w-7xl mx-auto bg-white shadow-xl overflow-hidden min-h-[600px] flex flex-col md:flex-row mb-12">
      {/* Left Panel - Branding Image */}
      <div className="w-full md:w-[40%] bg-white p-8 flex items-center justify-center border-r border-gray-100">
        <img
          src="/image.png"
          alt="Colombo Dockyard Branding"
          className="w-full h-auto object-contain max-h-[500px]" />

      </div>

      {/* Right Panel - Leaderboard Content */}
      <div className="w-full md:w-[60%] bg-[#D6DEFF] p-8 md:p-12 flex flex-col relative">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-3 tracking-tight">
            LEADERBOARD
          </h2>

          {/* Decorative Divider */}
          <div className="flex items-center justify-center gap-4 mb-3 opacity-80">
            <div className="h-px w-24 bg-black"></div>
            <div className="text-xl">❦</div>
            <div className="h-px w-24 bg-black"></div>
          </div>

          <p className="text-lg md:text-xl text-gray-800 font-medium tracking-wide uppercase">
            THINK ANEW, RISE TOGETHER
          </p>
        </div>

        {/* Chart Card */}
        <div className="bg-white rounded-[2rem] p-8 shadow-sm flex-1 flex flex-col justify-center">
          <div className="space-y-5">
            {departments.map((dept) => {
              const percentage = dept.marks / maxMarks * 100;
              return (
                <div key={dept.code} className="flex items-center gap-4">
                  {/* Department Code */}
                  <div className="w-12 font-bold text-gray-900 text-lg shrink-0">
                    {dept.code}
                  </div>

                  {/* Bar Track */}
                  <div className="flex-1 h-4 bg-gray-200 rounded-full relative">
                    {/* Animated Bar */}
                    <motion.div
                      className="h-full bg-[#00D4FF] rounded-full relative"
                      initial={{
                        width: 0
                      }}
                      animate={{
                        width: `${percentage}%`
                      }}
                      transition={{
                        duration: 1,
                        ease: 'easeOut'
                      }}>

                      {/* Ship Emoji */}
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 text-2xl transform scale-x-[-1] z-10 filter drop-shadow-sm">
                        🚢
                      </div>
                    </motion.div>
                  </div>
                </div>);

            })}
          </div>
        </div>

        {/* Footer Text */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 italic text-sm md:text-base">
            Status of Lean Departmental Competition as at {competitionDate || '09-02-2026'}
          </p>
        </div>
      </div>
    </div>);

}