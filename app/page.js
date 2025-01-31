"use client";

import { useSearchParams } from "next/navigation";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef, Suspense, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import "./globals.css";

// Fetch products function
const fetchProducts = async ({ pageParam = 1, queryKey }) => {
  const [, searchParams] = queryKey;
  const response = await fetch(
    `/api/products?page=${pageParam}&search=${encodeURIComponent(searchParams)}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
};

function HeroSection() {
  return (
    <div className="relative bg-[url('/hero-background.avif')] bg-cover bg-center bg-no-repeat text-white py-20">
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between overflow-x-hidden">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Discover Amazing Deals
            </h1>
            <p className="text-lg mb-8 text-gray-100">
              Shop the latest products at unbeatable prices. New deals added daily!
            </p>
            <Link href="#featured-products" 
              className="bg-white text-orange-500 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition duration-300">
              Shop Now
            </Link>
          </div>
          <div className="md:w-1/2 relative">
            <div className="relative w-full h-64 md:h-96">
              <Image
                src="/flipboxx-logo.png"
                alt="Flipboxx Shopping"
                fill
                className="object-contain"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeaturedCategories() {
  const categories = [
    { name: "Electronics", icon: "🖥️" },
    { name: "Fashion", icon: "👕" },
    { name: "Home & Living", icon: "🏠" },
    { name: "Beauty", icon: "✨" },
  ];

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-bold text-center mb-8">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div
              key={category.name}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 cursor-pointer text-center"
            >
              <div className="text-4xl mb-3">{category.icon}</div>
              <h3 className="font-semibold text-gray-800">{category.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PromotionalBanner() {
  return (
    <div className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between overflow-x-hidden">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h3 className="text-2xl font-bold mb-2">Special Offer!</h3>
            <p className="text-gray-300">Get 20% off on your first purchase</p>
          </div>
          <Link href="/products" 
            className="bg-orange-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-600 transition duration-300">
            Claim Offer
          </Link>
        </div>
      </div>
    </div>
  );
}

function ProductGrid() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const [timeLeft, setTimeLeft] = useState({});

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["products", searchQuery],
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

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const products = data?.pages?.flatMap((page) => page.products) || [];
      
      products.forEach((product) => {
        const deadline = new Date(product.timeAvailable).getTime();
        if (deadline - now > 0) {
          const days = Math.floor((deadline - now) / (1000 * 60 * 60 * 24));
          const hours = Math.floor((deadline - now) % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
          const minutes = Math.floor((deadline - now) % (1000 * 60 * 60) / (1000 * 60));
          const seconds = Math.floor((deadline - now) % (1000 * 60) / 1000);
          
          setTimeLeft(prev => ({
            ...prev,
            [product._id]: `${days}d ${hours}h ${minutes}m ${seconds}s`
          }));
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [data]);

  const products = data?.pages?.flatMap((page) => page.products) || [];

  return (
    <div className="bg-gray-50 py-2 md:py-12" id="featured-products">
      <div className="w-full px-2 md:container md:mx-auto md:px-6 overflow-x-hidden">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Products</h2>
        {isLoading ? (
          <div className="text-center text-lg text-gray-600 mt-4">
            Loading products...
          </div>
        ) : products.length === 0 ? (
          <div className="text-center text-lg text-gray-600 mt-4">
            No products found matching the search criteria.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2 md:gap-4">
            {products.map((product) => (
              <Link href={`/product/${product._id}`} key={product._id}>
                <div className="bg-white shadow-md overflow-hidden hover:shadow-xl transition duration-300 w-full">
                  <div className="relative h-32 w-full">
                    <img
                      src={`${process.env.NEXT_PUBLIC_VERCEL_URL}/products/${product.image}`}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-2 md:p-4">
                    <h3 className="font-bold text-xs md:text-sm mb-1 md:mb-2 text-gray-800 truncate">{product.title}</h3>
                    <div className="flex items-center justify-between mb-1 md:mb-2">
                      <div className="flex items-center">
                        <img
                          src="/amazon-logo.png"
                          alt="Amazon Logo"
                          className="h-4 md:h-5 mr-1 md:mr-2"
                        />
                        <span className="text-gray-600 text-xs md:text-sm">Amazon Price</span>
                      </div>
                      <span className="line-through text-gray-500 text-xs md:text-sm">${product.originalPrice || "N/A"}</span>
                    </div>
                    <div className="flex items-center justify-between mb-2 md:mb-3">
                      <span className="font-medium text-gray-600 text-xs md:text-sm">Our Price</span>
                      <span className="font-bold text-orange-500 text-sm md:text-xl">${product.price || "N/A"}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs md:text-sm">
                      <span className="text-gray-500 text-xs md:text-sm">Available until</span>
                      <span className={`px-2 py-1 rounded-full text-white text-xs md:text-sm ${
                        new Date(product.timeAvailable) - new Date() < 24 * 60 * 60 * 1000
                          ? "bg-red-500"
                          : "bg-green-500"
                      }`}>
                        {timeLeft[product._id]}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
        <div ref={observerRef}></div>
        {isFetchingNextPage && (
          <div className="text-center mt-8">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-orange-500 border-r-transparent"></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Home() {  
  return (
    <main className="min-h-screen">
      <Suspense fallback={<div>Loading...</div>}>
        <HeroSection />
        <FeaturedCategories />
        <PromotionalBanner />
        <ProductGrid />
      </Suspense>
    </main>
  );
}
