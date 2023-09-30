import { api } from '@/lib/axios'
import { useMutation } from 'react-query'

export type UpdateNoteDTO = {
  title: string
  content: string
  color?: string
}

export interface UpdateNoteMutationProps {
  noteId: string
  note: UpdateNoteDTO
  token: string
}

const updateNoteMutation = async ({
  note,
  token,
  noteId,
}: UpdateNoteMutationProps) => {
  const { data } = await api(token).put(`/note/${noteId}`, note)

  return data
}

const useUpdateNoteMutation = () => useMutation(updateNoteMutation)

export { useUpdateNoteMutation }
