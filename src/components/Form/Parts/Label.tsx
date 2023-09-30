import { ComponentProps } from 'react'

type LabelProps = ComponentProps<'label'>

export function Label(props: LabelProps) {
  return (
    <label
      className="flex items-center justify-between text-sm text-zinc-600"
      {...props}
    />
  )
}
