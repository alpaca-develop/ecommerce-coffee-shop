import { type NextRequest, NextResponse } from "next/server"
import { stripe } from "@/lib/stripe/config"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { items } = body

    console.log('決済リクエスト受信:', { items })

    if (!items || items.length === 0) {
      console.log('カートが空です')
      return NextResponse.json({ error: "No items in cart" }, { status: 400 })
    }

    const lineItems = items.map((item: any) => {
      console.log('商品処理中:', item.product)
      
      // Stripe価格IDがある場合はそれを使用、そうでなければprice_dataを使用
      if (item.product.priceId && item.product.priceId.trim() !== '') {
        console.log('Stripe価格ID使用:', item.product.priceId)
        return {
          price: item.product.priceId,
          quantity: item.quantity,
        }
      } else {
        console.log('price_data使用:', item.product.name, item.product.price)
        // priceIdがない場合、price_dataを使用
        return {
          price_data: {
            currency: 'jpy',
            product_data: {
              name: item.product.name,
              description: item.product.description,
              images: item.product.image ? [item.product.image] : [],
            },
            unit_amount: Math.round(item.product.price),
          },
          quantity: item.quantity,
        }
      }
    })

    console.log('Stripe LineItems:', lineItems)

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${request.headers.get('origin')}/checkout/success`,
      cancel_url: `${request.headers.get('origin')}/cart`,
      metadata: {
        cartItems: JSON.stringify(items),
      },
    })

    console.log('Stripe セッション作成成功:', session.id)

    return NextResponse.json({
      success: true,
      sessionId: session.id,
      url: session.url,
    })
  } catch (error) {
    console.error("決済処理エラー:", error)
    return NextResponse.json(
      { error: "Payment processing failed", details: error instanceof Error ? error.message : 'Unknown error' }, 
      { status: 500 }
    )
  }
}
