import { Cart, CartItem } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Trash2, Plus, Minus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface CartProps {
  cart: Cart;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onCheckout: () => void;
}

export const CartPresentation = ({
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onCheckout,
}: CartProps) => {
  if (cart.items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card>
          <CardContent className="text-center py-12">
            <h2 className="text-2xl font-semibold mb-4">カートが空です</h2>
            <p className="text-gray-500 mb-6">商品を追加してください！</p>
            <Button asChild>
              <Link href="/products">ショッピングを続ける</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>ショッピングカート ({cart.items.length}点)</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onClearCart}
                  className="text-red-500 hover:text-red-700"
                >
                  カートを空にする
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cart.items.map((item) => (
                  <CartItemComponent
                    key={item.product.id}
                    item={item}
                    onUpdateQuantity={onUpdateQuantity}
                    onRemoveItem={onRemoveItem}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>注文概要</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>小計:</span>
                  <span>¥{cart.total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>送料:</span>
                  <span>無料</span>
                </div>
                <div className="flex justify-between">
                  <span>税金:</span>
                  <span>¥{Math.floor(cart.total * 0.1).toLocaleString()}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-lg">
                  <span>合計:</span>
                  <span>¥{Math.floor(cart.total * 1.1).toLocaleString()}</span>
                </div>
              </div>
              
              <Button
                onClick={onCheckout}
                className="w-full"
                size="lg"
              >
                決済に進む
              </Button>
              
              <Button
                asChild
                variant="outline"
                className="w-full"
              >
                <Link href="/products">ショッピングを続ける</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

interface CartItemProps {
  item: CartItem;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
}

const CartItemComponent = ({ item, onUpdateQuantity, onRemoveItem }: CartItemProps) => {
  const handleQuantityChange = (change: number) => {
    const newQuantity = item.quantity + change;
    if (newQuantity > 0) {
      onUpdateQuantity(item.product.id, newQuantity);
    }
  };

  return (
    <div className="flex items-center gap-4 p-4 border rounded-lg">
      <div className="relative w-16 h-16 flex-shrink-0 bg-gray-50 rounded">
        <Image
          src={item.product.image}
          alt={item.product.name}
          fill
          className="object-contain p-1 rounded"
        />
      </div>
      
      <div className="flex-grow">
        <Link
          href={`/products/${item.product.id}`}
          className="font-medium hover:text-primary"
        >
          {item.product.name}
        </Link>
        <p className="text-sm text-gray-500">{item.product.category}</p>
        <p className="font-semibold">¥{item.product.price.toLocaleString()}</p>
      </div>
      
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => handleQuantityChange(-1)}
          disabled={item.quantity <= 1}
        >
          <Minus className="h-4 w-4" />
        </Button>
        
        <Input
          type="number"
          value={item.quantity}
          onChange={(e) => {
            const value = parseInt(e.target.value, 10);
            if (!isNaN(value) && value > 0) {
              onUpdateQuantity(item.product.id, value);
            }
          }}
          className="w-16 text-center"
          min="1"
        />
        
        <Button
          variant="outline"
          size="icon"
          onClick={() => handleQuantityChange(1)}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="text-right">
        <p className="font-semibold">
          ¥{(item.product.price * item.quantity).toLocaleString()}
        </p>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onRemoveItem(item.product.id)}
          className="text-red-500 hover:text-red-700"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};