function QuestionCard({ question, selectedAnswer, onSelect }) {
  if (!question) return null;

  const isBilingualObj = question.questionEn && question.questionTe && (question.questionEn.trim() !== question.questionTe.trim());
  const isOptionsObj = question.options && typeof question.options[0] === "object";

  return (
    <div className="bg-white dark:bg-[#1f2028] border border-[#e5e4e7] dark:border-[#2e303a] rounded-2xl p-6 sm:p-8 shadow-sm transition-all duration-300">
      {/* Question Header */}
      <div className="space-y-3 mb-8">
        {isBilingualObj ? (
          <>
            <h4 className="text-lg md:text-sm font-bold text-gray-900 dark:text-white leading-relaxed">
              {question.questionEn}
            </h4>
            <h4 className="text-lg md:text-sm text-indigo-600 dark:text-purple-400 font-medium leading-relaxed mt-2 border-l-4 border-indigo-500 pl-4">
              {question.questionTe}
            </h4>
          </>
        ) : (
          <h4 className="text-lg md:text-sm font-bold text-gray-900 dark:text-white whitespace-pre-line leading-relaxed">
            {question.questionText || question.questionEn || question.questionTe}
          </h4>
        )}
      </div>

      {/* Options */}
      <div className="space-y-4">
        {question.options &&
          question.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            return (
              <label
                key={index}
                className={`block border-2 p-4 sm:p-4 rounded-xl cursor-pointer transition-all duration-200 hover:border-blue-300 dark:hover:border-purple-500 ${
                  isSelected
                    ? "border-blue-600 bg-blue-50/50 dark:border-purple-500 dark:bg-purple-950/20"
                    : "border-gray-200 dark:border-[#2e303a] bg-white dark:bg-[#1f2028]"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex items-center h-6 shrink-0">
                    <input
                      type="radio"
                      name={`question-${question._id || question.id}`}
                      checked={isSelected}
                      onChange={() => onSelect(index)}
                      className="w-4 h-4 text-blue-600 dark:text-purple-500 border-gray-300 dark:border-[#2e303a] focus:ring-blue-500 dark:focus:ring-purple-500 cursor-pointer"
                    />
                  </div>

                  <div>
                    {isOptionsObj ? (
                      <div>
                        <div className="font-semibold text-gray-800 dark:text-gray-200 text-sm md:text-base">
                          {option.en}
                        </div>
                        <div className="text-gray-600 dark:text-gray-400 text-xs md:text-sm">
                          {option.te}
                        </div>
                      </div>
                    ) : (
                      <div className="font-semibold text-gray-800 dark:text-gray-200 text-sm md:text-base">
                        {option}
                      </div>
                    )}
                  </div>
                </div>
              </label>
            );
          })}
      </div>
    </div>
  );
}

export default QuestionCard;
