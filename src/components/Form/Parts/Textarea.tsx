'use client'

import { ComponentProps, ReactNode, StyleHTMLAttributes } from 'react'
import { useFormContext } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

interface TextareaProps extends ComponentProps<'textarea'> {
  name: string
  containerStyle?: StyleHTMLAttributes<'div'>['style']
  containerClassName?: string
  left?: ReactNode
  right?: ReactNode
}

export function Textarea({
  name,
  left,
  right,
  containerStyle,
  containerClassName,
  className,
  ...props
}: TextareaProps) {
  const { register } = useFormContext()

  return (
    <div
      className={twMerge(
        'flex flex-row items-center justify-center gap-2 rounded bg-slate-50 px-3 py-1',
        containerClassName,
      )}
      style={{ ...containerStyle }}
    >
      {left}
      <textarea
        id={name}
        className={twMerge(
          'flex-1 py-2 dark:text-slate-50 text-zinc-800 dark:bg-zinc-600 placeholder:text-gray-400 bg-slate-50 focus:outline-none ',
          className,
        )}
        {...register(name)}
        {...props}
      />
      {right}
    </div>
  )
}
