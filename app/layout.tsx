import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "caffè - 最高のコーヒー体験を、あなたの手に",
  description:
    "プロ仕様のコーヒー器具で、最高のコーヒー体験をお届けします。エスプレッソマシン、ドリップ器具、グラインダーなど、厳選された高品質な商品を取り揃えています。",
  keywords: "コーヒー, エスプレッソマシン, ドリップ, グラインダー, コーヒー器具",
  openGraph: {
    title: "caffè - 最高のコーヒー体験を、あなたの手に",
    description: "プロ仕様のコーヒー器具で、最高のコーヒー体験をお届けします。",
    type: "website",
    locale: "ja_JP",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
