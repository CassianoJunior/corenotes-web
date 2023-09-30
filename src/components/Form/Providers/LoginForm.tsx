'use client'

import { Button } from '@/components/Button'
import { useAuthenticateMutation } from '@/mutations/authenticate-mutation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, Loader2, LogIn } from 'lucide-react'
import { useRouter } from 'next/navigation'
import nookies from 'nookies'
import { ReactNode, useCallback, useState } from 'react'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'
import { Form } from '../Parts'

const createLoginFormSchema = z.object({
  email: z.string().nonempty('Type your email').email('Type a valid email'),
  password: z
    .string()
    .nonempty('Type your password')
    .refine((value) => value.trim().length > 0, {
      message: 'Type your password',
    }),
})

type createLoginFormData = z.infer<typeof createLoginFormSchema>

interface LoginFormProviderProps {
  children: ReactNode
}

const LoginFormProvider = ({ children }: LoginFormProviderProps) => {
  const createLoginForm = useForm<createLoginFormData>({
    resolver: zodResolver(createLoginFormSchema),
  })

  return <FormProvider {...createLoginForm}>{children}</FormProvider>
}

const LoginFormComponent = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const { mutate } = useAuthenticateMutation()

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((state) => !state)
  }, [])

  const { handleSubmit, reset } = useFormContext<createLoginFormData>()

  const handleClickLoginButton = handleSubmit((data) => {
    setLoading(true)

    mutate(
      { email: data.email, password: data.password },
      {
        onSuccess: (res: any) => {
          nookies.set(null, 'token', res.access_token, {
            maxAge: 60 * 60 * 24 * 1, // 1 day
            path: '/',
          })
          toast.success('Logged in')
          router.push('/')
        },
        onError: (error: any) => {
          toast.error(error.response.data.message ?? 'Error on auth')
        },
        onSettled: () => {
          setLoading(false)
          reset()
        },
      },
    )
  })

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="w-full mt-4 flex flex-col items-center justify-center gap-2 max-w-xl"
    >
      <Form.Field className="w-full max-w-xl">
        <Form.Input
          name="email"
          placeholder="Your email"
          className="dark:bg-zinc-600 bg-slate-50 placeholder:text-gray-300"
          containerStyle="dark:bg-zinc-600 bg-slate-50 w-full"
          autoComplete="off"
        />
        <Form.ErrorMessage field="email" />
      </Form.Field>
      <Form.Field className="w-full max-w-xl">
        <Form.Input
          name="password"
          placeholder="Your password"
          className="dark:bg-zinc-600 bg-slate-50 placeholder:text-zinc-300"
          containerStyle="dark:bg-zinc-600 bg-slate-50 w-full"
          type={showPassword ? 'text' : 'password'}
          right={
            showPassword ? (
              <EyeOff
                className="text-slate-50 cursor-pointer"
                onClick={togglePasswordVisibility}
              />
            ) : (
              <Eye
                className="text-slate-50 cursor-pointer"
                onClick={togglePasswordVisibility}
              />
            )
          }
        />
        <Form.ErrorMessage field="password" />
      </Form.Field>
      <Button
        type="submit"
        right={
          !loading ? (
            <LogIn className="text-slate-50" />
          ) : (
            <Loader2 className="animate-spin text-slate-50" />
          )
        }
        className="self-end bg-teal-400 dark:bg-teal-400 hover:bg-teal-300"
        onClick={handleClickLoginButton}
      >
        Log In
      </Button>
    </form>
  )
}

export { LoginFormComponent, LoginFormProvider }
