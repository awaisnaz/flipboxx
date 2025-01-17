import { connectToDatabase } from '../../lib/mongodbodb';

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

  // Query the retailers collection to find a retailer by email
  let retailer = await db.collection('retailers').findOne({ email });
  retailer = retailer._id;

  // If retailer is not found, return a 404 response
  if (!retailer) {
    return new Response(
      JSON.stringify({ message: 'Retailer not found.' }),
      { status: 404, headers: { 'Content-Type': 'application/json' } }
    );
  }

  return new Response(
    JSON.stringify({
      retailer,
    }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
}
