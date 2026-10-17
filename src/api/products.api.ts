import type { Product, ProductsResponse } from "../types/product.types";

const BASE_URL = "https://dummyjson.com";
export const LIMIT = 10;

interface GetProductsParams {
  search: string;
  page: number;
}

export async function getProducts({
  search,
  page,
}: GetProductsParams): Promise<ProductsResponse> {
  const skip = (page - 1) * LIMIT;

  const url = search
    ? `${BASE_URL}/products/search?q=${encodeURIComponent(search)}&limit=${LIMIT}&skip=${skip}`
    : `${BASE_URL}/products?limit=${LIMIT}&skip=${skip}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function getProduct(id: string): Promise<Product> {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}