import { api } from '@/lib/axios'
import { useMutation } from 'react-query'

interface ToggleNoteAsFavoriteProps {
  id: string
  token: string
}

const toggleNoteAsFavoriteMutation = async ({
  id,
  token,
}: ToggleNoteAsFavoriteProps) => {
  const { data } = await api(token).patch(`/note/${id}`)

  return data
}

const useToggleNoteAsFavoriteMutation = () =>
  useMutation(toggleNoteAsFavoriteMutation)

export { useToggleNoteAsFavoriteMutation }
