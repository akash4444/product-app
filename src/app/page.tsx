"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import ProductCard from "@/components/products/ProductCard";
import Loading from "./loading";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import useAppStore from "@/store/appStore";
import useCartStore from "@/store/cartStore";
import { CartItem } from "@/types/productTypes";

export default function ProductPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { pageSize, productPageNumber, setProductPageNumber, searchProduct } =
    useAppStore();

  const { addToCart } = useCartStore();

  useEffect(() => {
    const pageFromUrl = parseInt(searchParams.get("page") || "1", 10) - 1;
    if (!isNaN(pageFromUrl) && pageFromUrl !== productPageNumber) {
      setProductPageNumber(pageFromUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // Fetch Products
  const fetchProducts = async () => {
    const skip = productPageNumber * pageSize;
    let url = `https://dummyjson.com/products?limit=${pageSize}&skip=${skip}`;
    if (searchProduct && searchProduct.trim() !== "") {
      url = `https://dummyjson.com/products/search?q=${encodeURIComponent(
        searchProduct
      )}&limit=${pageSize}&skip=${skip}`;
    }
    const response = await fetch(url);
    return response.json();
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products", productPageNumber, searchProduct],
    queryFn: fetchProducts,
    placeholderData: (prev) => prev,
  });

  useEffect(() => {
    if (
      data &&
      (!data.products || data.products.length === 0) &&
      productPageNumber > 0
    ) {
      if (searchParams.get("page") !== "1") {
        setProductPageNumber(0);
        router.replace("?page=1");
      }
    }
  }, [data, productPageNumber, searchParams, setProductPageNumber, router]);

  const handlePageChange = (newPage: number) => {
    router.push(`?page=${newPage}`);
  };

  const handleAddToCart = (product: CartItem) => {
    addToCart(product);
  };

  if (isLoading) return <Loading />;

  if (isError)
    return <p className="text-red-500 text-center mt-10">{error.message}</p>;

  // Check if no products are returned
  if (data?.products?.length === 0) {
    return (
      <div className=" flex flex-col  justify-center bg-gray-50 p-6">
        <div className="text-center">
          <svg
            className="mx-auto mb-4 h-16 w-16 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 7h18M3 12h18M3 17h18"
            ></path>
          </svg>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            No products found
          </h2>
          <p className="text-gray-500">
            We couldn`t find any products matching your search. Try adjusting
            your search.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full max-w-5xl">
        {data?.products?.map((p: CartItem) => (
          <ProductCard key={p.id} product={p} addToCart={handleAddToCart} />
        ))}
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (productPageNumber > 0) handlePageChange(productPageNumber);
              }}
              className={
                productPageNumber === 0 ? "opacity-50 pointer-events-none" : ""
              }
            />
          </PaginationItem>

          <PaginationItem>
            <PaginationLink
              className="cursor-pointer"
              onClick={() => handlePageChange(productPageNumber + 1)}
            >
              {productPageNumber + 1}
            </PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if ((productPageNumber + 1) * pageSize < data.total) {
                  handlePageChange(productPageNumber + 2);
                }
              }}
              className={
                (productPageNumber + 1) * pageSize >= data.total
                  ? "opacity-50 pointer-events-none"
                  : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
