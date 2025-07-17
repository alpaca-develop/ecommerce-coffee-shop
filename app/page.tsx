'use client';

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Header from "./components/Header"
import Footer from "./components/Footer"
import { Coffee, Award, Truck, Shield } from "lucide-react"
import { ProductsContainer } from "./features/products/Products.container"
import { useState, useEffect } from "react"
import { Product } from "@/types"

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  // HTMLタグを削除する関数
  const stripHtml = (html: string) => {
    return html.replace(/<[^>]*>/g, '').trim()
  }

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await fetch('/api/products')
        if (response.ok) {
          const products: Product[] = await response.json()
          console.log('取得した商品:', products)
          
          // 注目商品のみを取得し、最大3件に制限
          const featured = products.filter(product => product.featured).slice(0, 3)
          console.log('注目商品:', featured)
          
          // 注目商品がない場合は、最初の3件を表示
          if (featured.length === 0 && products.length > 0) {
            setFeaturedProducts(products.slice(0, 3))
          } else {
            setFeaturedProducts(featured)
          }
        } else {
          console.error('商品取得に失敗:', response.status, response.statusText)
        }
      } catch (error) {
        console.error('注目商品の取得に失敗しました:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedProducts()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      <Header />

      {/* ヒーローセクション */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/80 to-orange-900/60 z-10" />
        {/* PC背景画像 */}
        <Image
          src="/image-pc.png"
          alt="コーヒー器具の背景"
          fill
          className="object-cover hidden md:block"
          priority
        />
        {/* スマホ背景画像 */}
        <Image
          src="/image-sp.png"
          alt="コーヒー器具の背景"
          fill
          className="object-cover block md:hidden"
          priority
        />
        <div className="relative z-20 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight">caffè</h1>
          <p className="text-xl md:text-2xl mb-8 font-light">最高のコーヒー体験を、あなたの手に</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 text-lg">
              <Link href="/products">商品を見る</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-amber-900 px-8 py-4 text-lg bg-transparent"
            >
              <Link href="#about">ブランドについて</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 特徴セクション */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-amber-900">なぜcaffèを選ぶのか</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <Card className="text-center border-none shadow-lg bg-white/80 backdrop-blur">
              <CardContent className="pt-8">
                <Coffee className="w-12 h-12 mx-auto mb-4 text-amber-600" />
                <h3 className="text-xl font-semibold mb-2 text-amber-900">職人品質</h3>
                <p className="text-gray-600">熟練の職人が一つ一つ丁寧に作り上げた高品質な器具</p>
              </CardContent>
            </Card>
            <Card className="text-center border-none shadow-lg bg-white/80 backdrop-blur">
              <CardContent className="pt-8">
                <Award className="w-12 h-12 mx-auto mb-4 text-amber-600" />
                <h3 className="text-xl font-semibold mb-2 text-amber-900">受賞歴</h3>
                <p className="text-gray-600">国際的なデザイン賞を多数受賞した美しいデザイン</p>
              </CardContent>
            </Card>
            <Card className="text-center border-none shadow-lg bg-white/80 backdrop-blur">
              <CardContent className="pt-8">
                <Truck className="w-12 h-12 mx-auto mb-4 text-amber-600" />
                <h3 className="text-xl font-semibold mb-2 text-amber-900">迅速配送</h3>
                <p className="text-gray-600">全国送料無料、最短翌日お届けで素早くお手元に</p>
              </CardContent>
            </Card>
            <Card className="text-center border-none shadow-lg bg-white/80 backdrop-blur">
              <CardContent className="pt-8">
                <Shield className="w-12 h-12 mx-auto mb-4 text-amber-600" />
                <h3 className="text-xl font-semibold mb-2 text-amber-900">品質保証</h3>
                <p className="text-gray-600">2年間の品質保証と充実したアフターサポート</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 注目商品セクション */}
      <section className="py-20 px-4 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-amber-900">注目の商品</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {loading ? (
              // ローディング状態
              Array.from({ length: 3 }).map((_, i) => (
                <Card key={i} className="border-none shadow-lg bg-white">
                  <CardContent className="p-0">
                    <div className="h-64 bg-gray-200 animate-pulse" />
                    <div className="p-6">
                      <div className="h-6 bg-gray-200 animate-pulse mb-2 rounded" />
                      <div className="h-4 bg-gray-200 animate-pulse mb-4 rounded" />
                      <div className="flex justify-between items-center">
                        <div className="h-8 w-24 bg-gray-200 animate-pulse rounded" />
                        <div className="h-10 w-20 bg-gray-200 animate-pulse rounded" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              featuredProducts.map((product) => (
                <Card
                  key={product.id}
                  className="group cursor-pointer border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white"
                >
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden bg-gray-50">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={300}
                        height={300}
                        className="w-full h-64 object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2 text-amber-900">{product.name}</h3>
                      <p className="text-gray-600 mb-4">{stripHtml(product.description)}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-amber-600">¥{product.price.toLocaleString()}</span>
                        <Button asChild className="bg-amber-600 hover:bg-amber-700">
                          <Link href={`/products/${product.id}`}>詳細を見る</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
            
            {!loading && featuredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">注目商品が見つかりません</p>
                <Button asChild className="mt-4 bg-amber-600 hover:bg-amber-700">
                  <Link href="/products">すべての商品を見る</Link>
                </Button>
              </div>
            )}
          </div>
          <div className="text-center mt-12">
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white bg-transparent"
            >
              <Link href="/products">すべての商品を見る</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ブランドストーリー */}
      <section id="about" className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 text-amber-900">私たちのストーリー</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            caffèは、コーヒーへの情熱から生まれたブランドです。
            最高のコーヒー体験を提供するために、職人の技術と現代のデザインを融合させ、
            美しく機能的なコーヒー器具を作り続けています。
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            一杯のコーヒーが持つ力を信じ、あなたの日常に特別な瞬間をお届けします。
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
