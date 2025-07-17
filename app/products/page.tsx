import Header from "../components/Header"
import Footer from "../components/Footer"
import { ProductsContainer } from "../features/products/Products.container"

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-amber-900 mb-4">商品一覧</h1>
          <p className="text-lg text-gray-600">プレミアムなコーヒー器具をご覧ください</p>
        </div>

        <ProductsContainer />
      </div>
      <Footer />
    </div>
  )
}
