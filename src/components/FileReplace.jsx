import successIcon from "../assets/success.svg";
import replaceIcon from "../assets/replace.svg";

export default function FileReplace({ fileName, replaceFileFn, openFileFn }) {
  return (
    <div className="flex flex-col justify-center items-center gap-1.5">
      <img src={successIcon} alt="Success" />
      <span className="bg-[#a1d8b4] text-black font-bold text-[0.8rem] px-2 rounded-2xl">
        {fileName}
      </span>
      <div className="flex justify-center items-center" onClick={replaceFileFn}>
        <span className="text-[0.8em] hover:text-[#ff8282]">Replace</span>
        <img src={replaceIcon} alt="replace" />
      </div>
      <span
        className="text-[0.8em] underline text-blue-300"
        onClick={openFileFn}
      >
        open
      </span>
    </div>
  );
}
