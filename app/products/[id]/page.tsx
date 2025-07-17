import Header from "../../components/Header"
import Footer from "../../components/Footer"
import { ProductDetailContainer } from "../../features/products/ProductDetail.container"

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      <Header />
      <ProductDetailContainer productId={params.id} />
      <Footer />
    </div>
  )
}
