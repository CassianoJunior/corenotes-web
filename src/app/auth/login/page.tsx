import {
  LoginFormComponent,
  LoginFormProvider,
} from '@/components/Form/Providers/LoginForm'
import { Text } from '@/components/Text'
import { ThemeSwitch } from '@/components/ThemeSwitch'
import { Title } from '@/components/Title'
import Image from 'next/image'
import Link from 'next/link'

const LoginPage = () => {
  return (
    <div className="relative h-screen w-full flex flex-col items-center justify-center px-4">
      <ThemeSwitch className="absolute top-4 right-4" />
      <div className="mb-10">
        <div className="flex justify-center">
          <Image
            alt="Core Logo"
            className="h-14 w-14"
            src="/note.svg"
            width={40}
            height={40}
          />
        </div>
        <Title className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Login to your account
        </Title>
        <Text className="mt-2 text-center text-sm text-gray-600">
          Don&apos;t have an account yet? &nbsp;
          <Link
            href={'/auth/register'}
            className="font-medium text-teal-400 hover:text-teal-300"
          >
            Register
          </Link>
        </Text>
      </div>
      <LoginFormProvider>
        <LoginFormComponent />
      </LoginFormProvider>
    </div>
  )
}

export default LoginPage
