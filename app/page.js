"use client";

import { useSearchParams, redirect } from "next/navigation";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef, Suspense } from "react";
import Link from "next/link";
import "./globals.css";

// Fetch products function
const fetchProducts = async ({ pageParam = 1, queryKey }) => {
  const [, searchParams] = queryKey; // Extract search params from queryKey
  const response = await fetch(
    `/api/products?page=${pageParam}&search=${encodeURIComponent(searchParams)}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
};

function ProductGrid() {

  // Uncomment this block to enable redirect to `/landing`
  redirect("/landing");

  const searchParams = useSearchParams(); // Get the search parameters from the URL
  const searchQuery = searchParams.get("search") || ""; // Default to an empty string if no search query

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["products", searchQuery], // Include search query in the queryKey
    queryFn: fetchProducts,
    getNextPageParam: (lastPage) => lastPage.nextPage || undefined,
    initialPageParam: 1,
  });

  const observerRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) observer.observe(observerRef.current);

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const products = data?.pages?.flatMap((page) => page.products) || [];

  return (
    <div className="flex flex-col bg-gray-100 min-h-screen p-4 justify-start">
      {isLoading ? (
        <div className="text-center text-lg text-gray-600 mt-4">
          Loading products...
        </div>
      ) : products.length === 0 ? (
        <div className="text-center text-lg text-gray-600 mt-4">
          No products found matching the search criteria.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 w-full max-w-screen-xl">
          {products.map((product) => (
            <Link href={`/product/${product._id}`} key={product._id}>
              <div className="w-full p-0 rounded-lg shadow-md bg-white overflow-hidden cursor-pointer">
                <div className="relative">
                  <img
                    src={`${process.env.NEXT_PUBLIC_VERCEL_URL}/products/${product.image}`}
                    alt={product.title}
                    className="w-full rounded-t-lg"
                  />
                </div>
                <div className="p-2">
                  <div className="font-bold text-lg">{product.title}</div>
                  <div className="flex items-center justify-between text-gray-700 bg-white p-2 rounded-lg shadow-sm">
                    <div className="flex items-center">
                      <img
                        src="/amazon-logo.png"
                        alt="Amazon Logo"
                        className="h-5 mr-2 mt-2"
                      />
                      <div>
                        <div className="font-medium">Price</div>
                      </div>
                    </div>
                    <div className="line-through font-bold text-gray-600">
                      ${product.originalPrice || "N/A"}
                    </div>
                  </div>
                  <div className="flex items-start justify-between text-gray-700 bg-white p-2 mt-2 rounded-lg shadow-sm">
                    <div className="font-medium">Unboxed Price</div>
                    <div className="font-bold">${product.price || "N/A"}</div>
                  </div>

                  <div className="text-xs flex flex-row items-center justify-between">
                    <div>Available until</div>
                    <div className="pt-2 pb-2 flex justify-center">
                      <button
                        disabled
                        className={`px-2 py-1 text-white text-xs font-medium rounded-lg ${
                          new Date(product.timeAvailable) - new Date() <
                          24 * 60 * 60 * 1000
                            ? "bg-red-500"
                            : "bg-green-500"
                        }`}
                      >
                        {new Date(product.timeAvailable).toLocaleDateString(
                          "en-US",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      <div ref={observerRef}></div>
      {isFetchingNextPage && (
        <p className="text-center mt-4">Loading more...</p>
      )}
    </div>
  );
}

export default function Home() {  
  return (
    <Suspense fallback={<div>Loading search parameters...</div>}>
      <ProductGrid />
    </Suspense>
  );
}
