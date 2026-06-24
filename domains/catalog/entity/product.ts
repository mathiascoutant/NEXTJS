export type ProductImages = {
  main: string;
  gallery: string[];
};

export type ProductSpecs = Record<string, string | number | boolean>;

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  currency: string;
  stock: number;
  sku: string;
  category: string;
  brand: string;
  images: ProductImages;
  specs: ProductSpecs;
};

export function formatPrice(price: number, currency = "EUR"): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency,
  }).format(price);
}

export function isInStock(product: Product): boolean {
  return product.stock > 0;
}

export function getProductPath(slug: string): string {
  return `/produit/${slug}`;
}

export type CartItem = {
  productId: string;
  slug: string;
  name: string;
  price: number;
  currency: string;
  image: string;
  quantity: number;
};

export function getTotalArticles(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.quantity, 0);
}

export function getTotalPrice(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}

export function addItemToCart(
  items: CartItem[],
  product: Product,
  quantity = 1,
): CartItem[] {
  const existing = items.find((item) => item.productId === product.id);

  if (existing) {
    return items.map((item) =>
      item.productId === product.id
        ? { ...item, quantity: item.quantity + quantity }
        : item,
    );
  }

  return [
    ...items,
    {
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      currency: product.currency,
      image: product.images.main,
      quantity,
    },
  ];
}
