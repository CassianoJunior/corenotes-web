import { ComponentProps, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface TextProps extends ComponentProps<'p'> {
  children: ReactNode
}

const Text = ({ className, ...props }: TextProps) => {
  return (
    <p
      className={twMerge([
        'text-zinc-800 dark:text-slate-50 w-full text-base text-center',
        className,
      ])}
      {...props}
    />
  )
}

export { Text }
