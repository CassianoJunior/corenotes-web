'use client'

import * as Toggle from '@radix-ui/react-toggle'
import { MoonStar, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { ComponentProps, useCallback } from 'react'
import { twMerge } from 'tailwind-merge'

type ThemeSwitchProps = ComponentProps<'div'>

const ThemeSwitch = ({ className }: ThemeSwitchProps) => {
  const { theme, setTheme } = useTheme()

  const handleToggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }, [setTheme, theme])

  return (
    <div title="Toggle theme" className={twMerge('w-6 h-6 rounded', className)}>
      <Toggle.Root
        className="flex w-full h-full cursor-pointer outline-none"
        onPressedChange={handleToggleTheme}
      >
        {theme === 'dark' ? (
          <MoonStar
            className="text-zinc-700 dark:text-slate-50 h-5 md:h-6"
            strokeWidth={2}
          />
        ) : (
          <Sun
            className="text-zinc-700 dark:text-slate-200 h-5 md:h-6"
            strokeWidth={2}
          />
        )}
      </Toggle.Root>
    </div>
  )
}

export { ThemeSwitch }
