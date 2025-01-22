"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Navigation from "./components/navigation";
import Footer from "./components/footer";
import { useState } from "react";

// Load fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en">
      <head>
        {/* Metadata for the page */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100 flex flex-col min-h-screen`}
      >
        {/* Wrap everything inside the SessionProvider and QueryClientProvider */}
        <QueryClientProvider client={queryClient}>
          <SessionProvider>
            {/* Navigation always at the top */}
            <Navigation />
            {/* Main content takes up the available space */}
            <main className="flex-grow">{children}</main>
            {/* Footer sticks to the bottom if content is less */}
            <Footer />
          </SessionProvider>
          {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        </QueryClientProvider>
      </body>
    </html>
  );
}
