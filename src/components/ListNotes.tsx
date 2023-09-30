'use client'

import { useFetchUserNotesQuery } from '@/queries/fetch-user-notes-query'
import { FileX2 } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import { Empty } from './Empty'
import { Error } from './Error'
import { CreateSearchNoteData } from './Form/Providers/SearchNoteForm'
import { NoteCard } from './NoteCard'
import { NoteSkeleton } from './SkeletonLoaders/NoteSkeleton'

interface ListNotesProps {
  favorites?: boolean
  token: string
}

const ListNotes = ({ favorites, token }: ListNotesProps) => {
  const { watch } = useFormContext<CreateSearchNoteData>()

  const { data: notes, isLoading, isError } = useFetchUserNotesQuery({ token })

  if (isLoading) {
    return <NoteSkeleton />
  }

  if (isError || !notes) {
    return <Error message="Error fetching notes" />
  }

  const search = watch('search')

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(search?.toLowerCase()),
  )

  const favoriteNotes = filteredNotes.filter((note) => note.markedAsFavorite)
  const otherNotes = filteredNotes.filter((note) => !note.markedAsFavorite)

  return (
    <div className="flex flex-col gap-3 items-center justify-center w-full sm:grid sm:gap-4 sm:grid-flow-row sm:grid-cols-2 lg:grid-cols-3">
      {favorites ? (
        <>
          {favoriteNotes.length > 0 ? (
            favoriteNotes.map((note) => (
              <NoteCard token={token} key={note.id} note={note} />
            ))
          ) : (
            <Empty
              message="No starred notes"
              icon={
                <FileX2
                  className="text-zinc-800 dark:text-slate-50"
                  size={64}
                  strokeWidth={1.5}
                />
              }
            />
          )}
        </>
      ) : (
        <>
          {otherNotes.length > 0 ? (
            otherNotes.map((note) => (
              <NoteCard token={token} key={note.id} note={note} />
            ))
          ) : (
            <Empty
              message="No other notes"
              icon={
                <FileX2
                  className="text-zinc-800 dark:text-slate-50"
                  size={64}
                  strokeWidth={1.5}
                />
              }
            />
          )}
        </>
      )}
    </div>
  )
}

export { ListNotes }
