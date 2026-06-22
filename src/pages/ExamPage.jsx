import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import QuestionCard from "../components/QuestionCard";
import QuestionPalette from "../components/QuestionPalette";
import Timer from "../components/Timer";
import localQuestions from "../data/questions";

function ExamPage() {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [isMobilePaletteOpen, setIsMobilePaletteOpen] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(() => {
    return (
      Number(localStorage.getItem("currentQuestion")) || 0
    );
  });

  const [answers, setAnswers] = useState(() => {
    const saved = localStorage.getItem("examAnswers");
    return saved ? JSON.parse(saved) : {};
  });

  const [markedForReview, setMarkedForReview] = useState(() => {
    const saved = localStorage.getItem("reviewQuestions");
    return saved ? JSON.parse(saved) : {};
  });

  const [timeLeft, setTimeLeft] = useState(() => {
    const saved = localStorage.getItem("examTime");
    return saved ? Number(saved) : 150 * 60;
  });

  const submitExam = useCallback((isAuto = false) => {
    if (isAuto || window.confirm("Are you sure you want to submit your test? Your progress will be recorded.")) {
      let correctCount = 0;
      questions.forEach((q) => {
        const qId = q._id || q.id;
        const selectedIndex = answers[qId];
        const correctIndex = q.answer !== undefined ? q.answer : q.answerIndex;
        if (selectedIndex !== undefined && selectedIndex === correctIndex) {
          correctCount++;
        }
      });

      localStorage.removeItem("examAnswers");
      localStorage.removeItem("examTime");
      localStorage.removeItem("currentQuestion");
      localStorage.removeItem("reviewQuestions");

      navigate("/result", {
        state: {
          total: questions.length,
          correct: correctCount,
          answers,
          questions,
        },
      });
    }
  }, [questions, answers, navigate]);

  // Load Questions
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const response = await axios.get("https://backend-mock-tetap-1.onrender.com/api/questions");
        if (response.data && response.data.length > 0) {
          setQuestions(response.data);
        } else {
          setQuestions(localQuestions);
        }
      } catch (error) {
        console.warn("Questions API error, falling back to local questions", error);
        setQuestions(localQuestions);
      }
    };

    loadQuestions();
  }, []);

  const submitExamRef = useRef();

  useEffect(() => {
    submitExamRef.current = submitExam;
  }, [questions, answers, submitExam]); // Update ref when questions, answers or submitExam change

  // Timer Countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (submitExamRef.current) {
            submitExamRef.current(true); // Pass true to auto-submit without prompt
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Persistence Effects
  useEffect(() => {
    localStorage.setItem("examAnswers", JSON.stringify(answers));
  }, [answers]);

  useEffect(() => {
    localStorage.setItem("currentQuestion", currentIndex.toString());
  }, [currentIndex]);

  useEffect(() => {
    localStorage.setItem("examTime", timeLeft.toString());
  }, [timeLeft]);

  useEffect(() => {
    localStorage.setItem("reviewQuestions", JSON.stringify(markedForReview));
  }, [markedForReview]);

  // Prevent accidental exits
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  if (!questions.length) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent dark:border-purple-500 dark:border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-300 font-medium">Loading Exam Questions...</p>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const currentQuestionId = currentQuestion._id || currentQuestion.id;

  const handleSelect = (optionIndex) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestionId]: optionIndex,
    }));
  };

  const clearResponse = () => {
    setAnswers((prev) => {
      const updated = { ...prev };
      delete updated[currentQuestionId];
      return updated;
    });
  };

  const toggleReview = () => {
    setMarkedForReview((prev) => ({
      ...prev,
      [currentQuestionId]: !prev[currentQuestionId],
    }));
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const previousQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };



  // Stats calculation
  const totalQuestions = questions.length;
  const answeredCount = Object.keys(answers).length;
  const reviewCount = Object.keys(markedForReview).filter((id) => markedForReview[id]).length;
  const unvisitedCount = totalQuestions - answeredCount;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Mobile Sticky Sub-Header */}
      <div className="lg:hidden flex justify-between items-center bg-white dark:bg-[#1f2028] border border-[#e5e4e7] dark:border-[#2e303a] p-4 rounded-xl mb-6 shadow-sm">
        <div className="flex flex-col">
          <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">TET Mock Test</span>
          <span className="text-sm font-bold text-gray-800 dark:text-gray-200">
            Q. {currentIndex + 1} of {totalQuestions}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Timer timeLeft={timeLeft} />
          <button
            onClick={() => setIsMobilePaletteOpen(!isMobilePaletteOpen)}
            className="bg-blue-50 dark:bg-purple-950/40 text-blue-600 dark:text-purple-400 p-2.5 rounded-lg border border-blue-100 dark:border-purple-900/50 font-medium text-xs flex items-center gap-1.5"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <span>Palette</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Exam Question Container */}
        <div className="lg:col-span-8 xl:col-span-9 space-y-6">
          {/* Desktop Banner / Header */}
          <div className="hidden lg:flex justify-between items-center bg-white dark:bg-[#1f2028] border border-[#e5e4e7] dark:border-[#2e303a] px-6 py-4 rounded-2xl shadow-sm">
            <div>
              <h4 className="text-xl font-extrabold text-gray-900 dark:text-white tracking-wide">
                APTET 2024 Social Studies Paper
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                Bilingual Mode (English / Telugu)
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500 font-medium">Remaining Time:</span>
              <Timer timeLeft={timeLeft} />
            </div>
          </div>

          {/* Progress Bar */}
          <div className="bg-white dark:bg-[#1f2028] border border-[#e5e4e7] dark:border-[#2e303a] p-4 rounded-2xl shadow-sm space-y-2">
            <div className="flex justify-between text-xs font-semibold text-gray-500">
              <span>Overall Progress</span>
              <span>{Math.round((answeredCount / totalQuestions) * 100)}% Answered</span>
            </div>
            <div className="w-full bg-gray-100 dark:bg-gray-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-purple-500 dark:to-indigo-500 h-full transition-all duration-300"
                style={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Active Question Card */}
          <QuestionCard
            question={currentQuestion}
            selectedAnswer={answers[currentQuestionId]}
            onSelect={handleSelect}
            className="p-4 w-4 h-4" 
          />

          {/* Action Control Buttons */}
          <div className="flex flex-wrap gap-3 sm:gap-4 justify-between items-center bg-white dark:bg-[#1f2028] border border-[#e5e4e7] dark:border-[#2e303a] p-4 rounded-2xl shadow-sm">
            <div className="flex gap-3">
              <button
                onClick={previousQuestion}
                disabled={currentIndex === 0}
                className="px-5 py-2.5 rounded-xl border border-gray-300 dark:border-[#2e303a] text-gray-700 dark:text-gray-200 bg-white hover:bg-gray-50 dark:bg-[#1f2028] dark:hover:bg-[#2e303a] font-bold text-sm tracking-wide disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-150"
              >
                Previous
              </button>
              {currentIndex < totalQuestions - 1 ? (
                <button
                  onClick={nextQuestion}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 dark:bg-purple-600 hover:bg-blue-700 dark:hover:bg-purple-700 text-white font-bold text-sm tracking-wide shadow-md shadow-blue-500/10 dark:shadow-purple-500/10 transition-all duration-150"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={submitExam}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm tracking-wide shadow-md shadow-emerald-500/10 transition-all duration-150"
                >
                  Submit Exam
                </button>
              )}
            </div>

            <div className="flex gap-2">
              <button
                onClick={clearResponse}
                disabled={answers[currentQuestionId] === undefined}
                className="px-4 py-2.5 rounded-xl border border-rose-200 dark:border-rose-950 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20 font-semibold text-sm transition-all duration-150 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Clear Response
              </button>
              <button
                onClick={toggleReview}
                className={`px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-150 ${
                  markedForReview[currentQuestionId]
                    ? "bg-purple-100 text-purple-800 dark:bg-purple-950/40 dark:text-purple-300 border border-purple-300 dark:border-purple-800"
                    : "border border-gray-300 dark:border-[#2e303a] text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#2e303a]"
                }`}
              >
                {markedForReview[currentQuestionId] ? "Unmark Review" : "Mark For Review"}
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Sidebar Question Palette & Statistics */}
        <div
          className={`lg:col-span-4 xl:col-span-3 space-y-6 lg:block ${
            isMobilePaletteOpen
              ? "fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm lg:relative lg:bg-transparent lg:backdrop-blur-none flex justify-end lg:z-auto"
              : "hidden"
          }`}
        >
          {/* Mobile Overlay Container Box */}
          <div
            className={`w-4/5 max-w-sm bg-white dark:bg-[#1f2028] lg:bg-transparent h-full lg:h-auto p-6 lg:p-0 flex flex-col justify-between lg:w-full lg:max-w-none shadow-2xl lg:shadow-none overflow-y-auto ${
              isMobilePaletteOpen ? "animate-slideIn" : ""
            }`}
          >
            <div className="space-y-6">
              {/* Mobile Palette Close Control */}
              <div className="lg:hidden flex justify-between items-center border-b pb-4">
                <span className="font-extrabold text-lg text-gray-900 dark:text-white">Exam Overview</span>
                <button
                  onClick={() => setIsMobilePaletteOpen(false)}
                  className="p-1 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 text-gray-500"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Statistics Card */}
              <div className="bg-white dark:bg-[#1f2028] border border-[#e5e4e7] dark:border-[#2e303a] p-6 rounded-2xl shadow-sm">
                <h3 className="font-extrabold text-gray-900 dark:text-white text-base mb-4">
                  Exam Summary
                </h3>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-emerald-50 dark:bg-emerald-950/20 p-3 rounded-xl flex items-center gap-2">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full shrink-0"></div>
                    <div className="flex flex-col">
                      <span className="font-bold text-emerald-800 dark:text-emerald-400">{answeredCount}</span>
                      <span className="text-gray-500">Answered</span>
                    </div>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-950/20 p-3 rounded-xl flex items-center gap-2">
                    <div className="w-3 h-3 bg-purple-500 rounded-full shrink-0"></div>
                    <div className="flex flex-col">
                      <span className="font-bold text-purple-800 dark:text-purple-400">{reviewCount}</span>
                      <span className="text-gray-500">Review</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-[#2e303a]/40 p-3 rounded-xl flex items-center gap-2 col-span-2">
                    <div className="w-3 h-3 bg-gray-300 dark:bg-gray-600 rounded-full shrink-0"></div>
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-800 dark:text-gray-300">{unvisitedCount}</span>
                      <span className="text-gray-500">Not Visited / Skipped</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Palette Card */}
              <div className="bg-white dark:bg-[#1f2028] border border-[#e5e4e7] dark:border-[#2e303a] p-6 rounded-2xl shadow-sm flex-grow">
                <h3 className="font-extrabold text-gray-900 dark:text-white text-base mb-4">
                  Question Navigator
                </h3>
                <div className="max-h-[260px] lg:max-h-[380px] overflow-y-auto pr-1">
                  <QuestionPalette
                    questions={questions}
                    answers={answers}
                    currentIndex={currentIndex}
                    setCurrentIndex={(idx) => {
                      setCurrentIndex(idx);
                      setIsMobilePaletteOpen(false); // Auto close palette on select in mobile
                    }}
                    markedForReview={markedForReview}
                  />
                </div>
              </div>
            </div>

            {/* Desktop and Mobile Persistent Submit button */}
            <div className="mt-6 lg:block">
              <button
                onClick={submitExam}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 transition-all duration-200"
              >
                Submit Entire Exam
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExamPage;
