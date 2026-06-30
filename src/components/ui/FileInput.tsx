import { useRef, useState, type ChangeEvent, type Dispatch, type SetStateAction } from 'react'
import { MdDriveFolderUpload } from "react-icons/md";
import { FaFile } from "react-icons/fa";
import { toast } from 'react-toastify';

type FileInputProps = {
  onGetFile: Dispatch<SetStateAction<File | null>>
  typeFiles?: 'All' | 'jpeg' | 'pdf' | 'docx' | 'png' | 'webp' | 'csv' | 'xlsx' | 'plain'
}

export default function FileInput({ onGetFile, typeFiles='All' }: FileInputProps) {
  const inputFileRef = useRef<HTMLInputElement | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const handleOpenFileUpload = () => {
    inputFileRef.current?.click()
  }
  const handleDragDrop = (e: React.DragEvent<HTMLElement>) => {
      e.preventDefault()
      if (!validateFileType(e.dataTransfer.files[0].type.split('/')[1])) return
      onGetFile(e.dataTransfer.files[0])
      
  }
  const handleDragOver = (e: React.DragEvent<HTMLElement>) => {
      e.preventDefault()      
  }
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget && inputFileRef.current?.files) {
      console.log(inputFileRef.current.files[0].type.split('/')[1]);
      if (!validateFileType(inputFileRef.current.files[0].type.split('/')[1])) return
      onGetFile(inputFileRef.current?.files[0])
      setFile(inputFileRef.current.files[0])
    }
  }
  const validateFileType = (fileType: string) => {
    if (typeFiles === 'All') return true
    if (typeFiles === 'docx' && fileType === 'vnd.openxmlformats-officedocument.wordprocessingml.document') return true
    if (typeFiles === 'xlsx' && fileType === 'vnd.openxmlformats-officedocument.spreadsheetml.sheet') return true
    if (!typeFiles.includes(fileType)) {      
      toast.error('Hãy nhập đúng định dạng file')
      return false
    }
    else return true
  }
  return (
    <div className='flex flex-col xl:flex-row gap-2'>
      <div 
        onClick={handleOpenFileUpload} 
        className='flex items-center justify-center w-full aspect-2/1 bg-ebony-grey border-3 border-dashed border-white rounded-md hover:border-blue-500 hover:opacity-90'
        onDragOver={handleDragOver}
        onDrop={handleDragDrop}
        >
        <div className='flex flex-col items-center gap-2'>
              <MdDriveFolderUpload className='text-mineral-green size-10'/>
              <div>
                    <p className='text-md font-medium text-white/60 text-center'>Tải phải lên hoặc bỏ file vào đây</p>
                    <p className='text-sm text-white/50 text-center'>Hỗ trợ file dạng: pdf</p>
              </div>
        </div>
        <input id='upload' ref={inputFileRef} type="file" className='hidden' onChange={handleChange}/>
        <label htmlFor='upload'>{''}</label>
      </div>
    <div className='flex items-center justify-center w-full aspect-2/1 bg-ebony-grey border-3 border-dashed border-white rounded-md'>
      <div className='flex flex-col gap-3 items-center'>
        { file ?
          <>
            <p className='text-md font-medium text-white/60 text-center'>{file.name}</p>
          </>
          :
          <>
            <FaFile className='text-mineral-green size-10'/>
            <p className='text-md font-medium text-white/60 text-center'>File của bạn hiện ở đây</p>
          </>
        }
      </div>
    </div>
    </div>
  )
}
