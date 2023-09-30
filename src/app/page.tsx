import {
  CreateNoteFormComponent,
  CreateNoteFormProvider,
} from '@/components/Form/Providers/CreateNoteForm'
import { SearchNoteFormProvider } from '@/components/Form/Providers/SearchNoteForm'
import { Header } from '@/components/Header'
import { ListNotes } from '@/components/ListNotes'
import { Title } from '@/components/Title'
import { getUserToken } from '@/lib/auth'

export default function Home() {
  const token = getUserToken()

  return (
    <div className="flex flex-col gap-2 py-3 px-6 w-full max-w-7xl">
      <SearchNoteFormProvider>
        <Header />
        <CreateNoteFormProvider>
          <CreateNoteFormComponent token={token} />
        </CreateNoteFormProvider>
        <section className="w-full flex flex-col gap-2 items-center">
          <Title className="text-start w-full text-base border-b border-b-zinc-700 dark:border-b-slate-50 md:text-xl lg:text-2xl">
            Starred
          </Title>
          <ListNotes favorites token={token} />
        </section>

        <section className="w-full flex flex-col gap-2 items-center">
          <Title className="text-start w-full text-base border-b border-b-zinc-700 dark:border-b-slate-50 md:text-xl lg:text-2xl">
            Other notes
          </Title>
          <ListNotes token={token} />
        </section>
      </SearchNoteFormProvider>
    </div>
  )
}
