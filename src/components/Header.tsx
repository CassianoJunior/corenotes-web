'use client'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { LogOut, Menu } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import nookies from 'nookies'
import { Button } from './Button'
import { SearchNoteFormComponent } from './Form/Providers/SearchNoteForm'
import { Text } from './Text'
import { ThemeSwitch } from './ThemeSwitch'
import { Title } from './Title'

const Header = () => {
  const router = useRouter()

  const handleSignOut = () => {
    nookies.destroy(null, 'token', { path: '/' })
    router.refresh()
  }

  return (
    <nav className="w-full h-fit flex flex-row items-center justify-between py-3">
      <div className="flex flex-row items-center justify-start gap-4 w-full">
        <div className="flex flex-row items-center justify-start gap-2">
          <Image
            src="/note.svg"
            width={40}
            height={40}
            className="w-6 h-6 md:h-10 md:w-10"
            alt="Logo Corenotes"
          />
          <Title className="text-base md:text-lg w-fit">CoreNotes</Title>
        </div>
        <SearchNoteFormComponent className="pr-4 sm:w-1/2" />
      </div>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger className="p-1 bg-transparent hover:bg-gray-300 dark:hover:bg-zinc-600 rounded-md transition-colors">
          <Menu className="text-zinc-800 dark:text-slate-50" />
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            sideOffset={5}
            align="end"
            className="flex flex-col items-center justify-center gap-3 py-2 px-4 bg-gray-300 dark:bg-gray-400 will-change-[opacity,transform] data-[side=bottom]:animate-slideUpAndFade rounded-md"
          >
            <DropdownMenu.Item asChild className="outline-none">
              <div className="flex flex-row items-center justify-center gap-2">
                <Text>Toggle theme</Text>
                <ThemeSwitch />
              </div>
            </DropdownMenu.Item>
            <DropdownMenu.Item asChild title="Log out">
              <Button
                className="text-zinc-800 dark:text-slate-50 w-full outline-none"
                onClick={handleSignOut}
                right={
                  <LogOut className="text-zinc-800 dark:text-slate-50 w-5" />
                }
              >
                Log out
              </Button>
            </DropdownMenu.Item>
            <DropdownMenu.Arrow fill="#9ca3af" />
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </nav>
  )
}

export { Header }
