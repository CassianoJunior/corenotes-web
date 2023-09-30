import { AppProvider } from '@/providers/app.provider'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ReactNode } from 'react'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Corenotes',
  description: 'Manage your notes with ease',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="w-screen h-screen pb-4 flex flex-col items-center justify-start bg-gray-100 dark:bg-zinc-700 overflow-x-hidden overflow-y-scroll">
          <AppProvider>{children}</AppProvider>
        </main>
      </body>
    </html>
  )
}
