import type { Metadata } from 'next'
import { Lexend } from 'next/font/google'
import './globals.css'
import Providers from '../providers'

const lexend = Lexend({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Tranzit',
  description: 'All in one defi',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={lexend.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
