'use client';

import { useProducts } from './Products.use';
import { ProductsPresentation } from './Products.presentational';
import { useCartStore } from '@/lib/store';
import { Product, ProductFilters } from '@/types';
import { toast } from 'sonner';

interface ProductsContainerProps {
  filters?: ProductFilters;
}

export const ProductsContainer = ({ filters }: ProductsContainerProps) => {
  const { products, loading, error } = useProducts(filters);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (product: Product) => {
    addItem(product, 1);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <ProductsPresentation
      products={products}
      loading={loading}
      error={error}
      onAddToCart={handleAddToCart}
    />
  );
};