import { useRef, useState } from "react";

export default function AnalyzeBtn({ isDisabled, isLoading }) {
  const [ripples, setRipples] = useState([]);
  const buttonRef = useRef(null);

  const createRipple = (event) => {
    if (isDisabled || !buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 1.15;
    const isKeyboardTrigger = event.clientX === 0 && event.clientY === 0;
    const originX = isKeyboardTrigger
      ? rect.width / 2
      : event.clientX - rect.left;
    const originY = isKeyboardTrigger
      ? rect.height / 2
      : event.clientY - rect.top;

    const ripple = {
      id: Date.now() + Math.random(),
      x: originX - size / 2,
      y: originY - size / 2,
      size,
      expanding: false,
    };

    setRipples((prev) => [...prev, ripple]);

    requestAnimationFrame(() => {
      setRipples((prev) =>
        prev.map((item) =>
          item.id === ripple.id ? { ...item, expanding: true } : item,
        ),
      );
    });

    window.setTimeout(() => {
      setRipples((prev) => prev.filter((item) => item.id !== ripple.id));
    }, 650);
  };

  return (
    <button
      ref={buttonRef}
      disabled={isDisabled}
      onClick={createRipple}
      className="relative isolate max-w-full w-full overflow-hidden rounded-xl border border-cyan-300/30 bg-linear-to-r from-[#0f2e3c] via-[#123848] to-[#164b43] px-3 py-2.5 text-xs font-bold uppercase tracking-[0.09em] text-[#dff8ff] shadow-[0_10px_24px_rgba(12,56,76,0.45)] transition-all duration-300 ease-out sm:px-4 sm:py-3 sm:text-sm sm:tracking-[0.12em] hover:-translate-y-0.5 hover:border-cyan-200/45 hover:shadow-[0_14px_30px_rgba(12,97,122,0.45)] active:translate-y-0 active:scale-[0.995] cursor-pointer disabled:cursor-no-drop disabled:border-white/10 disabled:bg-[#3b4252] disabled:text-neutral-300 disabled:shadow-none"
    >
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="pointer-events-none absolute rounded-full bg-cyan-100/35"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
            transform: ripple.expanding ? "scale(2.5)" : "scale(0)",
            opacity: ripple.expanding ? 0 : 0.35,
            transition: "transform 600ms ease-out, opacity 600ms ease-out",
          }}
        />
      ))}

      <span className="pointer-events-none absolute inset-0 bg-linear-to-r from-transparent via-cyan-100/8 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100" />
      <span className="relative z-10">
        {isLoading ? "Analyzing..." : "Analyze"}
      </span>
    </button>
  );
}
