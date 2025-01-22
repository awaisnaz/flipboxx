'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 dark:text-gray-300 py-6">
      {/* Footer Content */}
      <div className="w-full px-4 pt-2">
        {/* Links Section */}
        <div className="max-w-7xl mx-auto flex flex-col items-center space-y-4 md:flex-row md:justify-between md:space-y-0">
          {/* Left Side - Links */}
          <div className="flex space-x-6">
            <Link
              href="/help"
              className="text-gray-700 hover:text-orange-500 transition-all dark:text-gray-300 dark:hover:text-orange-400"
            >
              Help
            </Link>
            <Link
              href="/privacy"
              className="text-gray-700 hover:text-orange-500 transition-all dark:text-gray-300 dark:hover:text-orange-400"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-gray-700 hover:text-orange-500 transition-all dark:text-gray-300 dark:hover:text-orange-400"
            >
              Terms
            </Link>
          </div>

          {/* Right Side - Copyright */}
          <div className="text-center md:text-right text-gray-600 dark:text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Your Company Name. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
