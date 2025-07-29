// app/layout.tsx
import './globals.css'
import { Inter } from 'next/font/google'
import { ReactNode } from 'react'
import ReduxProvider from '../components/ReduxProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'CSV Viewer',
  description: 'View data from a CSV file',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  )
}
