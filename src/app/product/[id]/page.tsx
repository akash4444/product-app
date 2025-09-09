import { Button } from "@/components/ui/button";
import Pdp from "@/components/products/Pdp";
import Link from "next/link";
import { CartItem } from "@/types/productTypes";

async function fetchProduct(id: string): Promise<CartItem> {
  const res = await fetch(`https://dummyjson.com/products/${id}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  return res.json();
}

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  try {
    const product = await fetchProduct(id);

    return (
      <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
        <div className="w-full max-w-3xl">
          <Pdp product={product} />
          <div className="flex justify-center mt-6">
            <Link href="/">
              <Button className="mt-4 bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-90 text-white">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <p className="text-red-500 text-lg mb-4">Something went wrong</p>
        <Link href="/">
          <Button className="mt-4 bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-90 text-white">
            Continue Shopping
          </Button>
        </Link>
      </div>
    );
  }
}
