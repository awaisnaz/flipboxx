"use client";

export default function LandingPage() {
  return (
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
                src="https://source.unsplash.com/800x600/?shopping,products"
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
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h11M9 21V3m3 6h8m0 0l-3-3m3 3l-3 3" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Huge Savings</h3>
              <p>Get up to 70% off on unboxed products returned by customers.</p>
            </div>
            {/* Feature Card */}
            <div className="p-6 bg-white shadow-lg rounded-lg text-center">
              <div className="flex justify-center items-center w-16 h-16 mx-auto mb-4 bg-yellow-100 text-yellow-600 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-3.866 0-7 3.582-7 8a8 8 0 0015.7 0c0-4.418-3.134-8-7-8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Top Retailers</h3>
              <p>Shop returns from trusted brands like Amazon, Target, and Walmart.</p>
            </div>
            {/* Feature Card */}
            <div className="p-6 bg-white shadow-lg rounded-lg text-center">
              <div className="flex justify-center items-center w-16 h-16 mx-auto mb-4 bg-green-100 text-green-600 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21l8.78-8.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
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
  );
}
