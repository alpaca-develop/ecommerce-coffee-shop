import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-amber-900 text-white py-12 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-2xl font-bold mb-4">caffè</h3>
          <p className="text-amber-200">最高のコーヒー体験を、あなたの手に</p>
        </div>
        <div>
          <h4 className="font-semibold mb-4">商品</h4>
          <ul className="space-y-2 text-amber-200">
            <li>
              <Link href="/products" className="hover:text-white transition-colors">
                エスプレッソマシン
              </Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-white transition-colors">
                ドリップ器具
              </Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-white transition-colors">
                グラインダー
              </Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-white transition-colors">
                アクセサリー
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">サポート</h4>
          <ul className="space-y-2 text-amber-200">
            <li>
              <Link href="/support" className="hover:text-white transition-colors">
                お問い合わせ
              </Link>
            </li>
            <li>
              <Link href="/support" className="hover:text-white transition-colors">
                配送について
              </Link>
            </li>
            <li>
              <Link href="/support" className="hover:text-white transition-colors">
                返品・交換
              </Link>
            </li>
            <li>
              <Link href="/support" className="hover:text-white transition-colors">
                よくある質問
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">会社情報</h4>
          <ul className="space-y-2 text-amber-200">
            <li>
              <Link href="/brand" className="hover:text-white transition-colors">
                会社概要
              </Link>
            </li>
            <li>
              <Link href="/brand" className="hover:text-white transition-colors">
                ブランドストーリー
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white transition-colors">
                プライバシーポリシー
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white transition-colors">
                利用規約
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-8 pt-8 border-t border-amber-800 text-center text-amber-200">
        <p>&copy; 2024 caffè. All rights reserved.</p>
      </div>
    </footer>
  )
}