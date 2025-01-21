'use client';

import { useEffect, useState } from 'react';
import { useSession, signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

export default function ProductsPage() {
  const { data: session, status } = useSession();
  const [customerId, setCustomerId] = useState(null); // State for storing customerId
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch customerId and products on component mount
  useEffect(() => {
    const fetchCustomerIdAndProducts = async () => {
      if (status !== 'authenticated' || !session?.user?.email) {
        setLoading(false);
        return;
      }

      try {
        // Fetch customer ID
        const customerRes = await fetch(
          `/api/customers/getCustomerIdByEmail?email=${encodeURIComponent(session.user.email)}`
        );
        if (!customerRes.ok) throw new Error('Failed to fetch customer ID');
        const { customerId } = await customerRes.json();
        setCustomerId(customerId); // Store customerId in state

        // Fetch products
        let products = await fetch(`/api/carts/getProducts?customerId=${customerId}`);
        if (!products.ok) {
          const errorData = await products.json();
          throw new Error(errorData.message || 'Failed to fetch products');
        }
        products = await products.json();
        setProducts(products);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerIdAndProducts();
  }, [session, status]);

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  async function handleRemoveProduct(productId) {
    if (!customerId) return; // Ensure customerId is available

    try {
      const response = await fetch(
        `/api/carts/removeProduct?customerId=${customerId}&productId=${productId}`,
        { method: 'GET' }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to remove product');
      }

      const data = await response.json();
      console.log(data.message); // Success message

      const updatedProducts = products.filter((product) => product.productId._id !== productId);
      setProducts(updatedProducts);
    } catch (error) {
      console.error('Error:', error.message);
    }
  }

  // Calculate total price
  const totalPrice = products.reduce((sum, product) => sum + product.productId.price, 0);

  // Render content based on state
  if (status === 'unauthenticated') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <p className="text-lg text-center text-gray-600 mb-4">
          Please log in to view your products.
        </p>
        <button
          onClick={() => signIn('google')}
          className="px-6 py-2 text-lg text-white bg-blue-600 rounded-md shadow-md hover:bg-blue-700 transition-all duration-300"
        >
          Sign in with Google
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <p className="text-lg text-center text-gray-600">Loading your products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <p className="text-lg text-center text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-2">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {products.length > 0 ? (
        <div>
          <div className="space-y-4">
            {products.map((product, index) => (
              <div key={index} className="flex flex-row sm:flex-row rounded-md bg-white">
                {/* First vertical section: Image, Title, and Price wrapped in Link */}
                <Link
                  href={`/product/${product.productId._id}`} // Linking to the product detail page
                  className="flex flex-row w-full"
                >
                  {/* Image Section */}
                  <div className="flex-shrink-0 sm:w-1/3 mb-4 sm:mb-0 sm:mr-4">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_VERCEL_URL}/products/${product.productId.image}`}
                      alt={product.productId.title}
                      width={60}
                      height={60}
                      className="rounded-md object-cover"
                    />
                  </div>

                  {/* Product Details Section */}
                  <div className="flex flex-col w-full pl-2">
                    <div className="text-lg font-medium text-gray-800 mb-2">
                      {product.productId.title}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-lg font-bold text-orange-600">${product.productId.price}</div>
                    </div>
                  </div>
                </Link>

                {/* Close Button (Not wrapped in Link) */}
                <div
                  className="flex items-start text-2xl font-bold -mt-1 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent link navigation when clicking remove
                    handleRemoveProduct(product.productId._id);
                  }}
                >
                  ×
                </div>
              </div>
            ))}
          </div>
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-b border-gray-300 p-4 flex justify-between items-center shadow-md">
            <p className="text-lg font-bold text-gray-800">
              Total Price: <span className="text-orange-600">${totalPrice.toFixed(2)}</span>
            </p>
            <button
              onClick={() => (window.location.href = 'https://www.paypal.com/checkoutnow')}
              className="px-6 py-2 text-lg text-white bg-orange-600 rounded-md shadow-md hover:bg-orange-700 transition-all duration-300"
            >
              Checkout
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-600">Your cart is currently empty.</p>
      )}
    </div>
  );
}
