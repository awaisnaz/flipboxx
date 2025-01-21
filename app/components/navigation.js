'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';

export default function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const { register, handleSubmit } = useForm();
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const popupRef = useRef();
  const buttonRef = useRef();

  const onSubmit = (data) => {
    const searchQuery = data.search.trim();
    const searchRoute = pathname === '/dashboard' ? '/dashboard/?search' : '/?search';
    router.push(`${searchRoute}=${encodeURIComponent(searchQuery || '')}`);
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target) &&
        popupRef.current &&
        !popupRef.current.contains(event.target)
      ) {
        setIsPopupVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Render null for specific pathnames
  if (pathname === '/login') {
    return null;
  }

  return (
    <div className="sticky top-0 z-50 flex items-center justify-between p-2 bg-white shadow-md dark:bg-gray-800 dark:text-white">
      {/* Logo Section */}
      <div className="flex items-center">
        <Link href="/" passHref>
          <Image
            className="dark:invert cursor-pointer"
            src="/ecommerce-icon.png"
            alt="Ecommerce Logo"
            width={50}
            height={50}
            priority
          />
        </Link>
      </div>

      {/* Search Bar Section */}
      <div className="flex-1 mx-4 w-4/5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="relative flex items-center">
            <input
              type="text"
              className="h-10 w-full pl-4 pr-12 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              {...register('search', { required: 'Please enter a search query!' })}
              placeholder="Search something..."
            />
            <button
              type="submit"
              className="absolute right-0 top-0 bottom-0 bg-orange-500 text-white px-4 rounded-r-md flex items-center justify-center hover:bg-orange-600 transition-all"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      {/* User Authentication Section */}
      <div className="relative">
        {session ? (
          <div className="flex items-center space-x-4">
            <Image
              src={session.user.image || '/default-profile.png'}
              alt="User Profile"
              width={50}
              height={50}
              className="rounded-full cursor-pointer"
              ref={buttonRef}
              onClick={() => setIsPopupVisible(!isPopupVisible)}
            />
            {isPopupVisible && (
              <div
                className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-700 dark:border-gray-600"
                ref={popupRef}
                onClick={() => setIsPopupVisible(false)} // Close the popup when clicked
                style={{ right: '10px', top: '60px' }}
              >
                <ul className="flex flex-col p-2 space-y-1">
                  <li>
                    <Link
                      href="/cart"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md dark:text-gray-300 dark:hover:bg-gray-600"
                    >
                      Cart
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="mailto:support@ecommerce.com"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md dark:text-gray-300 dark:hover:bg-gray-600"
                    >
                      Help Center
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => signOut()}
                      className="w-full text-left block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md dark:text-gray-300 dark:hover:bg-gray-600"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => signIn('google')}
            className="bg-red-600 text-white py-2 px-6 rounded-md text-lg shadow-md hover:bg-red-700 transition-all duration-300 hover:shadow-lg"
          >
            <span className="flex items-center space-x-2">
              <span>Login</span>
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
