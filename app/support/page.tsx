import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { 
  MessageCircle, 
  Phone, 
  Mail, 
  Clock, 
  MapPin, 
  Truck, 
  RefreshCw, 
  Shield,
  HelpCircle,
  BookOpen,
  Download
} from "lucide-react"

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      <Header />

      {/* ヒーローセクション */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-amber-900">サポート</h1>
          <p className="text-xl text-gray-700 mb-8">
            お困りのことがございましたら、お気軽にお問い合わせください。
            専門スタッフが丁寧にサポートいたします。
          </p>
        </div>
      </section>

      {/* お問い合わせ方法 */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-amber-900">お問い合わせ方法</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="text-center border-none shadow-lg bg-white">
              <CardContent className="pt-8">
                <MessageCircle className="w-12 h-12 mx-auto mb-4 text-amber-600" />
                <h3 className="text-xl font-semibold mb-2 text-amber-900">チャットサポート</h3>
                <p className="text-gray-600 mb-4">
                  リアルタイムでお答えします
                </p>
                <p className="text-sm text-gray-500 mb-4">平日 9:00-18:00</p>
                <Button className="bg-amber-600 hover:bg-amber-700">
                  チャットを開始
                </Button>
              </CardContent>
            </Card>
            
            <Card className="text-center border-none shadow-lg bg-white">
              <CardContent className="pt-8">
                <Phone className="w-12 h-12 mx-auto mb-4 text-amber-600" />
                <h3 className="text-xl font-semibold mb-2 text-amber-900">電話サポート</h3>
                <p className="text-gray-600 mb-4">
                  お急ぎの場合はお電話で
                </p>
                <p className="font-semibold text-amber-900 mb-2">0120-123-456</p>
                <p className="text-sm text-gray-500">平日 9:00-18:00</p>
              </CardContent>
            </Card>
            
            <Card className="text-center border-none shadow-lg bg-white">
              <CardContent className="pt-8">
                <Mail className="w-12 h-12 mx-auto mb-4 text-amber-600" />
                <h3 className="text-xl font-semibold mb-2 text-amber-900">メールサポート</h3>
                <p className="text-gray-600 mb-4">
                  詳しいご相談はメールで
                </p>
                <p className="text-sm text-gray-500 mb-4">24時間受付</p>
                <Button variant="outline" className="border-amber-600 text-amber-600 hover:bg-amber-50">
                  メール作成
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* お問い合わせフォーム */}
      <section className="py-12 px-4 bg-white/50">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-amber-900">お問い合わせフォーム</h2>
          <Card className="shadow-lg bg-white">
            <CardContent className="p-8">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">お名前（姓）*</Label>
                    <Input id="firstName" placeholder="田中" className="border-amber-200 focus:border-amber-400" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">お名前（名）*</Label>
                    <Input id="lastName" placeholder="太郎" className="border-amber-200 focus:border-amber-400" />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email">メールアドレス*</Label>
                  <Input id="email" type="email" placeholder="example@email.com" className="border-amber-200 focus:border-amber-400" />
                </div>
                
                <div>
                  <Label htmlFor="phone">電話番号</Label>
                  <Input id="phone" type="tel" placeholder="090-1234-5678" className="border-amber-200 focus:border-amber-400" />
                </div>
                
                <div>
                  <Label htmlFor="category">お問い合わせ種別*</Label>
                  <select id="category" className="w-full p-2 border border-amber-200 rounded-md focus:border-amber-400">
                    <option value="">選択してください</option>
                    <option value="product">製品について</option>
                    <option value="order">注文について</option>
                    <option value="shipping">配送について</option>
                    <option value="warranty">保証について</option>
                    <option value="other">その他</option>
                  </select>
                </div>
                
                <div>
                  <Label htmlFor="subject">件名*</Label>
                  <Input id="subject" placeholder="お問い合わせの件名" className="border-amber-200 focus:border-amber-400" />
                </div>
                
                <div>
                  <Label htmlFor="message">お問い合わせ内容*</Label>
                  <Textarea 
                    id="message" 
                    placeholder="詳しい内容をご記入ください" 
                    rows={6}
                    className="border-amber-200 focus:border-amber-400" 
                  />
                </div>
                
                <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700">
                  送信する
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* よくある質問 */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-amber-900">よくある質問</h2>
          <div className="space-y-4">
            <Card className="border-none shadow-lg bg-white">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2 text-amber-900 flex items-center">
                  <HelpCircle className="w-5 h-5 mr-2" />
                  配送にはどのくらい時間がかかりますか？
                </h3>
                <p className="text-gray-600">
                  通常、ご注文から2-3営業日以内に発送いたします。お急ぎの場合は翌日配送も承っておりますので、お問い合わせください。
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-lg bg-white">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2 text-amber-900 flex items-center">
                  <HelpCircle className="w-5 h-5 mr-2" />
                  保証期間はどのくらいですか？
                </h3>
                <p className="text-gray-600">
                  すべての製品に2年間の品質保証をお付けしています。正常な使用において故障が発生した場合は、無償で修理・交換いたします。
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-lg bg-white">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2 text-amber-900 flex items-center">
                  <HelpCircle className="w-5 h-5 mr-2" />
                  返品・交換は可能ですか？
                </h3>
                <p className="text-gray-600">
                  商品到着から14日以内であれば、未使用品に限り返品・交換を承ります。詳しくは利用規約をご確認ください。
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* サポート情報 */}
      <section className="py-12 px-4 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-amber-900">サポート情報</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="text-center border-none shadow-lg bg-white">
              <CardContent className="pt-8">
                <Truck className="w-12 h-12 mx-auto mb-4 text-amber-600" />
                <h3 className="text-lg font-semibold mb-2 text-amber-900">配送について</h3>
                <p className="text-sm text-gray-600 mb-4">配送状況の確認や配送に関する詳細情報</p>
                <Button variant="outline" size="sm" className="border-amber-600 text-amber-600">
                  詳細を見る
                </Button>
              </CardContent>
            </Card>
            
            <Card className="text-center border-none shadow-lg bg-white">
              <CardContent className="pt-8">
                <RefreshCw className="w-12 h-12 mx-auto mb-4 text-amber-600" />
                <h3 className="text-lg font-semibold mb-2 text-amber-900">返品・交換</h3>
                <p className="text-sm text-gray-600 mb-4">返品・交換の手続きや条件について</p>
                <Button variant="outline" size="sm" className="border-amber-600 text-amber-600">
                  詳細を見る
                </Button>
              </CardContent>
            </Card>
            
            <Card className="text-center border-none shadow-lg bg-white">
              <CardContent className="pt-8">
                <Shield className="w-12 h-12 mx-auto mb-4 text-amber-600" />
                <h3 className="text-lg font-semibold mb-2 text-amber-900">保証サービス</h3>
                <p className="text-sm text-gray-600 mb-4">2年間保証の詳細とアフターサービス</p>
                <Button variant="outline" size="sm" className="border-amber-600 text-amber-600">
                  詳細を見る
                </Button>
              </CardContent>
            </Card>
            
            <Card className="text-center border-none shadow-lg bg-white">
              <CardContent className="pt-8">
                <BookOpen className="w-12 h-12 mx-auto mb-4 text-amber-600" />
                <h3 className="text-lg font-semibold mb-2 text-amber-900">取扱説明書</h3>
                <p className="text-sm text-gray-600 mb-4">製品の取扱説明書ダウンロード</p>
                <Button variant="outline" size="sm" className="border-amber-600 text-amber-600">
                  <Download className="w-4 h-4 mr-1" />
                  ダウンロード
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 営業時間・連絡先 */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-amber-900">営業時間・連絡先</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-none shadow-lg bg-white">
              <CardHeader>
                <CardTitle className="flex items-center text-amber-900">
                  <Clock className="w-5 h-5 mr-2" />
                  営業時間
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-gray-600">
                  <div className="flex justify-between">
                    <span>電話・チャットサポート</span>
                    <span>平日 9:00-18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>メールサポート</span>
                    <span>24時間受付</span>
                  </div>
                  <div className="flex justify-between">
                    <span>土日祝日</span>
                    <span>休業</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-lg bg-white">
              <CardHeader>
                <CardTitle className="flex items-center text-amber-900">
                  <MapPin className="w-5 h-5 mr-2" />
                  会社情報
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-gray-600">
                  <div>
                    <span className="font-semibold">株式会社 caffè</span>
                  </div>
                  <div>
                    〒150-0001<br />
                    東京都渋谷区神宮前1-1-1<br />
                    caffèビル 5F
                  </div>
                  <div>
                    <span className="font-semibold">TEL:</span> 0120-123-456
                  </div>
                  <div>
                    <span className="font-semibold">Email:</span> support@caffe.com
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}