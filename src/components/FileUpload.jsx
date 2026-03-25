export default function FileUpload({ id, drag, handleFile }) {
  return (
    <>
      {drag ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="4em"
          height="4em"
          viewBox="0 0 24 24"
        >
          <title xmlns="">drag-drop</title>
          <path
          className="text-purple-400"
            fill="currentColor"
            d="M1.999 15V2h13v5h-2V4h-9v9h3v2zm6 5V8h12v5.5h-2V10h-8v8h3.5v2zm8.778 3.684L13.41 13.378l10.258 3.407l-4.656 2.227z"
          />
        </svg>
      ) : (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
            />
          </svg>

          <span className="text-gray-700 font-bold tracking-wide">
            Upload resume
          </span>
          <p className="text-center text-[0.6rem] lg:text-[0.9rem] md:text-[0.9rem] sm:text-[0.9rem]">
            Drag & Drop or Click to Browse
          </p>
          <input
            type="file"
            accept=".pdf"
            id={id}
            className="hidden"
            onChange={(e) => handleFile(e.target.files[0])}
          />
        </>
      )}
    </>
  );
}
