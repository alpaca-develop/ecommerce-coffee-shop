import { createClient } from 'microcms-js-sdk'

export const microCMSClient = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN!,
  apiKey: process.env.MICROCMS_API_KEY!,
})

export interface MicroCMSProduct {
  id: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  revisedAt: string
  name: string
  description: string
  price: number
  image: {
    url: string
    height: number
    width: number
  }
  price_id: string
  count?: number
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  priceId: string
  category: string
  stock: number
  featured?: boolean
}

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await microCMSClient.get({
      endpoint: 'ecommerce-app',
      queries: {
        limit: 100,
      },
    })

    return response.contents.map((product: MicroCMSProduct) => {
      console.log('microCMS商品データ:', product)
      console.log('price_id:', product.price_id)
      
      return {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        image: product.image.url,
        priceId: product.price_id,
        category: 'coffee',
        stock: product.count || 0,
        featured: false,
      }
    })
  } catch (error) {
    console.error('Failed to fetch products from microCMS:', error)
    return []
  }
}

export const fetchProductById = async (id: string): Promise<Product | null> => {
  try {
    const product: MicroCMSProduct = await microCMSClient.get({
      endpoint: 'ecommerce-app',
      contentId: id,
    })

    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image.url,
      priceId: product.price_id,
      category: 'coffee',
      stock: product.count || 0,
      featured: false,
    }
  } catch (error) {
    console.error(`Failed to fetch product ${id} from microCMS:`, error)
    return null
  }
}

export const fetchFeaturedProducts = async (): Promise<Product[]> => {
  try {
    const response = await microCMSClient.get({
      endpoint: 'ecommerce-app',
      queries: {
        limit: 3,
      },
    })

    return response.contents.map((product: MicroCMSProduct) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image.url,
      priceId: product.price_id,
      category: 'coffee',
      stock: product.count || 0,
      featured: true,
    }))
  } catch (error) {
    console.error('Failed to fetch featured products from microCMS:', error)
    return []
  }
}

export const fetchProductsByCategory = async (category: string): Promise<Product[]> => {
  try {
    const response = await microCMSClient.get({
      endpoint: 'ecommerce-app',
      queries: {
        limit: 100,
      },
    })

    return response.contents.map((product: MicroCMSProduct) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image.url,
      priceId: product.price_id,
      category: 'coffee',
      stock: product.count || 0,
      featured: false,
    }))
  } catch (error) {
    console.error(`Failed to fetch products by category ${category} from microCMS:`, error)
    return []
  }
}