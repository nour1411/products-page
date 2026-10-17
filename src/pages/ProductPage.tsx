import { useState } from "react";
import { Link } from "react-router-dom";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Search, ShoppingCart } from "lucide-react";
import { getProducts, LIMIT } from "@/api/products.api";
import { useDebounce } from "@/hooks/useDebounce";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const NAV_ITEMS = ["SHOP", "COLLECTIONS", "CONTACT", "ABOUT"];

export default function ProductsPage() {
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);
  const search = useDebounce(searchInput, 500);

  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ["products", search, page],
    queryFn: () => getProducts({ search, page }),
    placeholderData: keepPreviousData,
  });

  const totalPages = data ? Math.ceil(data.total / LIMIT) : 0;

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="mx-auto max-w-6xl space-y-4">
    
        <header className="flex items-center gap-3">
          <div className="rounded-lg bg-white px-5 py-3 font-semibold">
            💎 crystal.
          </div>

          <nav className="hidden flex-1 gap-3 md:flex">
            {NAV_ITEMS.map((item) => (
              <span
                key={item}
                className="flex-1 rounded-lg bg-white py-3 text-center text-xs"
              >
                {item}
              </span>
            ))}
          </nav>

          <div className="flex flex-1 items-center rounded-lg bg-white px-4 py-3 md:max-w-[220px]">
            <input
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
                setPage(1);
              }}
              placeholder="SEARCH"
              className="w-full bg-transparent text-xs outline-none"
            />
            <Search size={16} />
          </div>

          <button className="hidden items-center gap-2 rounded-lg bg-green-800 px-5 py-3 text-xs text-white sm:flex">
            <ShoppingCart size={14} />
            VIEW CART
          </button>
        </header>

        
        <section className="rounded-lg bg-white p-8">
          <h1 className="text-5xl font-bold md:text-6xl">Explore Our Shop</h1>
          <p className="mt-6 max-w-md text-sm text-gray-700 md:ml-auto">
            From skincare to makeup, our platform features a wide range of
            products that cater to all your beauty needs. We strive to provide
            our customers with a luxury shopping experience.
          </p>
        </section>

        
        <section className="rounded-lg bg-white p-4">
          {isPending && (
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="h-72 animate-pulse rounded-md bg-gray-100"
                />
              ))}
            </div>
          )}

          {isError && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center">
              <p className="mb-3 text-red-700">
                Something went wrong while loading products.
              </p>
              <Button onClick={() => refetch()}>Try again</Button>
            </div>
          )}

          {data && data.products.length === 0 && (
            <p className="py-12 text-center text-gray-500">
              No products found for "{search}".
            </p>
          )}

          {data && data.products.length > 0 && (
            <>
              <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                {data.products.map((product) => (
                  <Link key={product.id} to={`/products/${product.id}`}>
                    <Card className="h-full items-center gap-2 rounded-md border-0 bg-gray-100 py-6 text-center shadow-none transition hover:shadow-md">
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="h-40 w-full object-contain mix-blend-multiply"
                      />
                      <CardContent className="flex flex-col gap-1">
                        <h3 className="line-clamp-1 text-sm font-semibold uppercase">
                          {product.title}
                        </h3>
                        <p className="text-xs uppercase text-gray-400">
                          {product.brand ?? product.category}
                        </p>
                        <p className="text-sm">${product.price}</p>
                        <p className="text-xs text-gray-500">
                          ⭐ {product.rating}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-center gap-4">
                <Button
                  variant="outline"
                  onClick={() => setPage((p) => p - 1)}
                  disabled={page === 1}
                >
                  Previous
                </Button>
                <span className="text-sm">
                  Page {page} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  onClick={() => setPage((p) => p + 1)}
                  disabled={page >= totalPages}
                >
                  Next
                </Button>
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
}