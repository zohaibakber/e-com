import { ModalProvider } from '@/providers/modal-provider'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from '@/components/ui/toaster'
import { getServerSession } from 'next-auth'
import SessionProvider from "@/components/SessionProvider"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'E-com app',
  description: 'E-com app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
        <Toaster/>
        <ModalProvider />
        {children}
        </SessionProvider>
        </body>
    </html>
  )
}
