# ECサイト仕様書

## 概要

プロ仕様のコーヒー器具を販売するECサイトです。Next.js、TypeScript、Stripe、microCMS、Firebase Authenticationを使用して構築されています。

## 技術スタック

### フロントエンド
- **Next.js 15.2.4** - React フレームワーク
- **TypeScript** - 型安全性の確保
- **Tailwind CSS** - スタイリング
- **Radix UI** - UIコンポーネント
- **Zustand** - 状態管理

### バックエンド・サービス
- **Stripe** - 決済処理
- **microCMS** - コンテンツ管理・商品データ
- **Firebase Authentication** - ユーザー認証

### 開発ツール
- **pnpm** - パッケージマネージャー
- **ESLint** - コード品質チェック

## 機能仕様

### 1. 商品管理
- 商品一覧表示
- 商品詳細表示
- 商品検索・フィルタリング
- カテゴリ別商品表示
- 注目商品表示

### 2. ユーザー管理
- ユーザー登録・ログイン（Firebase Auth）
- パスワードリセット
- ユーザープロファイル管理

### 3. ショッピングカート
- 商品の追加・削除・数量変更
- カート状態の永続化
- 合計金額計算

### 4. 決済処理
- Stripe Checkout統合
- 複数の決済方法対応
- 決済成功・失敗の処理

### 5. ページ構成
- `/` - トップページ
- `/products` - 商品一覧
- `/products/[id]` - 商品詳細
- `/cart` - ショッピングカート
- `/checkout/success` - 決済成功
- `/auth/login` - ログイン
- `/auth/register` - ユーザー登録
- `/brand` - ブランド情報
- `/support` - サポート

## microCMS 設定・使用方法

### 1. microCMS セットアップ

