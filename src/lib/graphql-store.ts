import {
  GRAPHQL_CACHE_MODE,
  GRAPHQL_REVALIDATE_SECONDS,
} from "@/lib/store-config";

const GRAPHQL_ENDPOINT =
  "https://graphqlstore.julienfroidefond.com/api/2024-01/graphql.json";

const PRODUCTS_QUERY = `
  query GetProducts($first: Int!) {
    products(first: $first) {
      nodes {
        id
        title
        handle
        description
        featuredImage {
          url
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
      }
    }
  }
`;

const PRODUCT_BY_HANDLE_QUERY = `
  query GetProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      handle
      description
      featuredImage {
        url
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
    }
  }
`;

export type SponsoredProduct = {
  id: string;
  title: string;
  handle: string;
  description: string;
  imageUrl: string | null;
  price: number;
  currency: string;
};

type GraphQLProductNode = {
  id: string;
  title: string;
  handle: string;
  description: string;
  featuredImage?: { url: string } | null;
  priceRange?: {
    minVariantPrice?: { amount: string; currencyCode: string };
  };
};

type GraphQLProductsResponse = {
  data?: {
    products?: {
      nodes?: GraphQLProductNode[];
    };
  };
};

type GraphQLProductResponse = {
  data?: {
    productByHandle?: GraphQLProductNode | null;
  };
};

function mapNode(node: GraphQLProductNode): SponsoredProduct {
  return {
    id: node.id,
    title: node.title,
    handle: node.handle,
    description: node.description,
    imageUrl: node.featuredImage?.url ?? null,
    price: Number(node.priceRange?.minVariantPrice?.amount ?? 0),
    currency: node.priceRange?.minVariantPrice?.currencyCode ?? "EUR",
  };
}

function getFetchOptions(): RequestInit & {
  next?: { revalidate?: number; tags?: string[] };
} {
  const tags = ["sponsored-products"];

  if (GRAPHQL_CACHE_MODE === "no-store") {
    return { cache: "no-store" };
  }

  if (GRAPHQL_CACHE_MODE === "force-cache") {
    return { cache: "force-cache", next: { tags } };
  }

  return {
    next: { revalidate: GRAPHQL_REVALIDATE_SECONDS, tags },
  };
}

async function graphqlFetch<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  const start = performance.now();

  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
    ...getFetchOptions(),
  });

  if (process.env.NODE_ENV === "development") {
    console.log(
      `[mockShop] fetch products ${(performance.now() - start).toFixed(0)}ms`,
    );
  }

  if (!response.ok) {
    throw new Error(`GraphQL error: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function fetchSponsoredProducts(
  first = 6,
): Promise<SponsoredProduct[]> {
  const json = await graphqlFetch<GraphQLProductsResponse>(PRODUCTS_QUERY, {
    first,
  });

  return (json.data?.products?.nodes ?? []).map(mapNode);
}

export async function fetchSponsoredProductByHandle(
  handle: string,
): Promise<SponsoredProduct | null> {
  const json = await graphqlFetch<GraphQLProductResponse>(
    PRODUCT_BY_HANDLE_QUERY,
    { handle },
  );

  const node = json.data?.productByHandle;
  return node ? mapNode(node) : null;
}

export function getSponsoredProductPath(handle: string): string {
  return `/sponsorises/${handle}`;
}
