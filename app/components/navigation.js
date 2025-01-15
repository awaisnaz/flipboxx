'use client'

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';  // Import useRouter
import Image from 'next/image';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import Link from 'next/link'; // Import Link from next/link

export default function Navigation() {
    const pathname = usePathname();
    const router = useRouter(); // Initialize router
    const { data: session } = useSession();
    const [dropdownVisible, setDropdownVisible] = useState(false);

    // Search Form handling
    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => {
        const searchQuery = data.search.trim(); // Get the search query input
        // If the search query is empty, we will still push the search route
        // But with an empty query to fetch all products from the backend
        router.push(`/?search=${encodeURIComponent(searchQuery || '')}`); // Navigate to /?search=<input terms>
    };

    if (pathname === '/login') {
        return null; // Don't render the NavBar on the login page
    }

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    return (
        <div className="sticky top-0 z-50 flex items-center justify-between p-2 bg-white shadow-md dark:bg-gray-800 dark:text-white">
            {/* Logo Section */}
            <div className="flex items-center">
                <Link href="/" passHref>
                    <Image
                        className="dark:invert cursor-pointer" // Added cursor pointer for clickable logo
                        src="/ecommerce-icon.png"
                        alt="Ecommerce Logo"
                        width={50}
                        height={50}
                        priority
                    />
                </Link>
            </div>

            {/* Search Bar Section */}
            <div className="flex-1 mx-4 w-4/5"> {/* Take 80% of the horizontal space */}
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
                            src={session.user.image || '/default-profile.png'} // Show Google profile image or fallback
                            alt="User Profile"
                            width={50}
                            height={50}
                            className="rounded-full cursor-pointer"
                            onClick={toggleDropdown}
                        />
                        {dropdownVisible && (
                            <div className="absolute right-0 mt-2 w-32 bg-white border rounded-lg shadow-lg dark:bg-gray-700 dark:border-gray-600">
                                <button
                                    onClick={() => signOut()}
                                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <button
                        onClick={() => signIn('google')}
                        className="bg-red-600 text-white py-2 px-6 rounded-md text-lg shadow-md hover:bg-red-700 transition-all duration-300 hover:shadow-lg"
                    >
                        <span className="flex items-center space-x-2">
                            <span>LogIn</span>
                        </span>
                    </button>
                )}
            </div>
        </div>
    );
}
