'use client'

import { Geist, Geist_Mono } from 'next/font/google'
import Header from './components/Header'
import Footer from './components/Footer'
import { Provider } from 'react-redux'
import './globals.css'
import { store } from './store/store'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider store={store}>
          <Header />
          <main className="flex-grow container mx-auto p-4 min-h-screen">
            {children}
          </main>
          <Footer />
        </Provider>
      </body>
    </html>
  )
}
