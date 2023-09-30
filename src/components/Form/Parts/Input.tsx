'use client'

import { ComponentProps, ReactNode } from 'react'
import { useFormContext } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

interface InputProps extends ComponentProps<'input'> {
  name: string
  containerStyle?: string
  left?: ReactNode
  right?: ReactNode
}

export function Input({
  name,
  left,
  right,
  containerStyle,
  className,
  ...props
}: InputProps) {
  const { register } = useFormContext()

  return (
    <div
      className={twMerge(
        'flex flex-row items-center justify-center gap-2 rounded px-2 py-1',
        containerStyle,
      )}
    >
      {left}
      <input
        id={name}
        className={twMerge(
          'flex-1 py-1 text-zinc-800 bg-slate-50 dark:bg-zinc-600 dark:text-slate-50 placeholder:text-gray-400 focus:outline-none',
          className,
        )}
        {...register(name)}
        {...props}
      />
      {right}
    </div>
  )
}
