import { useQuery } from "@tanstack/react-query";
import apiClient from "../api/apiClient";
import { useNavigate, useParams } from "react-router-dom";
import { useUserContext } from "../context/useUserContext";

export default function DetailedChatView() {
  let { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUserContext();
  const userId = user?.id;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["chat", id],
    queryFn: () =>
      apiClient
        .get(`user/chats/${id}/`, {
          params: {
            user_id: userId,
          },
        })
        .then((res) => res.data),
    enabled: Boolean(id),
  });

  if (isError) {
    return (
      <p className="mt-10 rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-100">
        Failed to load chat details. Please try again.
      </p>
    );
  }

  const analysisText =
    data?.result?.analysis?.analysis || "No analysis available.";
  const priority = Array.isArray(data?.result?.analysis?.priority)
    ? data.result.analysis.priority
    : [];
  const learningPlan = Array.isArray(data?.result?.analysis?.learning_plan)
    ? data.result.analysis.learning_plan
    : [];
  const jobSkills = Array.isArray(data?.result?.job_skills)
    ? data.result.job_skills
    : [];
  const resumeSkills = Array.isArray(data?.result?.resume_skills)
    ? data.result.resume_skills
    : [];
  const missingSkills = Array.isArray(data?.result?.missing_skills)
    ? data.result.missing_skills
    : [];

  const renderSkillTags = (skills, tone) => {
    if (!skills.length) {
      return <p className="text-sm text-neutral-400">No items available.</p>;
    }

    const toneStyles = {
      cyan: "border-cyan-300/25 bg-cyan-400/10 text-cyan-100",
      emerald: "border-emerald-300/25 bg-emerald-400/10 text-emerald-100",
      red: "border-red-300/25 bg-red-400/10 text-red-100",
      violet: "border-violet-300/25 bg-violet-400/10 text-violet-100",
    };

    return (
      <div className="flex flex-wrap gap-2 min-w-0">
        {skills.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className={`max-w-full break-all rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-wide ${toneStyles[tone]}`}
          >
            {item}
          </span>
        ))}
      </div>
    );
  };

  return (
    <section className="h-full w-full min-w-0 overflow-y-auto px-2 pb-2 sm:px-3">
      <div className="mx-auto flex w-full max-w-3xl min-w-0 flex-col gap-4">
        <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-white/10 bg-[#0f0f0f]/75 p-3 backdrop-blur sm:p-5">
          <div className="min-w-0">
            <h2 className="text-lg font-bold tracking-wide text-cyan-100 sm:text-xl">
              Chat Analysis
            </h2>
            <p className="mt-1 text-xs text-neutral-300 sm:text-sm">
              Deep breakdown of your resume-job match.
            </p>
          </div>
          <button
            type="button"
            className="rounded-xl border border-white/15 bg-white/8 px-3 py-1.5 text-xs font-semibold text-neutral-100 transition-colors hover:border-cyan-300/30 hover:bg-cyan-400/10"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
        </div>

        {isLoading ? (
          <div className="space-y-3 pt-1 ">
            <div className="h-24 animate-pulse rounded-2xl border border-white/10 bg-white/5" />
            <div className="h-24 animate-pulse rounded-2xl border border-white/10 bg-white/5" />
            <div className="h-24 animate-pulse rounded-2xl border border-white/10 bg-white/5" />
          </div>
        ) : data ? (
          <div className="grid min-w-0 gap-4 pb-2">
            <div className="min-w-0 rounded-2xl border border-white/10 bg-linear-to-br from-white/10 to-white/2 p-4 shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-cyan-300">
                Resume Summary
              </p>
              <p className="mt-2 text-[0.6rem] lg:text-sm wrap-break-words text-neutral-100">
                {data.resume || "-"}
              </p>
            </div>

            <div className="min-w-0 rounded-2xl border border-white/10 bg-linear-to-br from-white/10 to-white/2 p-4 shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-cyan-300">
                Target Job
              </p>
              <p className="mt-2 text-sm wrap-break-words text-neutral-100">
                {data.job || "-"}
              </p>
            </div>

            <div className="min-w-0 rounded-2xl border border-white/10 bg-[#0f1116] p-4 shadow-[0_8px_30px_rgba(0,0,0,0.28)]">
              <h3 className="mb-2 text-[0.7rem] font-bold uppercase tracking-[0.16em] text-emerald-300">
                Analysis
              </h3>
              <p className="text-sm leading-6 whitespace-pre-wrap wrap-break-words text-neutral-200">
                {analysisText}
              </p>
            </div>

            <div className="min-w-0 rounded-2xl border border-white/10 bg-[#10131a] p-4 shadow-[0_8px_30px_rgba(0,0,0,0.22)]">
              <h3 className="mb-3 text-[0.7rem] font-bold uppercase tracking-[0.16em] text-violet-300">
                Priority Skills
              </h3>
              {renderSkillTags(priority, "violet")}
            </div>

            <div className="min-w-0 rounded-2xl border border-white/10 bg-[#10131a] p-4 shadow-[0_8px_30px_rgba(0,0,0,0.22)]">
              <h3 className="mb-3 text-[0.7rem] font-bold uppercase tracking-[0.16em] text-emerald-300">
                Learning Plan
              </h3>
              {learningPlan.length ? (
                <div className="space-y-3 min-w-0">
                  {learningPlan.map((item, index) => (
                    <div
                      key={`${item.skill || "skill"}-${index}`}
                      className="rounded-xl border border-white/10 bg-white/3 p-3"
                    >
                      <p className="text-sm font-semibold wrap-break-words text-emerald-200">
                        {index + 1}. {item.skill || "Skill"}
                      </p>
                      <p className="mt-1 text-sm wrap-break-words text-neutral-300">
                        {item.steps || "No steps provided."}
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

            <div className="flex flex-col items-center min-w-0 gap-4">
              <div className="w-full min-w-0 rounded-2xl border border-white/10 bg-[#0f1116] p-4">
                <h3 className="mb-3 text-[0.7rem] font-bold uppercase tracking-[0.16em] text-cyan-300">
                  Job Skills
                </h3>
                {renderSkillTags(jobSkills, "cyan")}
              </div>

              <div className="w-full min-w-0 rounded-2xl border border-white/10 bg-[#0f1116] p-4">
                <h3 className="mb-3 text-[0.7rem] font-bold uppercase tracking-[0.16em] text-emerald-300">
                  Resume Skills
                </h3>
                {renderSkillTags(resumeSkills, "emerald")}
              </div>

              <div className="w-full min-w-0 rounded-2xl border border-white/10 bg-[#0f1116] p-4">
                <h3 className="mb-3 text-[0.7rem] font-bold uppercase tracking-[0.16em] text-red-300">
                  Missing Skills
                </h3>
                {renderSkillTags(missingSkills, "red")}
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-white/20 bg-white/3 p-6 text-center">
            <p className="text-sm text-neutral-200 sm:text-base">
              No chat data found.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
