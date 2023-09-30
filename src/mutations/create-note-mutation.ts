import { api } from '@/lib/axios'
import { useMutation } from 'react-query'

export type CreateNoteDTO = {
  title: string
  content: string
  color: string
  markedAsFavorite?: boolean
}

export interface CreateNoteMutationProps {
  note: CreateNoteDTO
  token: string
}

const createNoteMutation = async ({ note, token }: CreateNoteMutationProps) => {
  const { data } = await api(token).post('/note', note)

  return data
}

const useCreateNoteMutation = () => useMutation(createNoteMutation)

export { useCreateNoteMutation }
