import { NextRequest, NextResponse } from "next/server"
import { fetchProductById } from "@/lib/microcms"

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const product = await fetchProductById(id)

    if (!product) {
      return NextResponse.json({ error: "商品が見つかりません" }, { status: 404 })
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error("microCMS商品詳細取得エラー:", error)
    return NextResponse.json({ error: "商品の取得に失敗しました" }, { status: 500 })
  }
}