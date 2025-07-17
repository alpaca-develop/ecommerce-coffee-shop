import { Product } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import { useState } from 'react';

interface ProductDetailProps {
  product: Product | null;
  loading: boolean;
  error: string | null;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const ProductDetailPresentation = ({ product, loading, error, onAddToCart }: ProductDetailProps) => {
  const [quantity, setQuantity] = useState(1);

  // HTMLタグを削除する関数
  const stripHtml = (html: string) => {
    return html.replace(/<[^>]*>/g, '').trim()
  }

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <Skeleton className="w-full h-96 rounded-lg" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-6xl mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold text-red-500 mb-4">
          {error || '商品が見つかりません'}
        </h1>
        <Button asChild>
          <a href="/products">商品一覧に戻る</a>
        </Button>
      </div>
    );
  }

  const handleQuantityChange = (value: string) => {
    const num = parseInt(value, 10);
    if (!isNaN(num) && num > 0 && num <= product.stock) {
      setQuantity(num);
    }
  };

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="relative h-96 w-full rounded-lg overflow-hidden bg-gray-50">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain p-4"
            />
            {product.featured && (
              <Badge className="absolute top-4 left-4" variant="secondary">
                注目商品
              </Badge>
            )}
          </div>
        </div>
        
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <Badge variant="outline" className="mb-4">
              {product.category}
            </Badge>
            <p className="text-3xl font-bold text-primary mb-4">
              ¥{product.price.toLocaleString()}
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">商品説明</h3>
            <p className="text-gray-600 leading-relaxed">{stripHtml(product.description)}</p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">
                在庫: {product.stock > 0 ? `${product.stock}個` : '在庫切れ'}
              </span>
            </div>
            
            {product.stock > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Label htmlFor="quantity">数量:</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    max={product.stock}
                    value={quantity}
                    onChange={(e) => handleQuantityChange(e.target.value)}
                    className="w-20"
                  />
                </div>
                
                <Button
                  onClick={handleAddToCart}
                  className="w-full"
                  size="lg"
                >
                  カートに追加 (¥{(product.price * quantity).toLocaleString()})
                </Button>
              </div>
            )}
            
            {product.stock === 0 && (
              <Button disabled className="w-full" size="lg">
                在庫切れ
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};