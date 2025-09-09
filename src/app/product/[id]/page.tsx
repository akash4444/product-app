"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Pdp from "@/components/products/Pdp";

export default function ProductPage() {
  const params = useParams();
  const { id } = params;
  const router = useRouter();

  // Fetch product function
  async function fetchProduct(id) {
    const res = await fetch(`https://dummyjson.com/products/${id}`);
    if (!res.ok) {
      throw new Error("Failed to fetch product");
    }
    return res.json();
  }

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id),
    enabled: !!id,
  });

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-500 text-lg">Loading...</div>
      </div>
    );

  if (isError)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <p className="text-red-500 text-lg mb-4">Something went wrong</p>
        <Button onClick={() => router.push("/")} className="mt-2">
          Continue Shopping
        </Button>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <div className="w-full max-w-3xl">
        <Pdp product={product} />
        <div className="flex justify-center mt-6">
          <Button onClick={() => router.push("/")}>Continue Shopping</Button>
        </div>
      </div>
    </div>
  );
}
