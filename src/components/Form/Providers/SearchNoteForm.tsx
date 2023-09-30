'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Search } from 'lucide-react'
import { ComponentProps, ReactNode } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form } from '../Parts'

const createSearchNoteSchema = z.object({
  search: z.string(),
})

export type CreateSearchNoteData = z.infer<typeof createSearchNoteSchema>

interface SearchNoteFormProviderProps {
  children: ReactNode
}

const SearchNoteFormProvider = ({ children }: SearchNoteFormProviderProps) => {
  const createSearchNoteForm = useForm<CreateSearchNoteData>({
    resolver: zodResolver(createSearchNoteSchema),
  })

  return <FormProvider {...createSearchNoteForm}>{children}</FormProvider>
}

type SearchNoteFormComponentProps = ComponentProps<'form'>

const SearchNoteFormComponent = (props: SearchNoteFormComponentProps) => {
  return (
    <form {...props} onSubmit={(e) => e.preventDefault()}>
      <Form.Field className="w-full">
        <Form.Input
          name="search"
          type="text"
          containerStyle="dark:bg-zinc-600 bg-slate-50"
          className="w-full dark:bg-zinc-600 bg-slate-50 rounded-md text-base outline-none"
          placeholder="Search notes"
          autoComplete="off"
          right={<Search className="text-gray-400" />}
        />
        <Form.ErrorMessage field="search" />
      </Form.Field>
    </form>
  )
}

export { SearchNoteFormComponent, SearchNoteFormProvider }
