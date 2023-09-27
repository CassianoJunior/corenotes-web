import { ComponentProps, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface TitleProps extends ComponentProps<'h2'> {
  children: ReactNode
}

const Title = ({ children, className, ...props }: TitleProps) => {
  return (
    <h2
      className={twMerge([
        'font-bold text-2xl text-zinc-800 dark:text-slate-50 w-full text-center',
        className,
      ])}
      {...props}
    >
      {children}
    </h2>
  )
}

export { Title }
