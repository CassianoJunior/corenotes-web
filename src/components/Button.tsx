import { ComponentProps, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface ButtonProps extends ComponentProps<'button'> {
  children: ReactNode
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
      className={twMerge(
        [
          'py-1 text-base px-4 w-full bg-gray-500 hover:bg-gray-600/80 flex flex-row gap-2 rounded-md items-center justify-center text-slate-50 transition-colors',
        ],
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
