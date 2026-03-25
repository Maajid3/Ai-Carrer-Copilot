export default function InputHeader() {
  return (
    <div className="flex justify-between items-center px-2 py-2 w-full h-12 border-b mb-2 border-gray-700/80 font-koltav text-[0.9rem] sm:px-3 sm:h-14 sm:mb-3">
      <div className="flex justify-center items-center gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-5 sm:size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
          />
        </svg>
        <h1 className="text-[0.58rem] sm:text-[0.72rem] md:text-[0.9rem] ">
          Ai Carrer Copilot Analyzer
        </h1>
      </div>
      <span className="text-[0.56rem] sm:text-[0.7rem] md:text-[0.9rem] ">
        AI-Powered
      </span>
    </div>
  );
}
