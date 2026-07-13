import { useState } from 'react'
import type { AiBasicEvaluation } from '../types/ai-evaluation'
import { apiPrivate } from '@/config/api'
import { toast } from 'react-toastify'

export default function useAIBasicAnalysis() {
  const [aiEvaluation, setAiEvaluation] = useState<AiBasicEvaluation>()
  const [loading, setLoading] = useState(false)
  const handleAiBasicEvaluation = async (cvFile: File | null) => {
      if (!cvFile) return
      const form = new FormData()
      form.append('file', cvFile)
      try {
        setLoading(true)
        const response = await apiPrivate.post('/cv/upload/basic', form)
        setAiEvaluation(response.data)
      } catch (error) {
        toast.error(error as string)   
      } finally {
        setLoading(false)
      }
  }
  return { aiEvaluation, loading, handleAiBasicEvaluation }
}
