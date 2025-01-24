'use client';

import { useEffect, useState } from 'react';
import { useSession, signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

export default function ProductsPage() {
  const { data: session, status } = useSession();
  const [customerId, setCustomerId] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [customer, setCustomer] = useState({});

  useEffect(() => {
    const fetchCustomerData = async () => {
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
        setCustomerId(customerId);

        // Fetch products
        const productsRes = await fetch(`/api/carts/getProducts?customerId=${customerId}`);
        if (!productsRes.ok) {
          const errorData = await productsRes.json();
          throw new Error(errorData.message || 'Failed to fetch products');
        }
        const productsData = await productsRes.json();
        setProducts(productsData);

        // Fetch customer details
        const customerResDetails = await fetch(`/api/customers/getCustomer?email=${session.user.email}`);
        if (customerResDetails.ok) {
          const customerData = await customerResDetails.json();
          setCustomer(customerData);
          console.log("session: ", session);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerData();
  }, [session, status]);

  const handleAddressChange = (e) => {
    setCustomer({ ...customer, address: e.target.value });
  };

  const saveAddress = async () => {
    try {
      if (!customerId || !customer.address) return;

      const res = await fetch('/api/customers/updateAddress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerId, address: customer.address }),
      });

      if (!res.ok) {
        throw new Error('Failed to save address');
      }

      const data = await res.json();
      console.log(data.message);
    } catch (err) {
      console.error('Error:', err.message);
    }
  };

  async function handleRemoveProduct(productId) {
    if (!customerId) return;

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
      console.log(data.message);

      const updatedProducts = products.filter((product) => product.productId._id !== productId);
      setProducts(updatedProducts);
    } catch (error) {
      console.error('Error:', error.message);
    }
  }

  const totalPrice = products.reduce((sum, product) => sum + product.productId.price, 0);

  if (status === 'unauthenticated') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <p className="text-lg text-center text-gray-600 mb-4">Please log in to view your products.</p>
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
                <Link href={`/product/${product.productId._id}`} className="flex flex-row w-full">
                  <div className="flex-shrink-0 sm:w-1/3 mb-4 sm:mb-0 sm:mr-4">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_VERCEL_URL}/products/${product.productId.image}`}
                      alt={product.productId.title}
                      width={60}
                      height={60}
                      className="rounded-md object-cover"
                    />
                  </div>
                  <div className="flex flex-col w-full pl-2">
                    <div className="text-lg font-medium text-gray-800 mb-2">
                      {product.productId.title}
                    </div>
                    <div className="text-lg font-bold text-orange-600">
                      ${product.productId.price}
                    </div>
                  </div>
                </Link>
                <div
                  className="flex items-start text-2xl font-bold -mt-1 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveProduct(product.productId._id);
                  }}
                >
                  ×
                </div>
              </div>
            ))}
          </div>
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-b border-gray-300 p-4 flex flex-col space-y-4 shadow-md">
            <div className="flex flex-row items-start space-x-2">
              {/* Address Pin Icon */}
              <div className="flex-shrink-0">
                <span className="text-blue-600 text-2xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  className="w-6 h-6 text-blue-600"
                >
                  <path
                    d="M12 2c3.866 0 7 3.134 7 7 0 5.25-7 13-7 13s-7-7.75-7-13c0-3.866 3.134-7 7-7z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
                </span>
              </div>

              {/* Name, Mobile, and Address */}
              <div className="flex flex-col w-full space-y-2">
                {/* Name and Mobile */}
                <div className="flex flex-row gap-3 items-center">
                  <div
                    className="font-bold text-gray-800 cursor-pointer"
                    onClick={() => {
                      const newName = prompt("Enter your name:", session.user.name || "Your Name");
                      if (newName !== null) {
                        setCustomer((prev) => ({ ...prev, name: newName }));
                      }
                    }}
                  >
                    {session.user.name || "Your Name"}
                  </div>
                  <div
                    className="text-sm text-gray-500 cursor-pointer"
                    onClick={() => {
                      const newMobile = prompt("Enter your mobile number:", customer.mobile || "Add Mobile Number");
                      if (newMobile !== null) {
                        setCustomer((prev) => ({ ...prev, mobile: newMobile }));
                      }
                    }}
                  >
                    {customer.mobile || "Add Mobile Number"}
                  </div>
                </div>

                {/* Address */}
                <div
                  className="text-sm text-gray-700 cursor-pointer"
                  onClick={() => {
                    const newAddress = prompt("Enter your delivery address:", customer.address || "Enter your delivery address");
                    if (newAddress !== null) {
                      setCustomer((prev) => ({ ...prev, address: newAddress }));
                    }
                  }}
                >
                  {customer.address || "Enter your delivery address"}
                </div>
              </div>
            </div>

            {/* Checkout Section */}
            <div className="flex justify-between items-center">
              <div>
                <div className="text-lg font-bold text-gray-800">
                  Subtotal: <div className="text-orange-600 inline">${totalPrice.toFixed(2)}</div>
                </div>
                <div className="text-sm">
                  Shipping Fee: <div className="inline">${5}</div>
                </div>
              </div>
              <button
                onClick={() => (window.location.href = "https://www.paypal.com/checkoutnow")}
                className="px-6 py-2 text-lg text-white bg-orange-600 rounded-md shadow-md hover:bg-orange-700 transition-all duration-300"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-gray-600">Your cart is currently empty.</p>
      )}
    </div>
  );
}
