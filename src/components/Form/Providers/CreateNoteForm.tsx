'use client'

import { Button } from '@/components/Button'
import { Text } from '@/components/Text'
import { queryClient } from '@/lib/query-client'
import {
  CreateNoteDTO,
  useCreateNoteMutation,
} from '@/mutations/create-note-mutation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Star } from 'lucide-react'
import { ComponentProps, ReactNode, useCallback, useState } from 'react'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'
import { Form } from '../Parts'

const createNoteSchema = z.object({
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
  isFavorite: z.boolean().default(false),
  color: z.string().default('#BAE2FF'),
})

type CreateNoteData = z.infer<typeof createNoteSchema>

interface CreateNoteFormProviderProps {
  children: ReactNode
}

const CreateNoteFormProvider = ({ children }: CreateNoteFormProviderProps) => {
  const createNoteForm = useForm<CreateNoteData>({
    resolver: zodResolver(createNoteSchema),
    defaultValues: {
      isFavorite: false,
    },
  })

  return <FormProvider {...createNoteForm}>{children}</FormProvider>
}

interface CreateNoteFormComponentProps extends ComponentProps<'form'> {
  token: string
}

const CreateNoteFormComponent = ({
  token,
  ...props
}: CreateNoteFormComponentProps) => {
  const [isFavorite, setIsFavorite] = useState(false)

  const { handleSubmit, reset } = useFormContext<CreateNoteData>()

  const { mutate } = useCreateNoteMutation()

  const handleToggleAsFavorite = useCallback(() => {
    setIsFavorite((prev) => !prev)
  }, [setIsFavorite])

  const handleCreateNote = handleSubmit((data) => {
    const note = {
      title: data.title,
      content: data.content,
      markedAsFavorite: isFavorite,
      color: data.color,
    } satisfies CreateNoteDTO

    mutate(
      { note, token },
      {
        onSuccess: () => {
          toast.success('Note created!')
          queryClient.invalidateQueries(['notes', { token }])
        },
        onError: (error: any) => {
          toast.error(error.response?.data.message ?? 'Error creating note')
        },
        onSettled: () => {
          reset()
          setIsFavorite(false)
        },
      },
    )
  })

  return (
    <form
      {...props}
      className="flex flex-col gap-1 w-full max-w-md lg:max-w-2xl lg:min-h-[16rem] px-2"
    >
      <div className="divide-y divide-gray-400 w-full h-full max-w-md lg:max-w-2xl">
        <Form.Field>
          <Form.Input
            name="title"
            type="text"
            containerStyle="dark:bg-zinc-600 bg-slate-50 rounded-t-2xl px-4"
            placeholder="Title"
            right={
              <Button
                className="bg-transparent dark:bg-transparent hover:bg-transparent dark:hover:bg-transparent w-fit p-0"
                onClick={handleToggleAsFavorite}
              >
                <Star
                  className="dark:text-slate-50 text-zinc-800 w-5"
                  fill={isFavorite ? '#ffe082' : 'none'}
                  stroke={isFavorite ? '#ffe082' : 'currentColor'}
                />
              </Button>
            }
            className="w-full"
          />
          <Form.ErrorMessage field="title" />
        </Form.Field>
        <Form.Field>
          <Form.Textarea
            name="content"
            containerClassName="dark:bg-zinc-600 bg-slate-50 rounded-b-2xl px-4"
            placeholder="Create a note..."
            className="w-full h-20 md:h-28 lg:h-44 resize-none"
          />
          <Form.ErrorMessage field="content" />
        </Form.Field>
      </div>
      <Button className="self-end" onClick={handleCreateNote}>
        <Text>Create note</Text>
      </Button>
    </form>
  )
}

export { CreateNoteFormComponent, CreateNoteFormProvider }
