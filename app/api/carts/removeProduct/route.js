import { connectToDatabase, carts } from '../../../lib/mongodb';

export async function GET(req) {
  const url = new URL(req.url);
  const customerId = url.searchParams.get('customerId'); // Get customerId from the URL
  const productId = url.searchParams.get('productId'); // Get productId from the URL

  // Validate required parameters
  if (!customerId || !productId) {
    return new Response(
      JSON.stringify({ message: 'Both customerId and productId parameters are required.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // Ensure the database connection is established
  await connectToDatabase();

  try {
    // Find and delete the product for the given customerId and productId
    const result = await carts.deleteOne({ 
      customerId: customerId, 
      productId: productId 
    });

    // Check if a record was deleted
    if (result.deletedCount === 0) {
      return new Response(
        JSON.stringify({ message: 'No matching record found to delete.' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ message: 'Product removed successfully.' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error deleting product:', error);
    return new Response(
      JSON.stringify({ message: 'Internal server error.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
