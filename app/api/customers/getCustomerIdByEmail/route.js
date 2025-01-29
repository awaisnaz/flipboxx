import { connectToDatabase } from '@/app/lib/mongodb'; 

export async function GET(req) {
  const url = new URL(req.url);
  const email = url.searchParams.get('email'); // Get the email parameter from the URL

  // If email is not provided, return a bad request response
  if (!email) {
    return new Response(
      JSON.stringify({ message: 'Email parameter is required.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const { db } = await connectToDatabase();

  // Query the customers collection to find a customer by email
  let customer = await db.collection('customers').findOne({ email });
  customer = customer._id;

  // If customer is not found, return a 404 response
  if (!customer) {
    return new Response(
      JSON.stringify({ message: 'Customer not found.' }),
      { status: 404, headers: { 'Content-Type': 'application/json' } }
    );
  }

  return new Response(
    JSON.stringify({
      customerId: customer,
    }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );  
}
