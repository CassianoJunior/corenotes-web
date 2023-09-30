'use client'

import { Button } from '@/components/Button'
import { useAuthenticateMutation } from '@/mutations/authenticate-mutation'
import { useRegisterMutation } from '@/mutations/register-mutation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, Loader2, UserPlus2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import nookies from 'nookies'
import { ReactNode, useCallback, useState } from 'react'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'
import { Form } from '../Parts'

const createRegisterFormSchema = z
  .object({
    name: z.string().nonempty('Type your name'),
    email: z.string().nonempty('Type your email').email('Type a valid email'),
    password: z
      .string()
      .nonempty('Type your password')
      .min(8, 'Password must be at least 8 characters')
      .refine((value) => value.trim().length > 0, {
        message: 'Type your password',
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  })

type createRegisterFormData = z.infer<typeof createRegisterFormSchema>

interface RegisterFormProviderProps {
  children: ReactNode
}

const RegisterFormProvider = ({ children }: RegisterFormProviderProps) => {
  const createRegisterForm = useForm<createRegisterFormData>({
    resolver: zodResolver(createRegisterFormSchema),
  })

  return <FormProvider {...createRegisterForm}>{children}</FormProvider>
}

const RegisterFormComponent = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const { mutate: login } = useAuthenticateMutation()
  const { mutateAsync: register } = useRegisterMutation()

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((state) => !state)
  }, [])

  const toggleConfirmPasswordVisibility = useCallback(() => {
    setShowConfirmPassword((state) => !state)
  }, [])

  const { handleSubmit, reset } = useFormContext<createRegisterFormData>()

  const handleClickRegisterButton = handleSubmit(async (data) => {
    setLoading(true)

    await register(
      {
        email: data.email,
        name: data.name,
        password: data.password,
      },
      {
        onSuccess: () => {
          login(
            { email: data.email, password: data.password },
            {
              onSuccess: (res: any) => {
                nookies.set(null, 'token', res.access_token, {
                  maxAge: 60 * 60 * 24 * 1, // 1 day
                  path: '/',
                })
                toast.success('Registered successfully')
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
        },
        onError: (error: any) => {
          toast.error(error.response.data.message ?? 'Error on register')
        },
      },
    )
  })

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="w-full mt-4 flex flex-col items-center justify-center gap-2 max-w-xl"
    >
      <Form.Field className="w-full">
        <Form.Input
          name="name"
          placeholder="Your name"
          className="dark:bg-zinc-600 bg-slate-50 placeholder:text-gray-300"
          containerStyle="dark:bg-zinc-600 bg-slate-50 w-full max-w-xl"
          autoComplete="off"
        />
        <Form.ErrorMessage field="name" />
      </Form.Field>
      <Form.Field className="w-full">
        <Form.Input
          name="email"
          placeholder="Your email"
          className="dark:bg-zinc-600 bg-slate-50 placeholder:text-gray-300"
          containerStyle="dark:bg-zinc-600 bg-slate-50 w-full max-w-xl"
          autoComplete="off"
        />
        <Form.ErrorMessage field="email" />
      </Form.Field>
      <Form.Field className="w-full">
        <Form.Input
          name="password"
          placeholder="Your password"
          className="dark:bg-zinc-600 bg-slate-50 placeholder:text-zinc-300"
          containerStyle="dark:bg-zinc-600 bg-slate-50 w-full"
          type={showPassword ? 'text' : 'password'}
          right={
            showPassword ? (
              <EyeOff
                className="text-slate-50 cursor-pointer w-5"
                onClick={togglePasswordVisibility}
              />
            ) : (
              <Eye
                className="text-slate-50 cursor-pointer w-5"
                onClick={togglePasswordVisibility}
              />
            )
          }
        />
        <Form.ErrorMessage field="password" />
      </Form.Field>
      <Form.Field className="w-full">
        <Form.Input
          name="confirmPassword"
          placeholder="Confirm your password"
          className="dark:bg-zinc-600 bg-slate-50 placeholder:text-zinc-300"
          containerStyle="dark:bg-zinc-600 bg-slate-50 w-full"
          type={showConfirmPassword ? 'text' : 'password'}
          right={
            showConfirmPassword ? (
              <EyeOff
                className="text-slate-50 cursor-pointer w-5"
                onClick={toggleConfirmPasswordVisibility}
              />
            ) : (
              <Eye
                className="text-slate-50 cursor-pointer w-5"
                onClick={toggleConfirmPasswordVisibility}
              />
            )
          }
        />
        <Form.ErrorMessage field="confirmPassword" />
      </Form.Field>
      <Button
        type="submit"
        right={
          !loading ? (
            <UserPlus2 className="text-slate-50" />
          ) : (
            <Loader2 className="animate-spin text-slate-50" />
          )
        }
        className="self-end bg-teal-400 dark:bg-teal-400 hover:bg-teal-300"
        onClick={handleClickRegisterButton}
      >
        Register
      </Button>
    </form>
  )
}

export { RegisterFormComponent, RegisterFormProvider }
