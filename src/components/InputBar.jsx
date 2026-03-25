import AnalyzedResponse from "./AnalyzedReponse";
import InputHeader from "./InputHeader";
import InputFrom from "./InputForm";
import { useState } from "react";

export default function InputBar() {
  const [data, setData] = useState(null);

  return (
    <>
        <InputHeader />
        {/* data and chats */}

        {data ? (
          <AnalyzedResponse data={data} onNewChat={() => setData(null)} />
        ) : (
          <InputFrom onResponse={setData} />
        )}
      {/* </div> */}
    </>
  );
}
