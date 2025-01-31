import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Image from 'next/image';
import EmailSubscriptionForm from "./components/EmailSubscriptionForm";

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
  title: 'Flipboxx',
  description: 'Your marketplace for open-box deals',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}>
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
          <div className="container mx-auto px-4 py-3 md:py-5 flex justify-between items-center">
            <div className="flex items-center">
              <a href="/" className="text-3xl font-bold text-gray-900 hover:opacity-90">Flip<span className="text-orange-500">boxx</span></a>
            </div>
            <div className="flex gap-4 md:gap-8 items-center">
              <a href="/" className="text-gray-600 hover:text-gray-900 text-2xl font-medium">Home</a>
              <a href="#about" className="text-gray-600 hover:text-gray-900 text-2xl font-medium">About us</a>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="pt-16">
          {/* Hero Section */}
          <header className="relative">
            <div className="absolute inset-0 bg-black/35 z-10"></div>
            <div className="relative h-[400px] md:h-[500px]">
              <Image
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Shopping Background"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 z-20">
                <div className="container mx-auto px-4 h-full flex flex-col justify-center py-8 sm:py-0">
                  <div className="max-w-4xl mx-auto text-center space-y-4 sm:space-y-6">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8 leading-tight">
                      <span className="text-gray-900 drop-shadow-2xl">Flip</span><span className="text-orange-500 drop-shadow-2xl">boxx</span>
                      <span className="text-white ml-3">is Where Great Deals Meet Zero Waste</span>
                    </h1>
                    <div className="text-xl text-white mb-8 md:mb-10 opacity-90 max-w-xl mx-auto px-2 md:px-4">
                      Shop open-box and returned items at unbeatable prices from your favorite retailers
                    </div>
                    <div className="px-2 md:px-4">
                      <EmailSubscriptionForm />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Marketplace Description */}
          <section className="bg-white">
            <div className="container mx-auto">
              <div className="bg-gray-50 p-6 md:p-8 shadow-sm">
                <div className="text-xl text-gray-700 leading-relaxed text-center">
                  We're your go-to marketplace for open-box deals from top retailers like Nordstrom, Target, and Old Navy - same great products, just cheaper!
                </div>
              </div>
            </div>
          </section>

          {/* Product Showcase */}
          <section className="py-8 md:py-12 bg-gradient-to-b from-orange-50 to-white">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
                <span className="text-gray-900">Flip</span><span className="text-orange-500">boxx</span>
                <span className="ml-2">Unboxed Treasures</span>
              </h2>
              <p className="text-xl text-gray-600 text-center mb-8 max-w-2xl mx-auto">Discover premium products from top retailers at <span className="font-bold"><span className="text-gray-900">Flip</span><span className="text-orange-500">boxx</span></span>'s unbeatable prices. Every purchase helps reduce waste and save money.</p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 lg:gap-6 max-w-7xl mx-auto">
                {/* Product Card 1 */}
                <div className="bg-white p-3 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col min-h-[24rem]">
                  <div className="relative mb-3 flex-shrink-0">
                    <Image
                      src="/layout/products/marcia-three-jacket.png"
                      alt="Marcia Three Jacket"
                      width={200}
                      height={300}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      Save 15%
                    </div>
                  </div>
                  <div className="flex flex-col flex-grow">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">Marcia Three Jacket</h3>
                    <div className="mt-auto space-y-2">
                      <div className="flex items-center gap-2 border-b pb-2">
                        <Image
                          src="/layout/logos/nordstrom.png"
                          alt="Nordstrom"
                          width={100}
                          height={40}
                          className="h-10 w-auto"
                        />
                        <div className="text-lg text-gray-500 line-through">$65</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-lg font-bold">
                          <span className="text-gray-900">Flip</span><span className="text-orange-500">boxx</span>
                        </div>
                        <div className="text-xl font-bold text-orange-600">$55</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Product Card 2 */}
                <div className="bg-white p-3 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col min-h-[24rem]">
                  <div className="relative mb-3 flex-shrink-0">
                    <Image
                      src="/layout/products/marcia-garcia-jacket.png"
                      alt="Marcia Garcia Jacket"
                      width={200}
                      height={300}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      Save 16%
                    </div>
                  </div>
                  <div className="flex flex-col flex-grow">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">Marcia Garcia Jacket</h3>
                    <div className="mt-auto space-y-2">
                      <div className="flex items-center gap-2 border-b pb-2">
                        <Image
                          src="/layout/logos/macys.png"
                          alt="Macys"
                          width={100}
                          height={40}
                          className="h-10 w-auto"
                        />
                        <div className="text-lg text-gray-500 line-through">$45</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-lg font-bold">
                          <span className="text-gray-900">Flip</span><span className="text-orange-500">boxx</span>
                        </div>
                        <div className="text-xl font-bold text-orange-600">$38</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Product Card 3 */}
                <div className="bg-white p-3 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col min-h-[24rem]">
                  <div className="relative mb-3 flex-shrink-0">
                    <Image
                      src="/layout/products/garcia-saturn-dress.png"
                      alt="Garcia Saturn Dress"
                      width={200}
                      height={300}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      Save 16%
                    </div>
                  </div>
                  <div className="flex flex-col flex-grow">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">Garcia Saturn Dress</h3>
                    <div className="mt-auto space-y-2">
                      <div className="flex items-center gap-2 border-b pb-2">
                        <Image
                          src="/layout/logos/target.png"
                          alt="Target"
                          width={100}
                          height={40}
                          className="h-10 w-auto"
                        />
                        <div className="text-lg text-gray-500 line-through">$70</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-lg font-bold">
                          <span className="text-gray-900">Flip</span><span className="text-orange-500">boxx</span>
                        </div>
                        <div className="text-xl font-bold text-orange-600">$59</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Product Card 4 */}
                <div className="bg-white p-3 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col min-h-[24rem]">
                  <div className="relative mb-3 flex-shrink-0">
                    <Image
                      src="/layout/products/marcia-three-dress.png"
                      alt="Marcia Three Dress"
                      width={200}
                      height={300}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      Save 15%
                    </div>
                  </div>
                  <div className="flex flex-col flex-grow">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">Marcia Three Dress</h3>
                    <div className="mt-auto space-y-2">
                      <div className="flex items-center gap-2 border-b pb-2">
                        <Image
                          src="/layout/logos/nordstrom.png"
                          alt="Nordstrom"
                          width={100}
                          height={40}
                          className="h-10 w-auto"
                        />
                        <div className="text-lg text-gray-500 line-through">$55</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-lg font-bold">
                          <span className="text-gray-900">Flip</span><span className="text-orange-500">boxx</span>
                        </div>
                        <div className="text-xl font-bold text-orange-600">$47</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Product Card 5 */}
                <div className="bg-white p-3 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col min-h-[24rem]">
                  <div className="relative mb-3 flex-shrink-0">
                    <Image
                      src="/layout/products/joygard-fuchi-dress.png"
                      alt="Joygard Fuchi Dress"
                      width={200}
                      height={300}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      Save 17%
                    </div>
                  </div>
                  <div className="flex flex-col flex-grow">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">Joygard Fuchi Dress</h3>
                    <div className="mt-auto space-y-2">
                      <div className="flex items-center gap-2 border-b pb-2">
                        <Image
                          src="/layout/logos/macys.png"
                          alt="Macys"
                          width={100}
                          height={40}
                          className="h-10 w-auto"
                        />
                        <div className="text-lg text-gray-500 line-through">$35</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-lg font-bold">
                          <span className="text-gray-900">Flip</span><span className="text-orange-500">boxx</span>
                        </div>
                        <div className="text-xl font-bold text-orange-600">$29</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Product Card 6 */}
                <div className="bg-white p-3 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col min-h-[24rem]">
                  <div className="relative mb-3 flex-shrink-0">
                    <Image
                      src="/layout/products/truro-modular-dress.png"
                      alt="Truro Modular Dress"
                      width={200}
                      height={300}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      Save 20%
                    </div>
                  </div>
                  <div className="flex flex-col flex-grow">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">Truro Modular Dress</h3>
                    <div className="mt-auto space-y-2">
                      <div className="flex items-center gap-2 border-b pb-2">
                        <Image
                          src="/layout/logos/target.png"
                          alt="Target"
                          width={100}
                          height={40}
                          className="h-10 w-auto"
                        />
                        <div className="text-lg text-gray-500 line-through">$25</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-lg font-bold">
                          <span className="text-gray-900">Flip</span><span className="text-orange-500">boxx</span>
                        </div>
                        <div className="text-xl font-bold text-orange-600">$20</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Retailer Logos */}
          <section className="py-12 md:py-20 bg-white">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-20 items-center">
                <div className="flex justify-center">
                  <Image 
                    src="/layout/logos/target.png" 
                    alt="Target" 
                    width={300} 
                    height={100} 
                    className="w-auto h-16 md:h-22" 
                  />
                </div>
                <div className="flex justify-center">
                  <Image 
                    src="/layout/logos/old_navy.png" 
                    alt="Old Navy" 
                    width={300} 
                    height={100} 
                    className="w-auto h-16 md:h-22" 
                  />
                </div>
                <div className="flex justify-center">
                  <Image 
                    src="/layout/logos/macys.png" 
                    alt="Macy's" 
                    width={300} 
                    height={100} 
                    className="w-auto h-16 md:h-22" 
                  />
                </div>
                <div className="flex justify-center">
                  <Image 
                    src="/layout/logos/nordstrom.png" 
                    alt="Nordstrom" 
                    width={300} 
                    height={100} 
                    className="w-auto h-16 md:h-22" 
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Mission Statement */}
          <section id="about" className="py-8 md:py-12 bg-gray-50">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-6">
                <span className="text-gray-900">Flip</span><span className="text-orange-500">boxx</span>
                <span className="text-gray-600 text-3xl ml-2">Story</span>
              </h2>
              <div className="text-lg text-gray-600 max-w-3xl mx-auto">
                Just your typical guys who love hunting for hidden gems while shopping. But we also started noticing the rise of consumer waste, and it didn't sit right with us. So, we decided to do something about it. We created Flipboxx, a marketplace where returned retailer products get a second chance. Our mission? To stop consumer waste and make sure these great items don't end up in landfills. It's awesome for your wallet and even better for the planet. Join us in making smarter, sustainable shopping the norm!
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-gray-600 text-white py-8 md:py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-6">
              <div>
                <h3 className="text-xl font-semibold mb-4 md:mb-6">Thank you for visiting <span className="text-gray-900">Flip</span><span className="text-orange-500">boxx</span></h3>
                <div className="text-base text-gray-300 mb-4"><span className="text-gray-900">Flip</span><span className="text-orange-500">boxx</span> is the leading AI returns platform, revolutionizing the way we handle returned products. Satisfaction Guaranteed.</div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 md:mb-6">Contact</h3>
                <div className="text-base text-gray-300 mb-4">We are based in San Francisco, California. You may contact us at <span className="font-bold">sales@flipboxx.com</span> for any inquiries.</div>
              </div>
            </div>
            <div className="border-t border-gray-700 pt-6 md:pt-8">
              <div className="text-center text-gray-400 text-xs md:text-sm">
                <div>©2025 Flipboxx Inc. All rights reserved.</div>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
