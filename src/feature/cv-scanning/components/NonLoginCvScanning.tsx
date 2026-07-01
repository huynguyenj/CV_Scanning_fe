import FileInput from "@/components/ui/FileInput";
import { useState } from "react";

export default function NonLoginCvScanning() {
  const [file, setFile] = useState<File | null>(null)
  console.log(file?.name);
  
  return (
    <div>
      <FileInput onGetFile={setFile}/>
      <div className="bg-ebony-grey py-2 px-5 my-2 max-h-150 overflow-y-auto">
        <h2 className="text-2xl text-white my-2 py-3">Kết quả phân tích</h2>
        <p className="text-md text-white indent-3 leading-xl">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatum pariatur incidunt numquam, fugiat dolorum ad obcaecati eum qui recusandae magni architecto distinctio et enim tenetur dolor, quidem quos ducimus ex.</p>
        <p className="text-md text-white indent-3 leading-xl">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatum pariatur incidunt numquam, fugiat dolorum ad obcaecati eum qui recusandae magni architecto distinctio et enim tenetur dolor, quidem quos ducimus ex.</p>
        <p className="text-md text-white indent-3 leading-xl">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatum pariatur incidunt numquam, fugiat dolorum ad obcaecati eum qui recusandae magni architecto distinctio et enim tenetur dolor, quidem quos ducimus ex.</p>
        <div className="bg-warning rounded-sm my-3 px-5 py-1 text-orange-700">
          <p>Đây chỉ là đánh giá khách quan từ AI và không hoàn toàn chính xác.</p>
        </div>
      </div>
    </div>
  )
}
