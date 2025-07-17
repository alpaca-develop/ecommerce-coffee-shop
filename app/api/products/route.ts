import { NextResponse } from "next/server"
import { fetchProducts } from "@/lib/microcms"

export async function GET() {
  try {
    const products = await fetchProducts()
    return NextResponse.json(products)
  } catch (error) {
    console.error("microCMS商品取得エラー:", error)
    return NextResponse.json({ error: "商品の取得に失敗しました" }, { status: 500 })
  }
}
