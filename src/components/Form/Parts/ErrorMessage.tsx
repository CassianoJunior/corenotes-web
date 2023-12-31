'use client'

import { ComponentProps } from 'react'
import { useFormContext } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

const get = (obj: Record<string, any>, path: string) => {
  const travel = (regexp: RegExp) =>
    String.prototype.split
      .call(path, regexp)
      .filter(Boolean)
      .reduce(
        (res, key) => (res !== null && res !== undefined ? res[key] : res),
        obj,
      )

  const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/)

  return result
}

interface ErrorMessageProps extends ComponentProps<'span'> {
  field: string
}

const ErrorMessage = ({ field, className, ...props }: ErrorMessageProps) => {
  const {
    formState: { errors },
  } = useFormContext()

  const fieldError = get(errors, field)

  if (!fieldError) {
    return null
  }

  return (
    <span className={twMerge('text-xs text-red-400', className)} {...props}>
      {fieldError.message?.toString()}
    </span>
  )
}

export { ErrorMessage }
