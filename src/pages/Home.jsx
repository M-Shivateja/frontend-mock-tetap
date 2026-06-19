import { Link } from "react-router-dom";

function Home() {
  const instructions = [
    "The exam consists of multiple-choice questions (MCQs).",
    "You can navigate to any question directly using the Question Palette.",
    "You can mark questions for review if you want to double-check them later.",
    "Your answers are saved automatically in your browser so you don't lose progress.",
    "The test will submit automatically when the countdown timer reaches zero.",
  ];

  const features = [
    {
      title: "Real-time Timer",
      desc: "Get simulated exam room pressure with an accurate live countdown timer.",
      icon: (
        <svg className="w-6 h-6 text-blue-600 dark:text-purple-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: "Question Palette",
      desc: "Track answered, unvisited, and review-marked questions at a single glance.",
      icon: (
        <svg className="w-6 h-6 text-blue-600 dark:text-purple-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      ),
    },
    {
      title: "Bilingual Questions",
      desc: "Read questions in both English and Telugu for absolute comprehension.",
      icon: (
        <svg className="w-6 h-6 text-blue-600 dark:text-purple-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5c-.3 1.25-.75 2.5-1.324 3.67M9.764 9a15.012 15.012 0 01-3.29 4.3" />
        </svg>
      ),
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
          Master Your APTET Exam
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
          Prepare effectively with our high-fidelity, responsive mock test environment. Feel the real exam setting, track your speed, and get analytical feedback instantly.
        </p>
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        {/* Left Column: Test & Instructions */}
        <div className="lg:col-span-2 space-y-8">
          {/* Active Exam Card */}
          <div className="bg-gradient-to-br from-white to-blue-50/20 dark:from-[#1f2028] dark:to-purple-950/10 border border-blue-100 dark:border-purple-900/50 rounded-2xl p-8 shadow-xl shadow-blue-500/5 dark:shadow-purple-500/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -mr-8 -mt-8"></div>
            <div className="relative z-10">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="bg-blue-100 text-blue-800 dark:bg-purple-900/40 dark:text-purple-300 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                  APTET 2024
                </span>
                <span className="bg-emerald-100 text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                  Paper-II (Social Studies)
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                TET Social Studies Mock Exam
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-xl">
                This comprehensive sample paper mimics the standard APTET structure. Sharpen your skills in teaching methodology, content knowledge, and child development.
              </p>

              <div className="flex flex-wrap gap-6 text-sm text-gray-500 dark:text-gray-400 mb-8">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>150 Questions</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>150 Minutes</span>
                </div>
              </div>

              <Link
                to="/exam"
                className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 dark:bg-purple-600 dark:hover:bg-purple-700 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg shadow-blue-500/20 dark:shadow-purple-500/20 transform hover:-translate-y-0.5 transition-all duration-200"
              >
                <span>Start Mock Test</span>
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Instructions Box */}
          <div className="bg-white dark:bg-[#1f2028] border border-[#e5e4e7] dark:border-[#2e303a] rounded-2xl p-8 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Important Instructions
            </h3>
            <ul className="space-y-4">
              {instructions.map((inst, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="bg-blue-50 dark:bg-purple-950/40 text-blue-600 dark:text-purple-400 font-bold text-sm w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <span className="text-gray-600 dark:text-gray-300 text-sm md:text-base leading-relaxed">
                    {inst}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Features Panel */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#1f2028] border border-[#e5e4e7] dark:border-[#2e303a] rounded-2xl p-8 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
              Platform Features
            </h3>
            <div className="space-y-6">
              {features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="p-3 bg-blue-50 dark:bg-purple-950/40 rounded-xl shrink-0">
                    {feat.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white text-base">
                      {feat.title}
                    </h4>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-tr from-slate-900 to-slate-800 text-white rounded-2xl p-8 shadow-md">
            <h3 className="font-bold text-lg mb-3 text-indigo-300">
              Need assistance?
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              Our mock platform is built to optimize test speed and endurance. For syllabus guidelines or updates, consult the official APTET authority board.
            </p>
            <div className="text-xs text-indigo-400 font-semibold tracking-wide uppercase">
              APTET Prep Tool • 2026
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
