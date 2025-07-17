import { useState, useEffect } from 'react';
import { Product, ProductFilters } from '@/types';

export const useProducts = (filters?: ProductFilters) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        
        // microCMS APIから商品データを取得
        const response = await fetch('/api/products');
        
        if (!response.ok) {
          throw new Error('商品の取得に失敗しました');
        }
        
        let fetchedProducts: Product[] = await response.json();
        
        // フィルタリング処理
        if (filters) {
          if (filters.category) {
            fetchedProducts = fetchedProducts.filter(
              product => product.category === filters.category
            );
          }
          
          if (filters.search) {
            fetchedProducts = fetchedProducts.filter(
              product => 
                product.name.toLowerCase().includes(filters.search!.toLowerCase()) ||
                product.description.toLowerCase().includes(filters.search!.toLowerCase())
            );
          }
          
          if (filters.minPrice !== undefined) {
            fetchedProducts = fetchedProducts.filter(
              product => product.price >= filters.minPrice!
            );
          }
          
          if (filters.maxPrice !== undefined) {
            fetchedProducts = fetchedProducts.filter(
              product => product.price <= filters.maxPrice!
            );
          }
        }
        
        setProducts(fetchedProducts);
        setError(null);
      } catch (err) {
        setError('商品の取得に失敗しました');
        setProducts([]);
        console.error('商品取得エラー:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters]);

  return { products, loading, error };
};

export const useProduct = (id: string) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        
        // microCMS APIから特定の商品データを取得
        const response = await fetch(`/api/products/${id}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            setError('商品が見つかりません');
          } else {
            setError('商品の取得に失敗しました');
          }
          setProduct(null);
          return;
        }
        
        const fetchedProduct: Product = await response.json();
        setProduct(fetchedProduct);
        setError(null);
      } catch (err) {
        setError('商品の取得に失敗しました');
        setProduct(null);
        console.error('商品詳細取得エラー:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  return { product, loading, error };
};