'use client'

import { queryClient } from '@/lib/query-client'
import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'
import { ReactNode } from 'react'
import { QueryClientProvider } from 'react-query'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface AppProviderProps {
  children: ReactNode
  NextAuthSession: Session
}

const AppProvider = ({ children, NextAuthSession }: AppProviderProps) => {
  return (
    <SessionProvider session={NextAuthSession}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          {children}
        </ThemeProvider>
      </QueryClientProvider>
      <ToastContainer
        autoClose={3000}
        closeButton
        pauseOnHover
        newestOnTop
        closeOnClick
        position="top-right"
      />
    </SessionProvider>
  )
}

export { AppProvider }
