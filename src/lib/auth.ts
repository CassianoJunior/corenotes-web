import { cookies } from 'next/headers'

export const getUserToken = () => {
  const token = cookies().get('token')?.value

  if (!token) {
    throw new Error('No token found')
  }

  return token
}
