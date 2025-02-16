import type { Metadata } from 'next'
import { roboto } from '@/styles/fonts'
import '@/styles/globals.css'

import { Providers } from '@/components/providers'

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
        className={`${roboto.className} bg-zinc-900 text-white antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
