"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, User, Menu, X, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useCartStore } from "@/lib/store"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const cart = useCartStore((state) => state.cart)
  const cartItemCount = cart.items.reduce((total, item) => total + item.quantity, 0)

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-amber-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* ロゴ */}
          <Link href="/" className="text-2xl font-bold text-amber-900">
            caffè
          </Link>

          {/* デスクトップナビゲーション */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-amber-600 transition-colors">
              ホーム
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-amber-600 transition-colors">
              商品一覧
            </Link>
            <Link href="/brand" className="text-gray-700 hover:text-amber-600 transition-colors">
              ブランド
            </Link>
            <Link href="/support" className="text-gray-700 hover:text-amber-600 transition-colors">
              サポート
            </Link>
          </nav>

          {/* 検索バー */}
          <div className="hidden lg:flex items-center space-x-2 flex-1 max-w-md mx-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="search"
                placeholder="商品を検索..."
                className="pl-10 border-amber-200 focus:border-amber-400"
              />
            </div>
          </div>

          {/* アクションボタン */}
          <div className="flex items-center space-x-4">
            <Button asChild variant="ghost" size="sm" className="hidden md:flex">
              <Link href="/auth/login">
                <User className="w-4 h-4 mr-2" />
                ログイン
              </Link>
            </Button>

            <Button asChild variant="ghost" size="sm" className="relative">
              <Link href="/cart">
                <ShoppingCart className="w-4 h-4" />
                {cartItemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {cartItemCount}
                  </Badge>
                )}
              </Link>
            </Button>

            {/* モバイルメニューボタン */}
            <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* モバイルメニュー */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-amber-200 py-4">
            <div className="flex flex-col space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="search"
                  placeholder="商品を検索..."
                  className="pl-10 border-amber-200 focus:border-amber-400"
                />
              </div>
              <Link href="/" className="text-gray-700 hover:text-amber-600 transition-colors py-2">
                ホーム
              </Link>
              <Link href="/products" className="text-gray-700 hover:text-amber-600 transition-colors py-2">
                商品一覧
              </Link>
              <Link href="/brand" className="text-gray-700 hover:text-amber-600 transition-colors py-2">
                ブランド
              </Link>
              <Link href="/support" className="text-gray-700 hover:text-amber-600 transition-colors py-2">
                サポート
              </Link>
              <Link href="/auth/login" className="text-gray-700 hover:text-amber-600 transition-colors py-2">
                ログイン
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
