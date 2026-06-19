function Timer({ timeLeft }) {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const isLowTime = timeLeft < 5 * 60; // Less than 5 minutes
  const isUrgentTime = timeLeft < 1 * 60; // Less than 1 minute

  let bgClass = "bg-slate-100 dark:bg-gray-800 text-slate-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700";
  let pulseClass = "";

  if (isUrgentTime) {
    bgClass = "bg-rose-600 text-white border border-rose-700";
    pulseClass = "animate-pulse";
  } else if (isLowTime) {
    bgClass = "bg-amber-500 text-white border border-amber-600";
    pulseClass = "animate-pulse";
  }

  return (
    <div className={`flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold tracking-wider font-mono text-sm md:text-base shadow-sm select-none transition-colors duration-300 ${bgClass} ${pulseClass}`}>
      <svg className="w-4 h-4 md:w-5 md:h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </span>
    </div>
  );
}

export default Timer;
