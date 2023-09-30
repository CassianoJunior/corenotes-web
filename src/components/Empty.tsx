import { Text } from '@/components/Text'
import { ComponentProps, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface EmptyProps extends ComponentProps<'div'> {
  message: string
  icon: ReactNode
}

const Empty = ({ message, icon, className, ...props }: EmptyProps) => {
  return (
    <div
      className={twMerge(
        'flex w-full flex-col items-center justify-center gap-2',
        className,
      )}
      {...props}
    >
      {icon}
      <Text className="font-bold text-zinc-800 dark:text-slate-50">
        {message}
      </Text>
    </div>
  )
}

export { Empty }
