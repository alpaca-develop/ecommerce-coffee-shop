import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { Coffee, Award, Users, Globe, Heart, Star } from "lucide-react"
import Link from "next/link"

export default function BrandPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      <Header />

      {/* ヒーローセクション */}
      <section className="relative py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight text-amber-900">caffè</h1>
          <p className="text-xl md:text-2xl mb-8 font-light text-gray-700">
            最高のコーヒー体験を、あなたの手に
          </p>
          <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
            caffèは、コーヒーへの情熱から生まれたブランドです。
            最高のコーヒー体験を提供するために、職人の技術と現代のデザインを融合させ、
            美しく機能的なコーヒー器具を作り続けています。
          </p>
        </div>
      </section>

      {/* ブランドストーリー */}
      <section className="py-20 px-4 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-amber-900">私たちのストーリー</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  2015年、小さなカフェから始まった私たちの旅。創業者である田中は、
                  世界中を旅する中で出会った素晴らしいコーヒー体験を、
                  日本の皆さまにもお届けしたいという想いを抱きました。
                </p>
                <p>
                  美味しいコーヒーは、優れた器具から生まれる。この信念のもと、
                  イタリアの職人技術と日本の繊細なものづくりの心を融合させ、
                  caffèブランドが誕生しました。
                </p>
                <p>
                  一杯のコーヒーが持つ力を信じ、あなたの日常に特別な瞬間をお届けします。
                  それが私たちの使命です。
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="/placeholder.jpg"
                  alt="caffè創業者"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ブランド価値 */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-amber-900">私たちの価値観</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center border-none shadow-lg bg-white/80 backdrop-blur">
              <CardContent className="pt-8">
                <Heart className="w-12 h-12 mx-auto mb-4 text-amber-600" />
                <h3 className="text-xl font-semibold mb-2 text-amber-900">情熱</h3>
                <p className="text-gray-600">
                  コーヒーへの深い愛情と情熱が、私たちの製品作りの原動力です。
                  一つ一つに心を込めて、最高の品質をお届けします。
                </p>
              </CardContent>
            </Card>
            <Card className="text-center border-none shadow-lg bg-white/80 backdrop-blur">
              <CardContent className="pt-8">
                <Star className="w-12 h-12 mx-auto mb-4 text-amber-600" />
                <h3 className="text-xl font-semibold mb-2 text-amber-900">卓越性</h3>
                <p className="text-gray-600">
                  妥協のない品質追求。世界最高レベルの職人技術と
                  革新的なデザインで、卓越した製品を生み出します。
                </p>
              </CardContent>
            </Card>
            <Card className="text-center border-none shadow-lg bg-white/80 backdrop-blur">
              <CardContent className="pt-8">
                <Users className="w-12 h-12 mx-auto mb-4 text-amber-600" />
                <h3 className="text-xl font-semibold mb-2 text-amber-900">コミュニティ</h3>
                <p className="text-gray-600">
                  コーヒーを愛する人々とのつながりを大切にし、
                  共に成長し、学び合うコミュニティを築いています。
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 受賞歴・認定 */}
      <section className="py-20 px-4 bg-white/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-16 text-amber-900">受賞歴・認定</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-none shadow-lg bg-white">
              <CardContent className="p-8">
                <Award className="w-16 h-16 mx-auto mb-4 text-amber-600" />
                <h3 className="text-2xl font-semibold mb-2 text-amber-900">Good Design Award 2023</h3>
                <p className="text-gray-600">
                  エスプレッソマシン「MAESTRO」がグッドデザイン賞を受賞。
                  機能美と使いやすさが高く評価されました。
                </p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-lg bg-white">
              <CardContent className="p-8">
                <Globe className="w-16 h-16 mx-auto mb-4 text-amber-600" />
                <h3 className="text-2xl font-semibold mb-2 text-amber-900">国際品質認証</h3>
                <p className="text-gray-600">
                  ISO9001品質管理システム認証取得。
                  国際基準の品質管理体制で安心・安全をお約束します。
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 環境への取り組み */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 text-amber-900">環境への取り組み</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            地球環境を守ることは、未来のコーヒー文化を守ることです。
            caffèは持続可能な製品作りと環境配慮を積極的に推進しています。
          </p>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div className="bg-white/80 p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-2 text-amber-900">リサイクル素材使用</h3>
              <p className="text-gray-600">
                製品の30%以上にリサイクル素材を使用し、資源の有効活用に努めています。
              </p>
            </div>
            <div className="bg-white/80 p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-2 text-amber-900">カーボンニュートラル</h3>
              <p className="text-gray-600">
                2030年までにカーボンニュートラルな生産体制の確立を目指しています。
              </p>
            </div>
            <div className="bg-white/80 p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-2 text-amber-900">フェアトレード</h3>
              <p className="text-gray-600">
                原材料調達において、フェアトレード認証を受けた素材を優先的に使用。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-amber-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">caffèの世界を体験してください</h2>
          <p className="text-xl mb-8 opacity-90">
            最高のコーヒー体験をお届けする製品をご覧ください
          </p>
          <Button asChild size="lg" className="bg-white text-amber-900 hover:bg-gray-100">
            <Link href="/products">製品を見る</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}