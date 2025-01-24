"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Page({ params: initialParams }) {
  const { data: session } = useSession();
  const [params, setParams] = useState(null);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState({ show: false, message: "" });

  useEffect(() => {
    (async () => {
      const resolvedParams = await initialParams;
      setParams(resolvedParams);
    })();
  }, [initialParams]);

  useEffect(() => {
    if (params?.id) {
      async function fetchProduct() {
        try {
          const response = await fetch(`/api/products/getProduct?productId=${params.id}`);
          if (!response.ok) {
            throw new Error("Failed to fetch product");
          }
          const data = await response.json();
          setProduct(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }

      fetchProduct();
    }
  }, [params]);

  async function handleAddToCart(productId) {
    try {
      if (!session?.user?.email) {
        showAlert("Please sign in to add products to the cart.");
        return;
      }

      const customerRes = await fetch(
        `/api/customers/getCustomerIdByEmail?email=${encodeURIComponent(session.user.email)}`
      );
      if (!customerRes.ok) throw new Error("Failed to fetch customer ID");
      const { customerId } = await customerRes.json();

      const response = await fetch(`/api/carts/addProduct?customerId=${customerId}&productId=${productId}`);
      const data = await response.json();

      if (response.ok) {
        showAlert("Added to cart successfully!");
      } else {
        showAlert(data.message || "Failed to add product to cart.");
      }
    } catch (err) {
      showAlert(err.message);
    }
  }

  function showAlert(message) {
    setAlert({ show: true, message });
    setTimeout(() => setAlert({ show: false, message: "" }), 3000);
  }

  if (!params) {
    return <div>Resolving parameters...</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="bg-white w-full md:w-[90%] mx-auto border border-gray-300 shadow-md -mt-2 md:mt-4">
      {/* Alert */}
      {alert.show && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-black bg-opacity-75 text-white text-lg font-bold py-4 px-6 rounded-lg">
            {alert.message}
          </div>
        </div>
      )}

      <div className="flex lg:flex-row flex-col gap-4">
        {/* Image Section */}
        <div className="relative w-full md:inline-block md:max-w-fit md:w-[500px] flex-1 bg-gray-200">
          <Image
            src={`${process.env.NEXT_PUBLIC_VERCEL_URL}/products/${product.image}`}
            alt={product.title}
            className="object-cover md:w-[500px] md:h-[500px]"
            width={1920}
            height={1080}
            priority
          />
        </div>

        {/* Details Section */}
        <div className="p-4 flex flex-col justify-between flex-1">
          <div>
            <div className="font-bold text-xl mb-2">{product.title}</div>

            {/* Price Section */}
            <div className="border-t border-gray-200 py-4">
              <div className="flex items-center justify-between text-gray-700">
                <div className="flex items-center">
                  <img
                    src="/amazon-logo.png"
                    alt="Amazon Logo"
                    className="h-5 mr-2"
                  />
                  <div className="font-medium">Price:</div>
                </div>
                <div className="line-through font-bold text-gray-600 text-xl">
                  ${product.originalPrice || "N/A"}
                </div>
              </div>
              <div className="flex items-start justify-between text-gray-700 mt-2">
                <div className="font-medium">Unboxed Price:</div>
                <div className="font-bold text-xl">${product.price || "N/A"}</div>
              </div>
            </div>

            {/* Shipping */}
            <div>
              Shipping details
            </div>

            {/* Seller Settings */}
            <div>
              Link to Seller's Amazon Account, not Product Link
            </div>

            {/* Share URL Link */}
            <div>
              Share URL Link
            </div>

            {/* Returns and Warranty */}
            <div>
              No Returns.
            </div>

            {/* Chat with seller */}
            <div>
              Chat using GET requests. No websockets. If the screen is active then update every second, otherwise email.
            </div>

            {/* Buy Now and Add to Cart Buttons (Desktop) */}
            <div className="hidden md:flex justify-between w-full mt-4">
              <Link
                href={`https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${product.paypalEmail}&item_name=${product.title}&amount=${product.price}&currency_code=USD&item_number=${product._id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-1/2 text-center px-6 py-3 bg-orange-400 text-white font-bold rounded-lg shadow-md hover:bg-orange-500 transition mr-2"
              >
                BUY NOW
              </Link>

              <button
                onClick={() => handleAddToCart(product._id)}
                className="w-1/2 text-center px-6 py-3 bg-orange-600 text-white font-bold rounded-lg shadow-md hover:bg-orange-700 transition ml-2"
              >
                ADD TO CART
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="p-4 border-t border-gray-200">
        <h2 className="font-bold text-lg mb-2">Product Description:</h2>
        <p className="text-gray-600">{product.description}</p>
      </div>

      {/* Buy Now and Add to Cart Buttons (Mobile) */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-gray-300 bg-white py-3 z-10 md:hidden">
        <div className="flex justify-between w-full px-4">
          <Link
            href={`https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${product.paypalEmail}&item_name=${product.title}&amount=${product.price}&currency_code=USD&item_number=${product._id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-1/2 text-center px-6 py-3 bg-orange-400 text-white font-bold rounded-lg shadow-md hover:bg-orange-500 transition mr-2"
          >
            BUY NOW
          </Link>

          <button
            onClick={() => handleAddToCart(product._id)}
            className="w-1/2 text-center px-6 py-3 bg-orange-600 text-white font-bold rounded-lg shadow-md hover:bg-orange-700 transition ml-2"
          >
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
}
