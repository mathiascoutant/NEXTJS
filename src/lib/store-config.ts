export const USE_PARALLEL_ROUTES = false;

export type GraphQLCacheMode = "force-cache" | "no-store" | "revalidate";

export const GRAPHQL_CACHE_MODE: GraphQLCacheMode = "revalidate";

export const GRAPHQL_REVALIDATE_SECONDS = 60;
