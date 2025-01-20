'use client';

import { useEffect, useState } from 'react';
import { useSession, signIn } from 'next-auth/react';
import Image from 'next/image';

export default function ProductsPage() {
  const { data: session, status } = useSession();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
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

        // Fetch products
        let products = await fetch(`/api/carts/getProductsByCustomerId?customerId=${customerId}`);
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

    fetchProducts();
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
    console.log("products: ", products);
    console.log("productId: ", productId);
  }

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

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
//       {products.length > 0 ? (
//         <div className="space-y-4">
//           {products.map((product, index) => (
//             <div
//               key={index}
//               className="flex flex-row sm:flex-row rounded-md"
//             >
//               {/* First vertical section: Image */}
//               <div className="flex-shrink-0 sm:w-1/2 mb-4 sm:mb-0 sm:mr-4">
//                 <Image
//                   src={`${process.env.NEXT_PUBLIC_VERCEL_URL}/products/${product.productId.image}`}
//                   alt={product.title}
//                   width={100}
//                   height={100}
//                   className="rounded-md"
//                 />
//               </div>

//               {/* Second vertical section: Other fields */}
//               <div className="flex flex-col w-full pl-2">
//                 <div className="text-lg font-medium text-gray-800">{product.productId.title}</div>
//                 <div className="text-sm text-gray-600">{formatDate(product.timeCreated)}</div>
//                 <div className="text-sm font-bold text-gray-900 mt-2">${product.productId.price}</div>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p className="text-gray-600">No products found for your account.</p>
//       )}
//     </div>
//   );

  return (
    <div className="p-2">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {products.length > 0 ? (
        <div className="space-y-4">
          {products.map((product, index) => (
            <div
              key={index}
              className="flex flex-row sm:flex-row rounded-md bg-white"
            >
              {/* First vertical section: Image */}
              <div className="flex-shrink-0 sm:w-1/3 mb-4 sm:mb-0 sm:mr-4">
                <Image
                  src={`${process.env.NEXT_PUBLIC_VERCEL_URL}/products/${product.productId.image}`}
                  alt={product.productId.title}
                  width={60}
                  height={60}
                  className="rounded-md object-cover"
                />
              </div>
  
              {/* Second vertical section: Product Details */}
              <div className="flex flex-col w-full pl-2">
                <div className="flex flex-row justify-between w-full">
                    <div className="text-lg font-medium text-gray-800 mb-2">{product.productId.title}</div>
                    <button
                        className="px-4 py-1 text-sm font-medium bg-red-100 text-red-600 rounded-md shadow-md hover:bg-red-200 transition-all"
                        onClick={() => handleRemoveProduct(product.productId._id)} // Replace with your removal logic
                    >
                        Remove
                    </button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-lg font-bold text-gray-900">${product.productId.price}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">Your cart is currently empty.</p>
      )}
    </div>
  );
  
}
