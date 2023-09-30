'use client'

import { queryClient } from '@/lib/query-client'
import { useDeleteNoteMutation } from '@/mutations/delete-note-mutation'
import { useToggleNoteAsFavoriteMutation } from '@/mutations/toggle-note-as-favorite-mutation'
import { useUpdateNoteMutation } from '@/mutations/update-note-mutation'
import { Note } from '@/queries/fetch-user-notes-query'
import { colors } from '@/utils/colors'
import * as AlertDialog from '@radix-ui/react-alert-dialog'
import * as Popover from '@radix-ui/react-popover'
import clsx from 'clsx'
import { Palette, PencilLine, Star, X } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useCallback, useState } from 'react'
import { Button } from './Button'
import {
  EditNoteFormComponent,
  EditNoteFormProvider,
} from './Form/Providers/EditNoteForm'
import { Text } from './Text'

interface NoteCardProps {
  note: Note
  token: string
}

const NoteCard = ({ note, token }: NoteCardProps) => {
  const { theme } = useTheme()
  const darkTheme = theme === 'dark'

  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const { mutateAsync: deleteNote } = useDeleteNoteMutation()

  const { mutateAsync: toggleNoteAsFavorite } =
    useToggleNoteAsFavoriteMutation()

  const { mutateAsync: updateNote } = useUpdateNoteMutation()

  const handleDeleteNote = async () => {
    await deleteNote({ id: note.id, token })
    queryClient.invalidateQueries(['notes', { token }])
  }

  const handleToggleNoteAsFavorite = async () => {
    await toggleNoteAsFavorite({ id: note.id, token })
    queryClient.invalidateQueries(['notes', { token }])
  }

  const closePopover = useCallback(() => {
    setIsPopoverOpen(false)
  }, [setIsPopoverOpen])

  const openPopover = useCallback(() => {
    setIsPopoverOpen(true)
  }, [setIsPopoverOpen])

  const handleChangeColor = async (color: string) => {
    await updateNote({
      noteId: note.id,
      token,
      note: {
        title: note.title,
        content: note.title,
        color,
      },
    })
    queryClient.invalidateQueries(['notes', { token }])
    closePopover()
  }

  const cardColor = darkTheme ? colors[note.color]?.dark : note.color

  return (
    <div
      className="w-full rounded-3xl h-[20rem]"
      style={{
        backgroundColor: cardColor,
      }}
    >
      {!isEditing ? (
        <div className="flex flex-col items-center w-full h-full justify-between">
          <div className="h-full w-full">
            <div className="flex w-full flex-row items-center justify-between border-b border-slate-50 px-4 py-2">
              <Text className="text-start break-words w-[80%]">
                {note.title}
              </Text>
              <Button
                className="bg-transparent p-1 hover:bg-transparent dark:bg-transparent dark:hover:bg-transparent"
                onClick={handleToggleNoteAsFavorite}
              >
                <Star
                  className="w-5 text-zinc-800 dark:text-slate-50"
                  fill={note.markedAsFavorite ? '#ffe082' : 'none'}
                  stroke={note.markedAsFavorite ? '#ffe082' : 'currentColor'}
                />
              </Button>
            </div>
            <div className="w-full px-4 py-2">
              <Text className="break-words text-start">{note.content}</Text>
            </div>
          </div>
          <div className="flex w-full flex-row px-4 py-2">
            <div className="flex w-full flex-row gap-3">
              <Button
                onClick={() => setIsEditing(true)}
                className="bg-transparent p-1 hover:bg-transparent dark:bg-transparent dark:hover:bg-transparent"
              >
                <PencilLine className="text-zinc-800 dark:text-slate-50" />
              </Button>
              <Popover.Root open={isPopoverOpen}>
                <Popover.Trigger>
                  <Button
                    onClick={() => openPopover()}
                    className={clsx(
                      'rounded-full bg-transparent p-1 hover:bg-transparent dark:bg-transparent dark:hover:bg-transparent',
                      {
                        'bg-slate-100 hover:bg-slate-200 dark:bg-zinc-700 dark:hover:bg-zinc-600':
                          isPopoverOpen,
                      },
                    )}
                  >
                    <Palette className="text-zinc-800 dark:text-slate-50" />
                  </Button>
                </Popover.Trigger>
                <Popover.Portal>
                  <Popover.Content
                    onPointerDownOutside={() => closePopover()}
                    className="h-fit w-[300px] rounded-lg bg-gray-100 px-4 py-2 will-change-[transform,opacity] data-[state=open]:data-[side=bottom]:animate-slideUpAndFade dark:bg-gray-200"
                    side="bottom"
                    align="start"
                    alignOffset={-20}
                    sideOffset={5}
                  >
                    <div className="grid grid-flow-row grid-cols-6 items-center justify-center gap-3">
                      {Object.keys(colors).map((color) => (
                        <Button
                          key={color}
                          className="h-10 w-10 rounded-full p-0"
                          style={{
                            backgroundColor: darkTheme
                              ? colors[color].dark
                              : color,
                          }}
                          onClick={() => handleChangeColor(color)}
                        />
                      ))}
                    </div>
                    <Popover.Arrow className="absolute fill-white" />
                  </Popover.Content>
                </Popover.Portal>
              </Popover.Root>
            </div>
            <AlertDialog.Root>
              <AlertDialog.Trigger asChild>
                <Button className="bg-transparent p-1 hover:bg-transparent dark:bg-transparent dark:hover:bg-transparent">
                  <X className="text-zinc-800 dark:text-slate-50" />
                </Button>
              </AlertDialog.Trigger>
              <AlertDialog.Portal>
                <AlertDialog.Overlay className="fixed inset-0 bg-zinc-900/50 data-[state=open]:animate-overlayShow" />
                <AlertDialog.Content className="fixed left-1/2 top-1/2 flex h-fit w-fit -translate-x-1/2 -translate-y-1/2 flex-col gap-6 rounded-lg bg-gray-100 px-4 py-2 focus:outline-none data-[state=open]:animate-contentShow dark:bg-zinc-700">
                  <div>
                    <AlertDialog.Title className="text-xl font-semibold">
                      Delete note {note.title}?
                    </AlertDialog.Title>
                    <AlertDialog.Description>
                      This action cannot be undone.
                    </AlertDialog.Description>
                  </div>
                  <div className="flex justify-end gap-3">
                    <AlertDialog.Cancel className="rounded-md px-4 py-1 outline-none transition-colors focus:ring-2 focus:ring-zinc-400 bg-zinc-500/70 hover:bg-zinc-500/50">
                      Cancel
                    </AlertDialog.Cancel>
                    <AlertDialog.Action
                      className="rounded-md px-4 py-1 font-semibold text-red-600 outline-none transition-colors focus:ring-2 focus:ring-red-400 bg-red-300 hover:bg-red-300/80"
                      onClick={handleDeleteNote}
                    >
                      Yes, delete note
                    </AlertDialog.Action>
                  </div>
                </AlertDialog.Content>
              </AlertDialog.Portal>
            </AlertDialog.Root>
          </div>
        </div>
      ) : (
        <EditNoteFormProvider note={note}>
          <EditNoteFormComponent
            cancelEdit={() => setIsEditing(false)}
            note={note}
            token={token}
          />
        </EditNoteFormProvider>
      )}
    </div>
  )
}

export { NoteCard }
