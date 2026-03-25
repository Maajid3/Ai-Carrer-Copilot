import { useQuery } from "@tanstack/react-query";
import apiClient from "../api/apiClient";
import { useNavigate } from "react-router";
import { useUserContext } from "../context/useUserContext";

export default function AiChats() {
  const navigate = useNavigate();

  const { user } = useUserContext();
  const userId = user?.id;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["chats"],
    queryFn: () =>
      apiClient
        .get("user/chats/", {
          params: {
            user_id: userId,
          },
        })
        .then((res) => res.data),
  });

  if (isError) {
    return (
      <p className="mt-10 rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-100">
        Something went wrong while loading your chats.
      </p>
    );
  }

  const chats = Array.isArray(data) ? data : [];

  return (
    <>
      <section className="h-full w-full overflow-y-auto px-2 pb-2 sm:px-3">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-5">
          <div className="sticky top-0 z-10 p-5  border-b border-white/10 bg-[#0f0f0f]/75 py-3 backdrop-blur">
            <h2 className="text-xl font-bold tracking-wide text-cyan-100 sm:text-2xl">
              Recent Chats
            </h2>
            <p className="mt-1 text-xs text-neutral-300 sm:text-sm">
              Open any previous analysis.
            </p>
          </div>

          {isLoading ? (
            <div className="space-y-3 pt-2">
              <div className="h-16 animate-pulse rounded-2xl border border-white/10 bg-white/5" />
              <div className="h-16 animate-pulse rounded-2xl border border-white/10 bg-white/5" />
              <div className="h-16 animate-pulse rounded-2xl border border-white/10 bg-white/5" />
            </div>
          ) : chats.length ? (
            <div className="flex flex-col items-start gap-3 pb-2">
              {chats.map((chatsPreview) => {
                const datee = new Date(chatsPreview.created_at);
                const time = datee.toLocaleString([], {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                });

                return (
                  <button
                    type="button"
                    key={chatsPreview.id}
                    className="group w-full rounded-2xl border border-white/10 bg-linear-to-r from-[#7affb21f] via-white/5 to-cyan-400/8 px-4 py-3 text-left shadow-[0_8px_25px_rgba(0,0,0,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-300/35 hover:shadow-[0_12px_35px_rgba(34,211,238,0.15)] cursor-pointer"
                    onClick={() => navigate(`/chat-preview/${chatsPreview.id}`)}
                  >
                    <p className="line-clamp-2 text-sm font-semibold text-neutral-100 sm:text-base">
                      {chatsPreview.job_preview || "Untitled chat"}
                    </p>
                    <small className="mt-2 block text-xs text-cyan-100/75">
                      {time}
                    </small>
                    <span className="mt-2 block text-[0.68rem] uppercase tracking-[0.12em] text-cyan-200/70 transition-colors group-hover:text-cyan-100">
                      View detailed analysis
                    </span>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-white/20 bg-white/3 p-6 text-center">
              <p className="text-sm text-neutral-200 sm:text-base">
                No chats found yet.
              </p>
              <p className="mt-1 text-xs text-neutral-400 sm:text-sm">
                Start a new analysis to build your chat history.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
