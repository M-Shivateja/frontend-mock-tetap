import { useState } from "react";
import { useLocation, Link } from "react-router-dom";

function ResultPage() {
  const location = useLocation();

  const { total = 0, correct = 0, answers = {}, questions = [] } = location.state || {};
  const [filter, setFilter] = useState("all"); // "all", "correct", "incorrect", "unattempted"

  // If accessed directly without exam state
  if (!total) {
    return (
      <div className="max-w-md mx-auto my-16 px-4 text-center">
        <div className="bg-white dark:bg-[#1f2028] border border-[#e5e4e7] dark:border-[#2e303a] rounded-2xl p-8 shadow-sm">
          <div className="w-16 h-16 bg-amber-100 dark:bg-amber-950/30 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            No Exam Record Found
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            It looks like you haven't taken the mock exam yet, or your previous results were cleared.
          </p>
          <Link
            to="/"
            className="inline-flex items-center justify-center w-full bg-blue-600 dark:bg-purple-600 hover:bg-blue-700 dark:hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-xl shadow-md transition-colors"
          >
            Go back to Home
          </Link>
        </div>
      </div>
    );
  }

  const answeredCount = Object.keys(answers).length;
  const wrong = answeredCount - correct;
  const skipped = total - answeredCount;
  const percentage = Number(((correct / total) * 100).toFixed(1));

  // Determine feedback based on score
  let ratingText = "Keep Learning!";
  let ratingDesc = "Don't discourage! Consistency is the key to mastering social studies.";
  let ringColor = "stroke-rose-500";
  let textColor = "text-rose-500";

  if (percentage >= 80) {
    ratingText = "Outstanding Performance!";
    ratingDesc = "Sensational! You are fully prepared to excel in the upcoming APTET examination.";
    ringColor = "stroke-emerald-500";
    textColor = "text-emerald-500";
  } else if (percentage >= 50) {
    ratingText = "Good Effort!";
    ratingDesc = "Solid attempt! With a little more revision on weaker areas, you'll reach the top.";
    ringColor = "stroke-blue-500";
    textColor = "text-blue-500";
  }

  const filteredQuestions = questions.filter((q) => {
    const qId = q._id || q.id;
    const selectedIndex = answers[qId];
    const correctIndex = q.answer !== undefined ? q.answer : q.answerIndex;
    const isAnswered = selectedIndex !== undefined;
    const isCorrect = isAnswered && selectedIndex === correctIndex;

    if (filter === "correct") return isCorrect;
    if (filter === "incorrect") return isAnswered && !isCorrect;
    if (filter === "unattempted") return !isAnswered;
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Banner */}
      <div className="text-center mb-10">
        <span className="bg-blue-100 text-blue-800 dark:bg-purple-900/40 dark:text-purple-300 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">
          Report Card
        </span>
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mt-3">
          Mock Test Result
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          APTET Paper-II Social Studies Sample Paper
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
        {/* Left Side: Dynamic Score Ring Panel */}
        <div className="md:col-span-5 bg-white dark:bg-[#1f2028] border border-[#e5e4e7] dark:border-[#2e303a] p-8 rounded-2xl shadow-sm flex flex-col justify-between text-center">
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-6">
              Score Analysis
            </h3>

            {/* Circular Progress Bar */}
            <div className="relative w-40 h-40 mx-auto mb-6 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                {/* Background Ring */}
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  className="stroke-gray-100 dark:stroke-gray-800"
                  strokeWidth="12"
                  fill="transparent"
                />
                {/* Active Ring */}
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  className={`${ringColor} transition-all duration-1000 ease-out`}
                  strokeWidth="12"
                  fill="transparent"
                  strokeDasharray={2 * Math.PI * 70}
                  strokeDashoffset={2 * Math.PI * 70 * (1 - percentage / 100)}
                  strokeLinecap="round"
                />
              </svg>
              {/* Inner Text */}
              <div className="absolute flex flex-col items-center">
                <span className="text-3xl font-extrabold text-gray-900 dark:text-white font-mono">
                  {percentage}%
                </span>
                <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider mt-0.5">
                  Accuracy
                </span>
              </div>
            </div>

            <h4 className={`text-xl font-black ${textColor} mb-2`}>
              {ratingText}
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed px-2">
              {ratingDesc}
            </p>
          </div>

          <div className="border-t border-[#e5e4e7] dark:border-[#2e303a] mt-8 pt-6">
            <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block">
              Performance Level
            </span>
            <span className="text-sm font-extrabold text-gray-700 dark:text-gray-300 mt-1 block">
              {correct} / {total} Correct Answers
            </span>
          </div>
        </div>

        {/* Right Side: Detailed Metrics & Navigation */}
        <div className="md:col-span-7 flex flex-col gap-6">
          {/* Detailed Statistics Cards */}
          <div className="bg-white dark:bg-[#1f2028] border border-[#e5e4e7] dark:border-[#2e303a] p-6 rounded-2xl shadow-sm flex-grow">
            <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-6">
              Scorecard Breakdown
            </h3>

            <div className="space-y-4">
              {/* Correct Answers */}
              <div className="flex items-center justify-between p-4 bg-emerald-50/50 dark:bg-emerald-950/10 border border-emerald-100 dark:border-emerald-900/50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white text-sm">
                      Correct Answers
                    </h4>
                    <p className="text-xs text-gray-500">Points earned</p>
                  </div>
                </div>
                <span className="font-mono font-black text-emerald-600 dark:text-emerald-400 text-lg">
                  {correct}
                </span>
              </div>

              {/* Wrong Answers */}
              <div className="flex items-center justify-between p-4 bg-rose-50/50 dark:bg-rose-950/10 border border-rose-100 dark:border-rose-900/50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-rose-500 rounded-lg flex items-center justify-center text-white shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white text-sm">
                      Incorrect Answers
                    </h4>
                    <p className="text-xs text-gray-500">Need improvement</p>
                  </div>
                </div>
                <span className="font-mono font-black text-rose-600 dark:text-rose-400 text-lg">
                  {wrong}
                </span>
              </div>

              {/* Skipped Answers */}
              <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/20 border border-gray-200 dark:border-gray-800 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-400 dark:bg-gray-600 rounded-lg flex items-center justify-center text-white shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white text-sm">
                      Unattempted Questions
                    </h4>
                    <p className="text-xs text-gray-500">Passed / Skipped</p>
                  </div>
                </div>
                <span className="font-mono font-black text-gray-600 dark:text-gray-400 text-lg">
                  {skipped}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons Panel */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/exam"
              className="flex-1 inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 dark:bg-purple-600 dark:hover:bg-purple-700 text-white font-extrabold py-4 px-6 rounded-2xl shadow-lg shadow-blue-500/10 dark:shadow-purple-500/10 transform hover:-translate-y-0.5 transition-all duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 7.89M9 11l3-3 3 3m-3-3v12" />
              </svg>
              <span>Retake Test</span>
            </Link>
            <Link
              to="/"
              className="flex-1 inline-flex items-center justify-center border-2 border-gray-300 dark:border-[#2e303a] hover:bg-gray-50 dark:hover:bg-[#2e303a] text-gray-700 dark:text-gray-200 font-extrabold py-4 px-6 rounded-2xl transition-all duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Detailed Question Review Section */}
      {questions.length > 0 && (
        <div className="mt-12 pt-10 border-t border-[#e5e4e7] dark:border-[#2e303a]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">
                Detailed Question Review
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Review your answers, see correct options, and check which ones you got correct or wrong.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: "all", label: "All", count: total },
                { id: "correct", label: "Correct", count: correct },
                { id: "incorrect", label: "Incorrect", count: wrong },
                { id: "unattempted", label: "Unattempted", count: skipped },
              ].map((btn) => (
                <button
                  key={btn.id}
                  onClick={() => setFilter(btn.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-150 cursor-pointer ${
                    filter === btn.id
                      ? "bg-blue-600 dark:bg-purple-600 text-white shadow-sm"
                      : "bg-gray-100 hover:bg-gray-200 dark:bg-[#1f2028] dark:hover:bg-[#2e303a] text-gray-600 dark:text-gray-300 border border-[#e5e4e7] dark:border-[#2e303a]"
                  }`}
                >
                  {btn.label} ({btn.count})
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {filteredQuestions.length === 0 ? (
              <div className="text-center py-12 bg-white dark:bg-[#1f2028] rounded-2xl border border-dashed border-gray-300 dark:border-gray-800">
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                  No questions found in this category.
                </p>
              </div>
            ) : (
              filteredQuestions.map((q, idx) => {
                const qId = q._id || q.id;
                const selectedIndex = answers[qId];
                const correctIndex = q.answer !== undefined ? q.answer : q.answerIndex;
                const isAnswered = selectedIndex !== undefined;
                const isCorrect = isAnswered && selectedIndex === correctIndex;

                const isBilingualObj = q.questionEn && q.questionTe && (q.questionEn.trim() !== q.questionTe.trim());
                const isOptionsObj = q.options && typeof q.options[0] === "object";

                return (
                  <div
                    key={qId}
                    className={`bg-white dark:bg-[#1f2028] border rounded-2xl p-6 shadow-sm transition-all duration-300 ${
                      !isAnswered
                        ? "border-amber-200 dark:border-amber-950/40 bg-amber-50/5"
                        : isCorrect
                        ? "border-emerald-200 dark:border-emerald-950/40 bg-emerald-50/5"
                        : "border-rose-200 dark:border-rose-950/40 bg-rose-50/5"
                    }`}
                  >
                    {/* Badge Header */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                        Question {q.questionNo || idx + 1}
                      </span>
                      <span
                        className={`text-xs font-extrabold px-3 py-1 rounded-full ${
                          !isAnswered
                            ? "bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300"
                            : isCorrect
                            ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300"
                            : "bg-rose-100 text-rose-800 dark:bg-rose-950/40 dark:text-rose-300"
                        }`}
                      >
                        {!isAnswered ? "Skipped" : isCorrect ? "Correct" : "Incorrect"}
                      </span>
                    </div>

                    {/* Question Text */}
                    <div className="space-y-2 mb-6">
                      {isBilingualObj ? (
                        <>
                          <h4 className="text-base font-bold text-gray-900 dark:text-white leading-relaxed">
                            {q.questionEn}
                          </h4>
                          <h4 className="text-sm text-indigo-600 dark:text-purple-400 font-semibold leading-relaxed border-l-2 border-indigo-500 pl-3">
                            {q.questionTe}
                          </h4>
                        </>
                      ) : (
                        <h4 className="text-base font-bold text-gray-900 dark:text-white leading-relaxed whitespace-pre-line">
                          {q.questionText || q.questionEn || q.questionTe}
                        </h4>
                      )}
                    </div>

                    {/* Options Review */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {q.options &&
                        q.options.map((option, optIdx) => {
                          const isOptionSelected = selectedIndex === optIdx;
                          const isOptionCorrect = correctIndex === optIdx;

                          let optBorderColor = "border-gray-200 dark:border-[#2e303a]";
                          let optBgColor = "bg-white dark:bg-[#1f2028]";
                          let icon = null;

                          if (isOptionCorrect) {
                            optBorderColor = "border-emerald-500 dark:border-emerald-500";
                            optBgColor = "bg-emerald-50/20 dark:bg-emerald-950/10";
                            icon = (
                              <span className="w-5 h-5 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xs shrink-0 font-bold">
                                ✓
                              </span>
                            );
                          } else if (isOptionSelected && !isCorrect) {
                            optBorderColor = "border-rose-500 dark:border-rose-500";
                            optBgColor = "bg-rose-50/20 dark:bg-rose-950/10";
                            icon = (
                              <span className="w-5 h-5 bg-rose-500 text-white rounded-full flex items-center justify-center text-xs shrink-0 font-bold">
                                ✗
                              </span>
                            );
                          }

                          return (
                            <div
                              key={optIdx}
                              className={`border-2 p-4 rounded-xl flex items-start gap-3 ${optBorderColor} ${optBgColor}`}
                            >
                              <span className="text-xs font-extrabold text-gray-400 bg-gray-100 dark:bg-gray-800 w-5 h-5 rounded-md flex items-center justify-center shrink-0">
                                {optIdx + 1}
                              </span>
                              
                              <div className="flex-grow">
                                {isOptionsObj ? (
                                  option.en && option.te && option.en.trim() !== option.te.trim() ? (
                                    <div className="space-y-0.5">
                                      <div className="font-semibold text-gray-800 dark:text-gray-200 text-sm">
                                        {option.en}
                                      </div>
                                      <div className="text-gray-500 dark:text-gray-400 text-xs">
                                        {option.te}
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="font-semibold text-gray-800 dark:text-gray-200 text-sm">
                                      {option.en || option.te}
                                    </div>
                                  )
                                ) : (
                                  <div className="font-semibold text-gray-800 dark:text-gray-200 text-sm">
                                    {option}
                                  </div>
                                )}
                              </div>

                              {icon}
                            </div>
                          );
                        })}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ResultPage;
