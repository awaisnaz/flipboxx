"use client";

import { useSearchParams } from "next/navigation";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react"; // Import useSession from next-auth/react
import "../globals.css";


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

// // Fetch retailer ID function
// const fetchRetailerId = async (email) => {
//     let response = await fetch(`/api/getRetailerIdByEmail?email=${encodeURIComponent(email)}`);
    
//     if (!response.ok) {
//         throw new Error("Failed to fetch retailer ID");
//       }
//     response = await response.json();
//     response = response.retailer;
  
//     return response; // Assuming the response contains the retailer object with an _id field
//   };
  

export default function Home() {
  const { data: session, status } = useSession(); // Use session hook from next-auth
  const searchParams = useSearchParams(); // Get the search parameters from the URL

  // Log the email of the authenticated user
  useEffect(() => {
    if (session) {
      const fetchId = async () => {
        try {
        //   const retailerId = await fetchRetailerId(session.user.email);

          let response = await fetch(`/api/retailers/getRetailerIdByEmail?email=${encodeURIComponent(session.user.email)}`);
          response = await response.json();
          response = response.retailer;
          console.log("response: ", response);
        } catch (error) {
          console.error("Error fetching retailer ID:", error);
        }
      };
      fetchId();
    }
  }, [session]); // This effect will run whenever the session data changes

  // products infinite scrolling
  const searchQuery = searchParams.get("search") || ""; // Default to an empty string if no search query

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading, // Added isLoading here
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
          {data?.pages.map((page) =>
            page.products.map((product) => (
              <Link href={`/dashboard/product/${product._id}`} key={product._id}>
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
                    <div className="text-xs flex items-center justify-between pt-2 pb-2">
                      <div className="flex items-center text-base">Status:</div>
                      <div className="flex items-center">
                        {new Date() > new Date(product.timeAvailable) ? (
                          <span className="px-2 py-1 text-sm font-semibold text-white bg-red-500 rounded-md flex items-center">
                            EXPIRED
                          </span>
                        ) : product.soldFlag ? (
                          <span className="px-2 py-1 text-sm font-semibold text-white bg-gray-500 rounded-md flex items-center">
                            SOLD
                          </span>
                        ) : (
                          <span className="px-2 py-1 text-sm font-semibold text-white bg-green-500 rounded-md flex items-center">
                            AVAILABLE
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      )}

      <div ref={observerRef} className="mt-6 h-10"></div>
      {isFetchingNextPage && <p className="text-center mt-4">Loading more...</p>}
    </div>
  );
}
