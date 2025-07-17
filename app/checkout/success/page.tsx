'use client';

import { useEffect, useLayoutEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useCartStore } from '@/lib/store';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function CheckoutSuccess() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const clearCart = useCartStore((state) => state.clearCart);

  useLayoutEffect(() => {
    if (sessionId) {
      clearCart();
    }
  }, [sessionId, clearCart]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      <Header />
      <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl text-green-600">
            お支払い完了！
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-gray-600">
            ご購入ありがとうございます。お支払いが正常に処理されました。
          </p>
          {sessionId && (
            <p className="text-sm text-gray-500">
              Session ID: {sessionId}
            </p>
          )}
          <div className="space-y-2 pt-4">
            <Button asChild className="w-full">
              <Link href="/products">ショッピングを続ける</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/">ホームに戻る</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
      </div>
      <Footer />
    </div>
  );
}