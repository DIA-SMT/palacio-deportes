import React from "react"
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import dynamic from 'next/dynamic'

import './globals.css'
import { ThemeProvider } from "@/components/theme-provider"
import { AssistantWrapper } from "@/components/chat/assistant-wrapper"

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Palacio de los Deportes | San Miguel de Tucumán',
  description: 'El mejor espacio para recitales, eventos culturales, transmisiones deportivas y más en Tucumán. Descubrí la agenda y comprá tus entradas.',
  generator: 'v0.app',
  keywords: ['Palacio de los Deportes', 'Tucumán', 'eventos', 'recitales', 'San Miguel de Tucumán', 'entretenimiento'],
  icons: {
    icon: '/logoMuni-sm.png',
  },
  openGraph: {
    title: 'Palacio de los Deportes | San Miguel de Tucumán',
    description: 'El mejor espacio para recitales, eventos culturales y transmisiones deportivas en Tucumán.',
    type: 'website',
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${poppins.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          {children}
          <AssistantWrapper />
        </ThemeProvider>
      </body>
    </html>
  )
}
