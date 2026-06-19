function QuestionPalette({
  questions,
  answers,
  currentIndex,
  setCurrentIndex,
  markedForReview,
}) {
  return (
    <div className="grid grid-cols-5 gap-2.5 sm:gap-3 p-1">
      {questions.map((q, index) => {
        const qId = q._id || q.id;
        const answered = answers[qId] !== undefined;
        const review = markedForReview[qId];
        const isCurrent = currentIndex === index;

        let stateClasses;

        if (answered && review) {
          // Answered & Marked for review
          stateClasses = "bg-gradient-to-br from-emerald-500 to-purple-500 text-white shadow-md shadow-purple-500/10";
        } else if (review) {
          // Just marked for review
          stateClasses = "bg-purple-500 text-white shadow-md shadow-purple-500/20 hover:bg-purple-600";
        } else if (answered) {
          // Answered
          stateClasses = "bg-emerald-500 text-white shadow-md shadow-emerald-500/20 hover:bg-emerald-600";
        } else {
          // Unanswered / Unvisited
          stateClasses = "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700";
        }

        // Apply distinct styles if it is the current question
        const currentRingClass = isCurrent
          ? "ring-2 ring-blue-600 dark:ring-purple-400 ring-offset-2 dark:ring-offset-[#1f2028] scale-105 z-10 font-bold"
          : "font-semibold";

        return (
          <button
            key={qId}
            onClick={() => setCurrentIndex(index)}
            className={`aspect-square rounded-xl text-sm transition-all duration-200 flex items-center justify-center transform active:scale-95 ${stateClasses} ${currentRingClass}`}
            title={`Go to Question ${index + 1}`}
          >
            {index + 1}
          </button>
        );
      })}
    </div>
  );
}

export default QuestionPalette;
