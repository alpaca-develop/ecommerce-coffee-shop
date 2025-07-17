import { Product } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import Link from 'next/link';

interface ProductsProps {
  products: Product[];
  loading: boolean;
  error: string | null;
  onAddToCart: (product: Product) => void;
}

export const ProductsPresentation = ({ products, loading, error, onAddToCart }: ProductsProps) => {
  // HTMLタグを削除する関数
  const stripHtml = (html: string) => {
    return html.replace(/<[^>]*>/g, '').trim()
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-48 w-full" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-3 w-full mb-4" />
              <Skeleton className="h-8 w-20" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">商品が見つかりません</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
          <CardHeader className="p-0">
            <div className="relative h-48 w-full">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain p-2"
              />
              {product.featured && (
                <Badge className="absolute top-2 left-2" variant="secondary">
                  注目商品
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <CardTitle className="text-lg mb-2">
              <Link href={`/products/${product.id}`} className="hover:text-primary">
                {product.name}
              </Link>
            </CardTitle>
            <CardDescription className="text-sm mb-3 line-clamp-2">
              {stripHtml(product.description)}
            </CardDescription>
            <div className="flex items-center justify-between mb-3">
              <span className="text-lg font-bold">¥{product.price.toLocaleString()}</span>
              <Badge variant="outline">{product.category}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">
                {product.stock > 0 ? `在庫: ${product.stock}個` : '在庫切れ'}
              </span>
              <Button
                onClick={() => onAddToCart(product)}
                disabled={product.stock === 0}
                size="sm"
              >
                カートに追加
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};