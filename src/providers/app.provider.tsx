'use client'

import { queryClient } from '@/lib/query-client'
import { ThemeProvider } from 'next-themes'
import { ReactNode } from 'react'
import { QueryClientProvider } from 'react-query'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface AppProviderProps {
  children: ReactNode
}

const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="dark">
        {children}
      </ThemeProvider>
      <ToastContainer
        autoClose={3000}
        closeButton
        pauseOnHover
        newestOnTop
        closeOnClick
        position="bottom-right"
      />
    </QueryClientProvider>
  )
}

export { AppProvider }
