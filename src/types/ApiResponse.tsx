export type ApiResponse<T> = {
   success: boolean
   message: string
   data: T
}

export type ApiResponseError = {
  status_code: number
  code: string
  message: string
}