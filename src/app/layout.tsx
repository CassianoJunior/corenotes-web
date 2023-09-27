import type { Metadata } from 'next'
import { Session } from 'next-auth'
import { Inter } from 'next/font/google'
import { ReactNode } from 'react'
import './globals.css'
import { AppProvider } from '@/providers/app.provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Corenotes',
  description: 'Manage your notes with ease',
}

export default function RootLayout({
  children,
  session,
}: {
  children: ReactNode
  session: Session
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="w-screen h-screen flex flex-col items-center justify-start">
          <AppProvider NextAuthSession={session}>{children}</AppProvider>
        </main>
      </body>
    </html>
  )
}
