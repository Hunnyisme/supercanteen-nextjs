'use client'
import './globals.css'

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body >
      <title>
          超级食堂
      </title>
      {children}
      </body>
    </html>
  )
}
