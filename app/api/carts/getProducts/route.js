import { connectToDatabase, carts } from '@/app/lib/mongodb';

export async function GET(req) {
  const url = new URL(req.url);
  const customerId = url.searchParams.get('customerId'); // Get the customerId parameter from the URL

  // If customerId is not provided, return a bad request response
  if (!customerId) {
    return new Response(
      JSON.stringify({ message: 'CustomerId parameter is required.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // Ensure the database connection is established
  await connectToDatabase();

  try {
    // Find cart entries for the customer, populate the `productId` field
    let products = await carts
      .find({ customerId })
      .populate('productId') // Populate the product details
      .exec();
    // console.log("populatedCarts: ", populatedCarts);

    // Extract only the populated products from the cart entries
    products = products;

    // If no products are found, return an empty array
    // if (!p.length) {
    //   return new Response(
    //     JSON.stringify({ message: 'No products found for this customer.', products: [] }),
    //     { status: 404, headers: { 'Content-Type': 'application/json' } }
    //   );
    // }

    return new Response(
      JSON.stringify(products),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error fetching products:', error);
    return new Response(
      JSON.stringify({ message: 'Internal server error.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
