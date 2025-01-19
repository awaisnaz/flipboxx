"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSession, signIn } from "next-auth/react"; // Import signIn for Google authentication
import "../globals.css";

// Fetch products function
const fetchProducts = async ({ pageParam = 1, queryKey }) => {
  const [, searchParams, retailerId] = queryKey; // Extract search params and retailerId from queryKey
  const response = await fetch(
    `/api/products?page=${pageParam}&search=${encodeURIComponent(searchParams)}&retailerId=${retailerId || ""}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
};

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter(); // Use the router for redirection
  const searchParams = useSearchParams();
  const [retailerId, setRetailerId] = useState(""); // State to store retailerId

  // Redirect to /dashboard upon successful login
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  // Fetch and set retailerId
  useEffect(() => {
    if (session) {
      const fetchId = async () => {
        try {
          let response = await fetch(
            `/api/retailers/getRetailerIdByEmail?email=${encodeURIComponent(
              session.user.email
            )}`
          );
          const data = await response.json();
          setRetailerId(data.retailer); // Set the fetched retailerId
        } catch (error) {
          console.error("Error fetching retailer ID:", error);
        }
      };
      fetchId();
    }
  }, [session]);

  // Products infinite scrolling
  const searchQuery = searchParams.get("search") || "";

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["products", searchQuery, retailerId], // Include retailerId in the queryKey
    queryFn: fetchProducts,
    getNextPageParam: (lastPage) => lastPage.nextPage || undefined,
    initialPageParam: 1,
    enabled: !!retailerId, // Ensure the query runs only after retailerId is set
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

  // Handle not logged-in state
  if (status === "unauthenticated") {
    return (
      <div className="flex flex-col bg-gray-100 min-h-screen p-4 justify-center items-center">
        <div className="text-center text-lg text-gray-600 mt-4">
          Please login to check your dashboard.
        </div>
        <button
          onClick={() => signIn("google")} // Use signIn to initiate Google login
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg"
        >
          Sign in with Google
        </button>
      </div>
    );
  }

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
