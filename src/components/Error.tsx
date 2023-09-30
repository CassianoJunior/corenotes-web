import Lottie from 'lottie-react'
import error from '../assets/error.json'
import { Title } from './Title'

interface ErrorProps {
  message: string
}

const Error = ({ message }: ErrorProps) => {
  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="h-72 w-72">
        <Lottie animationData={error} loop autoplay width={40} height={40} />
      </div>
      <Title className="text-center">{message}</Title>
    </div>
  )
}

export { Error }
