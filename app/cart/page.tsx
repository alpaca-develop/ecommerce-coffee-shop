import Header from "../components/Header"
import Footer from "../components/Footer"
import { CartContainer } from "../features/cart/Cart.container"

export default function CartPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      <Header />
      <CartContainer />
      <Footer />
    </div>
  )
}
