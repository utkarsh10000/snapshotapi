import { Syne, DM_Mono } from 'next/font/google'
import './globals.css'

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '700', '800'],
  variable: '--font-syne',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-mono',
})

export const metadata = {
  title: 'snapshot.api — Turn any URL into a screenshot instantly',
  description: 'One API call. Get a pixel-perfect screenshot of any webpage in under 2 seconds.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${syne.variable} ${dmMono.variable}`}>
        {children}
      </body>
    </html>
  )
}