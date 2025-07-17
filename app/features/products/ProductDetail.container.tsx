'use client';

import { useProduct } from './Products.use';
import { ProductDetailPresentation } from './ProductDetail.presentational';
import { useCartStore } from '@/lib/store';
import { Product } from '@/types';
import { toast } from 'sonner';

interface ProductDetailContainerProps {
  productId: string;
}

export const ProductDetailContainer = ({ productId }: ProductDetailContainerProps) => {
  const { product, loading, error } = useProduct(productId);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (product: Product, quantity: number) => {
    addItem(product, quantity);
    toast.success(`${quantity} x ${product.name} added to cart`);
  };

  return (
    <ProductDetailPresentation
      product={product}
      loading={loading}
      error={error}
      onAddToCart={handleAddToCart}
    />
  );
};