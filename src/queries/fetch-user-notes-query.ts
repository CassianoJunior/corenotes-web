import { api } from '@/lib/axios'
import { QueryFunctionContext, useQuery } from 'react-query'

export type Note = {
  id: string
  title: string
  content: string
  color: string
  markedAsFavorite: boolean
  createdAt: string
  updatedAt: string
}

type FetchUserNotesQueryKey = ['notes', { token: string }]

const fetchUserNotesQuery = async ({
  queryKey,
}: QueryFunctionContext<FetchUserNotesQueryKey>) => {
  const [, { token }] = queryKey

  const { data } = await api(token).get('/notes')

  const notes: Note[] = data.notes

  return notes
}

export interface FetchUserNotesQueryProps {
  token: string
}

const useFetchUserNotesQuery = ({ token }: FetchUserNotesQueryProps) =>
  useQuery(['notes', { token }], fetchUserNotesQuery)

export { useFetchUserNotesQuery }
