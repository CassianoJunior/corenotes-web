import { api } from '@/lib/axios'
import { useMutation } from 'react-query'

interface DeleteNoteMutationProps {
  id: string
  token: string
}

const deleteNoteMutation = async ({ id, token }: DeleteNoteMutationProps) => {
  const { data } = await api(token).delete(`/note/${id}`)

  return data
}

const useDeleteNoteMutation = () => useMutation(deleteNoteMutation)

export { useDeleteNoteMutation }
