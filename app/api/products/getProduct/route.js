import { connectToDatabase, products } from '@/app/lib/mongodb';
import { ObjectId } from 'mongodb'; // Import ObjectId to handle MongoDB ObjectId fields

export async function GET(req) {
  try {
    // Parse the request URL
    const url = new URL(req.url);

    // Extract productId from query parameters
    const productId = url.searchParams.get('productId');
    if (!productId || !ObjectId.isValid(productId)) {
      return new Response(
        JSON.stringify({ error: 'Invalid or missing productId' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Connect to the database
    const { db } = await connectToDatabase();

    // Query the products collection for the product with the given ObjectId
    const product = await products.findOne({ _id: new ObjectId(productId) });

    // If the product is not found, return an error response
    if (!product) {
      return new Response(
        JSON.stringify({ error: 'Product not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Return the product data
    return new Response(JSON.stringify(product), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    // Handle errors and return a generic error response
    console.error('Error fetching product:', error);
    return new Response(
      JSON.stringify({ error: 'An error occurred while fetching the product' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
