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
    // Check if the product already exists for the customer
    const existingProduct = await carts.findOne({ customerId, productId });
    if (existingProduct) {
      return new Response(
        JSON.stringify({ message: 'Product already exists in the cart.' }),
        { status: 409, headers: { 'Content-Type': 'application/json' } } // 409 Conflict
      );
    }

    // Add the product to the cart
    const newCartItem = await carts.create({
      customerId,
      productId,
      timeCreated: new Date() // Automatically set current time
    });

    return new Response(
      JSON.stringify({ 
        message: 'Product added to the cart successfully.', 
        productId, 
        customerId 
      }),
      { status: 201, headers: { 'Content-Type': 'application/json' } } // 201 Created
    );
  } catch (error) {
    console.error('Error adding product:', error);
    return new Response(
      JSON.stringify({ message: 'Internal server error.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
