export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  priceId?: string; // Stripe価格ID
  image: string;
  images?: string[];
  category: string;
  stock: number;
  featured?: boolean;
  specifications?: string;
  features?: Array<{
    title: string;
    description: string;
  }>;
  brand?: string;
  model?: string;
  weight?: number;
  dimensions?: string;
  warranty_period?: number;
  tags?: string[];
}

export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}