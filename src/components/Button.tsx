import { ComponentProps, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface ButtonProps extends ComponentProps<'button'> {
  children?: ReactNode
  left?: ReactNode
  right?: ReactNode
}

const Button = ({
  children,
  className,
  left,
  right,
  ...props
}: ButtonProps) => {
  return (
    <button
      type="button"
      className={twMerge(
        'py-1 text-base px-4 w-fit dark:bg-zinc-600 bg-slate-200 hover:bg-gray-200/80 dark:hover:bg-gray-600/80 flex flex-row gap-2 rounded-md items-center justify-center text-slate-50 transition-colors outline-none',
        className,
      )}
      {...props}
    >
      {left}
      {children}
      {right}
    </button>
  )
}

export { Button }
