import type { Metadata } from 'next'
import { roboto } from '@/styles/fonts'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'Desafio Radio Browser',
  description: 'Desafio Radio Browser por Coodesh',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${roboto.className} bg-stone-300 text-black antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
