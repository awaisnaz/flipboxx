import { connectToDatabase } from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';
import Image from 'next/image';
import Link from 'next/link';

export default async function Page({ params }) {
  let params2 = await params;
  const { id } = params2; // Destructure `id` from params

  try {
    // Validate the ObjectId
    if (!ObjectId.isValid(id)) {
      throw new Error('Invalid product ID');
    }

    // Connect to the database
    const { db } = await connectToDatabase();

    // Query the database for the product by _id
    const product = await db.collection('products').findOne({ _id: new ObjectId(id) });

    // If no product is found, throw an error
    if (!product) {
      throw new Error('Product not found');
    }

    // Fetch retailer information based on retailerId
    const retailer = await db.collection('retailers').findOne({ _id: new ObjectId(product.retailerId) });

    // If no retailer is found, throw an error
    if (!retailer) {
      throw new Error('Retailer not found');
    }

    // Get the PayPal email from the retailer
    const paypalEmail = retailer.paypalEmail;

    // Render the product details as HTML
    return (
      <div className="max-w-3xl mx-auto border border-gray-300 rounded-lg shadow-md -mt-2">
        {/* Image Section */}
        <div className="relative">
          <Image
            src={`${process.env.NEXT_PUBLIC_VERCEL_URL}/products/${product.image}`}
            alt={product.title}
            className="w-full rounded-t-lg"
            width={1920} // Replace with the actual image width
            height={1080} // Replace with the actual image height
          />
        </div>

        {/* Details Section */}
        <div className="p-4">
          <div className="font-bold text-xl mb-2">{product.title}</div>

          {/* Price Section */}
          <div className="border-t border-gray-200 py-4">
            <div className="flex items-center justify-between text-gray-700">
              <div className="flex items-center">
                <img
                  src="/amazon-logo.png"
                  alt="Amazon Logo"
                  className="h-5 mr-2"
                />
                <div className="font-medium">Amazon Price:</div>
              </div>
              <div className="line-through font-bold text-gray-600 text-xl">
                ${product.originalPrice || 'N/A'}
              </div>
            </div>
            <div className="flex items-start justify-between text-gray-700 mt-2">
              <div className="font-medium">Unboxed Price:</div>
              <div className="font-bold text-xl">${product.price || 'N/A'}</div>
            </div>
          </div>

          {/* Description Section */}
          <div className="border-t border-gray-200 py-4">
            <h2 className="font-bold text-lg mb-2">Product Description:</h2>
            <p className="text-gray-600">{product.description}</p>
          </div>

          <div className="text-xs flex items-center justify-between pt-2 pb-2">
            <div className="flex items-center text-base">Status:</div>
            <div className="flex items-center">
                {new Date() > new Date(product.timeAvailable) ? (
                <span className="px-2 py-1 text-sm font-semibold text-white bg-red-500 rounded-md flex items-center">
                    EXPIRED
                </span>
                ) : product.soldFlag ? (
                <span className="px-2 py-1 text-sm font-semibold text-white bg-gray-500 rounded-md flex items-center">
                    SOLD
                </span>
                ) : (
                <span className="px-2 py-1 text-sm font-semibold text-white bg-green-500 rounded-md flex items-center">
                    AVAILABLE
                </span>
                )}
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    // Handle errors and return an error message as HTML
    return <div>{error.message}</div>;
  }
}
