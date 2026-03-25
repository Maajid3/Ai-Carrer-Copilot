import writeIcon from "../assets/write.svg";

export default function AnalyzedResponse({ data, onNewChat }) {
  const parsedData =
    typeof data === "string"
      ? (() => {
          try {
            return JSON.parse(data);
          } catch {
            return { analysis: data };
          }
        })()
      : data || {};

  const analysis = parsedData?.analysis || "No analysis available.";
  const learningPlan = Array.isArray(parsedData?.learning_plan)
    ? parsedData.learning_plan
    : [];
  const priority = Array.isArray(parsedData?.priority)
    ? parsedData.priority
    : [];

  return (
    <div className="w-full px-4 pb-5 sm:px-6 overflow-y-auto">
      <button
        className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-linear-to-r from-cyan-500/20 to-emerald-500/20 px-4 py-2 text-xs font-semibold tracking-wide text-cyan-100 transition-all duration-300 hover:scale-[1.02] hover:border-cyan-300/50 hover:shadow-[0_0_24px_rgba(34,211,238,0.25)] cursor-pointer"
        onClick={onNewChat}
      >
        <img src={writeIcon} alt="new chat" />
        New Chat
      </button>

      <div className="grid w-full gap-4">
        <div className="rounded-2xl border border-white/10 bg-linear-to-br from-white/8 to-white/2 p-5 shadow-[0_10px_35px_rgba(0,0,0,0.35)] backdrop-blur-md">
          <h2 className="mb-2 text-sm font-bold uppercase tracking-[0.16em] text-cyan-300">
            Analysis
          </h2>
          <p className="text-sm leading-7 text-neutral-200 whitespace-pre-wrap">
            {analysis}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0f1116] p-5 shadow-[0_8px_30px_rgba(0,0,0,0.28)]">
          <h2 className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-emerald-300">
            Learning Plan
          </h2>
          {learningPlan.length ? (
            <div className="space-y-3">
              {learningPlan.map((item, index) => (
                <div
                  key={`${item.skill}-${index}`}
                  className="rounded-xl border border-white/10 bg-white/3 p-3"
                >
                  <p className="text-sm font-semibold text-emerald-200">
                    {index + 1}. {item.skill}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-neutral-300">
                    {item.steps}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-neutral-400">
              No learning plan available.
            </p>
          )}
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#10131a] p-5 shadow-[0_8px_30px_rgba(0,0,0,0.22)]">
          <h2 className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-fuchsia-300">
            Priority To Learn
          </h2>
          {priority.length ? (
            <div className="flex flex-wrap gap-2">
              {priority.map((item, index) => (
                <span
                  key={`${item}-${index}`}
                  className="rounded-full border border-fuchsia-300/25 bg-fuchsia-400/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-fuchsia-100"
                >
                  {item}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-neutral-400">No priorities available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
