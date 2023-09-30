'use client'

import { Button } from '@/components/Button'
import { queryClient } from '@/lib/query-client'
import {
  UpdateNoteDTO,
  useUpdateNoteMutation,
} from '@/mutations/update-note-mutation'
import { Note } from '@/queries/fetch-user-notes-query'
import { colors } from '@/utils/colors'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircle2, XCircle } from 'lucide-react'
import { useTheme } from 'next-themes'
import { ComponentProps, ReactNode } from 'react'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'
import { Form } from '../Parts'

const editNoteSchema = z.object({
  title: z
    .string()
    .nonempty('Type a title')
    .refine((value) => value.trim().length > 0, {
      message: 'Type a title',
    }),
  content: z
    .string()
    .nonempty('Type a content')
    .refine((value) => value.trim().length > 0, {
      message: 'Type a content',
    }),
})

type EditNoteData = z.infer<typeof editNoteSchema>

interface EditNoteFormProviderProps {
  children: ReactNode
  note: Note
}

const EditNoteFormProvider = ({
  children,
  note,
}: EditNoteFormProviderProps) => {
  const editNoteForm = useForm<EditNoteData>({
    resolver: zodResolver(editNoteSchema),
    defaultValues: {
      content: note.content,
      title: note.title,
    },
  })

  return <FormProvider {...editNoteForm}>{children}</FormProvider>
}

interface EditNoteFormComponentProps extends ComponentProps<'form'> {
  token: string
  note: Note
  cancelEdit: () => void
}

const EditNoteFormComponent = ({
  token,
  note,
  cancelEdit,
  ...props
}: EditNoteFormComponentProps) => {
  const { handleSubmit, reset } = useFormContext<EditNoteData>()

  const { theme } = useTheme()
  const isDarkTheme = theme === 'dark'

  const { mutate } = useUpdateNoteMutation()

  const handleEditNote = handleSubmit((data) => {
    const newNote = {
      title: data.title,
      content: data.content,
      color: note.color,
    } satisfies UpdateNoteDTO

    mutate(
      { noteId: note.id, note: newNote, token },
      {
        onSuccess: () => {
          toast.success('Note edited!')
          queryClient.invalidateQueries(['notes', { token }])
        },
        onError: (error: any) => {
          toast.error(error.response?.data.message ?? 'Error editing note')
        },
        onSettled: () => {
          reset()
          cancelEdit()
        },
      },
    )
  })

  const colorToLoad = isDarkTheme ? colors[note.color].dark : note.color

  return (
    <form
      {...props}
      className="flex flex-col justify-between h-full gap-1 w-full px-2 py-1 md:max-w-sm"
    >
      <div className="divide-y divide-slate-50 w-full">
        <Form.Field>
          <Form.Input
            name="title"
            type="text"
            autoFocus
            containerStyle="rounded-t-2xl px-4"
            style={{ backgroundColor: colorToLoad }}
            placeholder={note.title}
            className="w-full"
          />
          <Form.ErrorMessage field="title" />
        </Form.Field>
        <Form.Field>
          <Form.Textarea
            name="content"
            containerClassName="rounded-b-2xl px-4"
            style={{ backgroundColor: colorToLoad }}
            containerStyle={{ backgroundColor: colorToLoad }}
            placeholder={note.content}
            className="w-full h-40 resize-none"
          />
          <Form.ErrorMessage field="content" />
        </Form.Field>
      </div>
      <div className="flex flex-row items-center justify-between px-4">
        <Button
          className="p-1 mr-2 hover:bg-transparent bg-transparent dark:hover:bg-zinc-600 dark:bg-transparent "
          onClick={cancelEdit}
        >
          <XCircle className="text-zinc-800 dark:text-slate-50" />
        </Button>
        <Button
          className="p-1 mr-2 hover:bg-transparent bg-transparent dark:hover:bg-zinc-600 dark:bg-transparent "
          onClick={handleEditNote}
        >
          <CheckCircle2 className="text-zinc-800 dark:text-slate-50" />
        </Button>
      </div>
    </form>
  )
}

export { EditNoteFormComponent, EditNoteFormProvider }
