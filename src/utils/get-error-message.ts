import { isAxiosError } from 'axios'

export function getErrorMessage(error: unknown, fallback: string) {
  if(isAxiosError(error) && typeof error.response?.data?.message === 'string') {
    return error.response.data.message as string
  }

  return fallback
}
