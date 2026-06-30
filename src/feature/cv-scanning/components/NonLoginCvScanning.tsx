import FileInput from "@/components/ui/FileInput";
import { useState } from "react";

export default function NonLoginCvScanning() {
  const [file, setFile] = useState<File | null>(null)
  console.log(file?.name);
  
  return (
    <div>
      <FileInput onGetFile={setFile}/>
    </div>
  )
}
