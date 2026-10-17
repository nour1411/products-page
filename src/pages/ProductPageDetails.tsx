import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProduct } from "@/api/products.api";
import { Button } from "@/components/ui/button";

export default function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();

  const { data: product, isPending, isError } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id!),
    enabled: !!id,
  });

  return (
    <div className="mx-auto max-w-4xl p-6">
      <Button asChild variant="outline" className="mb-6">
        <Link to="/products">← Back to products</Link>
      </Button>

      {isPending && <p>Loading...</p>}
      {isError && <p className="text-red-600">Failed to load this product.</p>}

      {product && (
        <div className="grid gap-8 md:grid-cols-2">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full rounded-xl bg-gray-100"
          />
          <div className="space-y-3">
            <h1 className="text-3xl font-bold">{product.title}</h1>
            <p className="text-gray-500">
              {product.brand ? `${product.brand} · ` : ""}
              {product.category}
            </p>
            <p className="text-2xl font-semibold">${product.price}</p>
            <p>⭐ {product.rating}</p>
            <p>In stock: {product.stock}</p>
            <p className="text-gray-700">{product.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}