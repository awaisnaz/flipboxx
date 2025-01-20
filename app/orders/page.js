'use client';

import { useEffect, useState } from 'react';
import { useSession, signIn } from 'next-auth/react';
import Image from 'next/image';

export default function OrdersPage() {
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch orders on component mount
  useEffect(() => {
    const fetchOrders = async () => {
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

        // Fetch orders
        const ordersRes = await fetch(`/api/orders/getOrdersByCustomerId?customerId=${customerId}`);
        if (!ordersRes.ok) {
          const errorData = await ordersRes.json();
          throw new Error(errorData.message || 'Failed to fetch orders');
        }
        const { orders } = await ordersRes.json();
        setOrders(orders);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
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

  // Render content based on state
  if (status === 'unauthenticated') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <p className="text-lg text-center text-gray-600 mb-4">
          Please log in to view your orders.
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
        <p className="text-lg text-center text-gray-600">Loading your orders...</p>
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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Your Orders</h1>
      {orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map((order, index) => (
            <div
              key={index}
              className="flex flex-row sm:flex-row rounded-md"
            >
              {/* First vertical section: Image */}
              <div className="flex-shrink-0 sm:w-1/2 mb-4 sm:mb-0 sm:mr-4">
                <Image
                  src={`${process.env.NEXT_PUBLIC_VERCEL_URL}/products/${order.productId.image}`}
                  alt={order.productId.title}
                  width={100}
                  height={100}
                  className="rounded-md"
                />
              </div>

              {/* Second vertical section: Other fields */}
              <div className="flex flex-col w-full pl-2">
                <div className="text-lg font-medium text-gray-800">{order.productId.title}</div>
                <div className="text-sm text-gray-600">{formatDate(order.timeCreated)}</div>
                <div className="flex items-center justify-between mt-2">
                  <div className="text-sm font-bold text-gray-900">
                    ${order.productId.price}
                  </div>
                  <div
                    disabled
                    className={`px-4 py-1 text-sm font-medium rounded-full ${
                      order.status === 'toShip'
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {order.status === 'toShip' ? 'To Ship' : 'Pending'}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No orders found for your account.</p>
      )}
    </div>
  );
}
