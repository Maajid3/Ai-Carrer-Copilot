import { useEffect, useId, useState } from "react";
import FileReplace from "./FileReplace";
import FileUpload from "./FileUpload";
import AnalyzeBtn from "./AnalyzeBtn";
import { useMutation } from "@tanstack/react-query";
import apiClient from "../api/apiClient";
import supabaseClient from "../api/supabaseClient";
import { useUserContext } from "../context/useUserContext";

export default function InputFrom({ onResponse }) {
  const [fileName, setFileName] = useState(null);
  const [isDrag, setIsDrag] = useState(false);
  const [skills, setSkills] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [fileInput, setFileInput] = useState(null);
  const [jobDesError, setJobDesError] = useState(false);

  const [submitMsg, setSubmitmsg] = useState("");
  const [isLimitExceeded, setIsLimitExceeded] = useState(false);

  const id = useId();

  const { user } = useUserContext();

  const handleFile = (file) => {
    if (file && file.type === "application/pdf") {
      setFileInput(file);
      setFileName(file.name);
    }
  };

  const filePreview = () => {
    const fileUrl = URL.createObjectURL(fileInput);
    window.open(fileUrl);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDrag(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleReplace = () => {
    setFileName("");
    setFileInput(null);
  };

  const mutation = useMutation({
    mutationFn: (formData) =>
      apiClient.post("analyzer/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
    onSuccess: (res) => {
      const payload =
        res?.data?.result ??
        res?.data?.analysis ??
        res?.data?.message ??
        res?.data;

      onResponse?.(payload);
      setSubmitmsg("");
      setIsLimitExceeded(false);
    },
    onError: (error) => {
      const statusCode = error?.response?.status;
      const errorMessage =
        error?.response?.data?.detail ??
        error?.response?.data?.message ??
        error?.message ??
        "Something went wrong. Please try again.";

      const isLimitError = statusCode === 403;

      setSubmitmsg(errorMessage);
      setIsLimitExceeded(isLimitError);
    },
  });

  const isDisabled = mutation.isPending || !jobDesc || (!skills && !fileInput);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitmsg("");
    setIsLimitExceeded(false);

    const formData = new FormData();

    formData.append("resume_file", fileInput);
    formData.append("job", jobDesc);
    formData.append("user_id", user?.id || null);

    mutation.mutate(formData);
  };
  return (
    <form
      className="flex min-h-0 flex-1 w-full flex-col items-center gap-3 overflow-y-auto overscroll-contain px-2 pb-3 pt-1 sm:px-3"
      onSubmit={(e) => handleSubmit(e)}
    >
      <div className="w-[96%] rounded-2xl border border-white/10 bg-[#0f1218]/80 p-2 shadow-[0_14px_35px_rgba(0,0,0,0.35)] backdrop-blur-md sm:w-[92%] md:w-[80%] lg:w-[72%]">
        <label
          htmlFor={id}
          className={`flex min-h-[17vh] cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-4 py-4 text-center transition-all duration-300 leading-relaxed ${
            isDrag
              ? "border-cyan-300 bg-cyan-500/10 text-cyan-100 shadow-[0_0_25px_rgba(34,211,238,0.18)]"
              : "border-white/15 bg-[#171b24] text-neutral-300 hover:border-cyan-300/55 hover:bg-cyan-500/5"
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDrag(true);
          }}
          onDragLeave={() => setIsDrag(false)}
          onDrop={handleDrop}
        >
          {fileName ? (
            <FileReplace
              fileName={fileName}
              replaceFileFn={handleReplace}
              openFileFn={filePreview}
            />
          ) : (
            <FileUpload id={id} drag={isDrag} handleFile={handleFile} />
          )}
        </label>
      </div>

      <div className="flex w-[96%] items-center gap-2 sm:w-[92%] md:w-[80%] lg:w-[72%]">
        <div className="grow border-t border-white/15"></div>
        <span className="rounded-full border border-white/15 bg-white/5 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-300">
          or
        </span>
        <div className="grow border-t border-white/15"></div>
      </div>

      <label
        htmlFor="text-desc"
        className="relative flex h-24 w-[96%] flex-col rounded-2xl border border-white/10 bg-[#121620] p-2.5 sm:w-[92%] md:w-[80%] lg:w-[72%]"
      >
        <span className="mb-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-cyan-300">
          Skills
        </span>
        <textarea
          type="text"
          id="text-desc"
          rows={3}
          placeholder="Enter Skills (optional)"
          onChange={(e) => setSkills(e.target.value)}
          className="h-full w-full resize-none rounded-xl border border-white/10 bg-[#0c111a] px-3 py-2 text-sm text-neutral-200 placeholder:text-neutral-500 outline-none transition-all duration-200 focus:border-cyan-300/40 focus:ring-2 focus:ring-cyan-500/15"
        />
      </label>
      <label
        htmlFor="job-desc"
        className="relative flex h-28 w-[96%] flex-col rounded-2xl border border-white/10 bg-[#121620] p-2.5 sm:w-[92%] md:w-[80%] lg:w-[72%]"
      >
        <span className="mb-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-300">
          Job Description
        </span>
        <textarea
          type="text"
          id="job-desc"
          rows={4}
          placeholder="Job Description"
          onChange={(e) => setJobDesc(e.target.value)}
          onBlur={() => setJobDesError(jobDesc === "")}
          className={`h-full w-full resize-none rounded-xl border px-3 py-2 text-sm text-neutral-200 placeholder:text-neutral-500 outline-none transition-all duration-200 focus:ring-2 ${
            jobDesError
              ? "border-red-400/70 bg-red-500/5 focus:border-red-400 focus:ring-red-500/20"
              : "border-white/10 bg-[#0c111a] focus:border-emerald-300/40 focus:ring-emerald-500/15"
          }`}
        />
      </label>

      <div className="w-[96%] shrink-0 sm:w-[92%] md:w-[80%] lg:w-[72%]">
        <AnalyzeBtn isDisabled={isDisabled} isLoading={mutation.isPending} />
      </div>

      {submitMsg ? (
        <div
          className={`w-[96%] shrink-0 rounded-2xl border px-3 py-2.5 sm:w-[92%] md:w-[80%] lg:w-[72%] ${
            isLimitExceeded
              ? "border-amber-300/30 bg-amber-500/10"
              : "border-red-300/25 bg-red-500/10"
          }`}
        >
          <div className="flex items-start gap-2.5">
            <span
              className={`mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${
                isLimitExceeded
                  ? "border-amber-300/40 bg-amber-400/15 text-amber-100"
                  : "border-red-300/40 bg-red-400/15 text-red-100"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-3.5 w-3.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 7.5v4.5l3 1.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </span>

            <div>
              <p
                className={`text-[11px] font-semibold uppercase tracking-[0.14em] ${
                  isLimitExceeded ? "text-amber-200" : "text-red-200"
                }`}
              >
                {isLimitExceeded ? "Usage Limit Reached" : "Request Failed"}
              </p>
              {/* <p
                className={`mt-1 text-sm ${
                  isLimitExceeded ? "text-amber-100" : "text-red-200"
                }`}
              >
                {submitMsg}
              </p> */}
              {isLimitExceeded ? (
                <p className="mt-1 text-xs text-amber-100/85">
                  You have reached the allowed attempts for now. Please wait and
                  try after a 24 hr.
                </p>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </form>
  );
}
