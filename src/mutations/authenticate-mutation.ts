import { api } from '@/lib/axios'
import { useMutation } from 'react-query'

export interface AuthenticateMutationProps {
  email: string
  password: string
}

const AuthenticateMutation = async ({
  email,
  password,
}: AuthenticateMutationProps) => {
  const { data } = await api().post('/auth', {
    email,
    password,
  })

  return data as { access_token: string }
}

const useAuthenticateMutation = () => useMutation(AuthenticateMutation)

export { useAuthenticateMutation }
