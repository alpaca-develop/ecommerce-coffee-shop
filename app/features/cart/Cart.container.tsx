'use client';

import { useCart } from './Cart.use';
import { CartPresentation } from './Cart.presentational';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export const CartContainer = () => {
  const { cart, updateQuantity, removeItem, clearCart } = useCart();
  const router = useRouter();

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    updateQuantity(productId, quantity);
  };

  const handleRemoveItem = (productId: string) => {
    removeItem(productId);
    toast.success('Item removed from cart');
  };

  const handleClearCart = () => {
    clearCart();
    toast.success('Cart cleared');
  };

  const handleCheckout = async () => {
    try {
      console.log('カートアイテム:', cart.items);
      
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cart.items,
        }),
      });

      const data = await response.json();
      console.log('決済レスポンス:', data);
      
      if (data.success && data.url) {
        window.location.href = data.url;
      } else {
        console.error('決済失敗:', data);
        toast.error('決済の開始に失敗しました: ' + (data.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('決済エラー:', error);
      toast.error('決済の開始に失敗しました');
    }
  };

  return (
    <CartPresentation
      cart={cart}
      onUpdateQuantity={handleUpdateQuantity}
      onRemoveItem={handleRemoveItem}
      onClearCart={handleClearCart}
      onCheckout={handleCheckout}
    />
  );
};