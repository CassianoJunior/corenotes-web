import { api } from '@/lib/axios'
import { useMutation } from 'react-query'

export interface RegisterMutationProps {
  name: string
  email: string
  password: string
}

const registerMutation = async ({
  name,
  email,
  password,
}: RegisterMutationProps) => {
  const { data } = await api().post('/accounts', {
    name,
    email,
    password,
  })

  return data
}

const useRegisterMutation = () => useMutation(registerMutation)

export { useRegisterMutation }