#### 1.1 アカウント作成
1. [microCMS](https://microcms.io/) にアクセス
2. アカウントを作成
3. 新しいサービスを作成

#### 1.2 API設定
```bash
# 環境変数設定
MICROCMS_SERVICE_DOMAIN=your-service-domain
MICROCMS_API_KEY=your-api-key
```

#### 1.3 コンテンツスキーマ
エンドポイント: `ecommerce-app`

```json
{
  "name": "テキストフィールド",
  "description": "テキストエリア",
  "price": "数値フィールド",
  "image": "画像フィールド",
  "price_id": "テキストフィールド（Stripe価格ID）",
  "count": "数値フィールド（在庫数）"
}
```

### 2. microCMS データ操作

#### 2.1 商品データ取得
```typescript
// 全商品取得
const products = await fetchProducts();

// 特定商品取得
const product = await fetchProductById(productId);

// 注目商品取得
const featuredProducts = await fetchFeaturedProducts();

// カテゴリ別商品取得
const categoryProducts = await fetchProductsByCategory(category);
```

#### 2.2 商品データ構造
```typescript
interface MicroCMSProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  image: {
    url: string;
    height: number;
    width: number;
  };
  price_id: string;
  count?: number;
}
```

#### 2.3 実装のポイント
- `lib/microcms.ts` でクライアント初期化
- エラーハンドリングの実装
- 型安全性の確保
- 商品データの正規化

## Stripe 設定・使用方法

### 1. Stripe セットアップ

#### 1.1 アカウント作成
1. [Stripe](https://stripe.com/) にアクセス
2. アカウントを作成
3. API キーを取得

#### 1.2 環境変数設定
```bash
# Stripe設定
STRIPE_SECRET_KEY=sk_test_your_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key
```

#### 1.3 商品・価格設定
Stripe ダッシュボードで商品と価格を設定し、価格IDをmicroCMSの`price_id`フィールドに登録

### 2. Stripe 決済フロー

#### 2.1 決済セッション作成
```typescript
// app/api/checkout/route.ts
const session = await stripe.checkout.sessions.create({
  payment_method_types: ['card'],
  line_items: lineItems,
  mode: 'payment',
  success_url: `${request.headers.get('origin')}/checkout/success`,
  cancel_url: `${request.headers.get('origin')}/cart`,
});
```

#### 2.2 決済処理の流れ
1. ユーザーがカートから決済ボタンをクリック
2. `/api/checkout` エンドポイントへPOSTリクエスト
3. Stripe セッション作成
4. Stripe Checkout ページへリダイレクト
5. 決済完了後、成功ページへリダイレクト

#### 2.3 商品データ処理
```typescript
// 価格IDがある場合
if (item.product.priceId && item.product.priceId.trim() !== '') {
  return {
    price: item.product.priceId,
    quantity: item.quantity,
  };
}
// 価格IDがない場合、price_dataを使用
else {
  return {
    price_data: {
      currency: 'jpy',
      product_data: {
        name: item.product.name,
        description: item.product.description,
        images: [item.product.image],
      },
      unit_amount: Math.round(item.product.price),
    },
    quantity: item.quantity,
  };
}
```

### 3. Stripe 設定のベストプラクティス

#### 3.1 セキュリティ
- シークレットキーは絶対にクライアントサイドで使用しない
- 環境変数で機密情報を管理
- HTTPS通信の使用

#### 3.2 エラーハンドリング
- 決済失敗時の適切なエラーメッセージ
- ログ出力でデバッグ支援
- ユーザーフレンドリーなエラー表示

#### 3.3 テスト
- テストモードでの動作確認
- 異なるカードタイプでのテスト
- 決済失敗ケースのテスト

## 開発環境構築

### 1. 環境設定
```bash
# リポジトリクローン
git clone [repository-url]
cd ecommerce-app

# 依存関係インストール
pnpm install

# 環境変数設定
cp .env.example .env.local
```

### 2. 環境変数
```bash
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id

# microCMS
MICROCMS_SERVICE_DOMAIN=your_service_domain
MICROCMS_API_KEY=your_api_key

# Stripe
STRIPE_SECRET_KEY=sk_test_your_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key
```

### 3. 開発サーバー起動
```bash
# 開発サーバー
pnpm dev

# ビルド
pnpm build

# 本番サーバー
pnpm start

# Lint
pnpm lint
```

## プロジェクト構造

```
ecommerce-app/
├── app/                    # Next.js App Router
│   ├── api/               # API ルート
│   │   ├── checkout/      # Stripe決済API
│   │   └── products/      # 商品API
│   ├── auth/              # 認証ページ
│   ├── components/        # 共通コンポーネント
│   ├── features/          # 機能別コンポーネント
│   │   ├── cart/         # カート機能
│   │   └── products/     # 商品機能
│   └── products/         # 商品ページ
├── components/            # UI コンポーネント
├── lib/                   # ライブラリ・設定
│   ├── firebase/         # Firebase設定
│   ├── stripe/           # Stripe設定
│   ├── store/            # 状態管理
│   └── microcms.ts       # microCMS設定
├── types/                 # 型定義
└── public/               # 静的ファイル
```

## 状態管理

### Zustand ストア
- `authStore.ts` - ユーザー認証状態
- `cartStore.ts` - ショッピングカート状態

### カート状態管理
```typescript
interface CartState {
  items: CartItem[];
  addItem: (product: Product, quantity: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}
```

## デプロイ

### Vercel デプロイ
1. Vercelアカウント作成
2. GitHubリポジトリ連携
3. 環境変数設定
4. 自動デプロイ設定

### 環境変数チェックリスト
- [ ] Firebase設定
- [ ] microCMS設定
- [ ] Stripe設定
- [ ] 本番環境URLの更新

## 今後の拡張予定

### 機能追加
- 商品レビュー機能
- お気に入り機能
- 注文履歴
- 在庫管理
- 管理者画面

### パフォーマンス最適化
- 画像最適化
- キャッシュ戦略
- SEO対策
- アクセシビリティ向上

## サポート

技術的な質問や問題が発生した場合は、以下の手順で対応してください：

1. 開発者ツールでエラーログを確認
2. 環境変数の設定を確認
3. Stripe・microCMSの設定を確認
4. プロジェクト担当者に連絡

---

**最終更新日**: 2025年1月
**バージョン**: 1.0.0