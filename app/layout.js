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
              <a href="/" className="text-gray-600 hover:text-gray-900 text-xl font-medium">Home</a>
              <a href="#about" className="text-gray-600 hover:text-gray-900 text-xl font-medium">About us</a>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="pt-16">
          {/* Hero Section */}
          <header className="relative">
            <div className="absolute inset-0 bg-black/50 z-10"></div>
            <div className="relative h-[400px] md:h-[500px]">
              <Image
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Shopping Background"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 z-20">
                <div className="container mx-auto px-4 h-full flex flex-col justify-center">
                  <div className="max-w-3xl mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 md:mb-8 leading-tight">
                      Great Deals. Less Waste
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
          <section className="py-8 md:py-12">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
                <div className="bg-white p-3 md:p-4 rounded-lg shadow-sm">
                  <Image
                    src="/layout/products/marcia-three-jacket.png"
                    alt="Marcia Three Jacket"
                    width={200}
                    height={300}
                    className="w-full h-48 object-cover rounded-lg mb-3 md:mb-4"
                  />
                  <div className="font-semibold text-base">Marcia Three Jacket</div>
                  <div className="text-yellow-600">$910</div>
                </div>
                <div className="bg-white p-3 md:p-4 rounded-lg shadow-sm">
                  <Image
                    src="/layout/products/marcia-garcia-jacket.png"
                    alt="Marcia Garcia Jacket"
                    width={200}
                    height={300}
                    className="w-full h-48 object-cover rounded-lg mb-3 md:mb-4"
                  />
                  <div className="font-semibold text-base">Marcia Garcia Jacket</div>
                  <div className="text-yellow-600">$840</div>
                </div>
                <div className="bg-white p-3 md:p-4 rounded-lg shadow-sm">
                  <Image
                    src="/layout/products/garcia-saturn-dress.png"
                    alt="Garcia Saturn Dress"
                    width={200}
                    height={300}
                    className="w-full h-48 object-cover rounded-lg mb-3 md:mb-4"
                  />
                  <div className="font-semibold text-base">Garcia Saturn Dress</div>
                  <div className="text-yellow-600">$730</div>
                </div>
                <div className="bg-white p-3 md:p-4 rounded-lg shadow-sm">
                  <Image
                    src="/layout/products/marcia-three-dress.png"
                    alt="Marcia Three Dress"
                    width={200}
                    height={300}
                    className="w-full h-48 object-cover rounded-lg mb-3 md:mb-4"
                  />
                  <div className="font-semibold text-base">Marcia Three Dress</div>
                  <div className="text-yellow-600">$1250</div>
                </div>
                <div className="bg-white p-3 md:p-4 rounded-lg shadow-sm">
                  <Image
                    src="/layout/products/joygard-fuchi-dress.png"
                    alt="Joygard Fuchi Dress"
                    width={200}
                    height={300}
                    className="w-full h-48 object-cover rounded-lg mb-3 md:mb-4"
                  />
                  <div className="font-semibold text-base">Joygard Fuchi Dress</div>
                  <div className="text-yellow-600">$600</div>
                </div>
                <div className="bg-white p-3 md:p-4 rounded-lg shadow-sm">
                  <Image
                    src="/layout/products/truro-modular-dress.png"
                    alt="Truro Modular Dress"
                    width={200}
                    height={300}
                    className="w-full h-48 object-cover rounded-lg mb-3 md:mb-4"
                  />
                  <div className="font-semibold text-base">Truro Modular Dress</div>
                  <div className="text-yellow-600">$950</div>
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
          <section id="about" className="py-8 md:py-12">
            <div className="container mx-auto px-4 text-center">
              <div className="text-lg text-gray-600 max-w-3xl mx-auto">
                Just your typical guys who love hunting for hidden gems while shopping. But we also started noticing the rise of consumer waste, and it didn't sit right with us. So, we decided to do something about it. We created Flipboxx, a marketplace where returned retailer products get a second chance. Our mission? To stop consumer waste and make sure these great items don't end up in landfills. It's awesome for your wallet and even better for the planet. Join us in making smarter, sustainable shopping the norm!
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-8 md:py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-6">
              <div>
                <h3 className="text-xl font-semibold mb-4 md:mb-6">Thank you for visiting Flipboxx</h3>
                <div className="text-base text-gray-300 mb-4">Flipboxx is the leading AI returns platform, revolutionizing the way we handle returned products. Satisfaction Guaranteed.</div>
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
