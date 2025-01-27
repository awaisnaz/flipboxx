import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "./components/navigation";
import Footer from "./components/footer";
import { Providers } from "./providers";

// Load fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'Ecommerce',
  description: 'Your one-stop shop for all your needs',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100 flex flex-col min-h-screen`}
      >
        {/*<Providers>
          <Navigation />
          <main className="flex-grow">{children}</main>
          <Footer />
        </Providers>*/}

        <div className="bg-gray-100 text-gray-900">
          {/* Hero Section */}
          <header className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
            <div className="container mx-auto px-4 py-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8">
                <div>
                  <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                    Affordable Returns from Big Retailers
                  </h1>
                  <p className="text-lg mb-6">
                    Buy high-quality, unboxed returned products from top retailers like Amazon, Walmart, and more—at unbeatable prices. Sign up to be notified when your desired products are ready!
                  </p>
                  <form action="/subscribe" method="POST" className="flex flex-col sm:flex-row gap-4">
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="Enter your email"
                      className="w-full sm:w-auto flex-1 px-4 py-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-gray-900"
                    />
                    <button
                      type="submit"
                      className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-6 py-3 rounded-lg transition-all duration-300"
                    >
                      Notify Me
                    </button>
                  </form>
                </div>
                <div className="relative">
                  <img
                    src="https://i0.wp.com/t-labz.com/wp-content/uploads/2023/07/Unboxed-Deals-Banner-Final.png?resize=1300%2C235&ssl=1"
                    alt="Unboxed Deals"
                    className="rounded-lg shadow-lg w-full"
                  />
                </div>
              </div>
            </div>
          </header>

          {/* Features Section */}
          <section className="py-16 bg-gray-100">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">Why Choose Flipboxx?</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Feature Card */}
                <div className="p-6 bg-white shadow-lg rounded-lg text-center">
                  <div className="flex justify-center items-center w-16 h-16 mx-auto mb-4 bg-indigo-100 text-indigo-600 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Huge Savings</h3>
                  <p>Get up to 80% off on unboxed products returned by customers.</p>
                </div>
                {/* Feature Card */}
                <div className="p-6 bg-white shadow-lg rounded-lg text-center">
                  <div className="flex justify-center items-center w-16 h-16 mx-auto mb-4 bg-yellow-100 text-yellow-600 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                    <path d="M16 10a4 4 0 0 1-8 0" />
                  </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Top Retailers</h3>
                  <p>Shop returns from trusted brands like Amazon, Target, and Walmart.</p>
                </div>
                {/* Feature Card */}
                <div className="p-6 bg-white shadow-lg rounded-lg text-center">
                  <div className="flex justify-center items-center w-16 h-16 mx-auto mb-4 bg-green-100 text-green-600 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
                    <path d="M32 12 C48 18, 48 46, 32 52 C16 46, 16 18, 32 12" fill="#4caf50"/>
                    <path d="M32 12 L32 52" stroke="#388e3c" strokeWidth="2"/>
                  </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Sustainability</h3>
                  <p>Reduce waste by purchasing items that deserve a second chance.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Footer Section */}
          <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto px-4 text-center">
              <p>&copy; 2025 Flipboxx. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
