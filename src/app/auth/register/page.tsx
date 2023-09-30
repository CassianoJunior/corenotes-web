import {
  RegisterFormComponent,
  RegisterFormProvider,
} from '@/components/Form/Providers/RegisterForm'
import { Text } from '@/components/Text'
import { ThemeSwitch } from '@/components/ThemeSwitch'
import { Title } from '@/components/Title'
import Image from 'next/image'
import Link from 'next/link'

const RegisterPage = () => {
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
          Register a new account
        </Title>
        <Text className="mt-2 text-center text-sm text-gray-600">
          Already registered? &nbsp;
          <Link
            href={'/auth/login'}
            className="font-medium text-teal-400 hover:text-teal-300"
          >
            Log in
          </Link>
        </Text>
      </div>
      <RegisterFormProvider>
        <RegisterFormComponent />
      </RegisterFormProvider>
    </div>
  )
}

export default RegisterPage
