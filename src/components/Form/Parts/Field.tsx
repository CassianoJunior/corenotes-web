import { ComponentProps } from 'react'

type FieldProps = ComponentProps<'div'>

export function Field(props: FieldProps) {
  return <div className="flex flex-col gap-1" {...props} />
}
