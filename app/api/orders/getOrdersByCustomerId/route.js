import { connectToDatabase, orders } from '../../../lib/mongodb';

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
    // Find orders for the customer, sort by timeCreated (descending), and populate the `productId` field
    let populatedOrders = await orders
      .find({ customerId })
      .sort({ timeCreated: -1 }) // Sort orders by timeCreated in descending order
      .populate('productId')
      .exec();

    // If no orders are found, return an empty array
    if (!populatedOrders.length) {
      return new Response(
        JSON.stringify({ message: 'No orders found for this customer.', orders: [] }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ orders: populatedOrders }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error fetching orders:', error);
    return new Response(
      JSON.stringify({ message: 'Internal server error.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
