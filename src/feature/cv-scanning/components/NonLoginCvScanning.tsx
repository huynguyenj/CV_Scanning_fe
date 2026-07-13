import FileInput from "@/components/ui/FileInput";
import { useState } from "react";
import useAIBasicAnalysis from "../hooks/useAIBasicAnalysis";

export default function NonLoginCvScanning() {
  const [file, setFile] = useState<File | null>(null)
  // console.log(file?.name);
  const { aiEvaluation, handleAiBasicEvaluation } = useAIBasicAnalysis()
  return (
    <div>
      <FileInput onGetFile={setFile}/>
      { aiEvaluation && 
      <div className="bg-ebony-grey py-2 px-5 my-2 max-h-150 overflow-y-auto">
        <h2 className="text-2xl text-light-white my-2 py-3">Kết quả phân tích</h2>
        <p className="text-xl text-light-white indent-3 leading-xl">{aiEvaluation.evaluation}</p>
        <div className="bg-warning rounded-sm my-3 px-5 py-1 text-orange-700">
          <p>Đây chỉ là đánh giá khách quan từ AI và không hoàn toàn chính xác.</p>
        </div>
      </div>
      }
      <div className="w-full flex justify-end my-2">
        <button disabled={file != null ? false : true} className="uppercase bg-primary text-md text-white px-2 py-2 rounded-sm disabled:opacity-70" onClick={() => handleAiBasicEvaluation(file)}>Tiến hành phân tích</button>
      </div>
    </div>
  )
}
