import { connectToDatabase } from '@/app/lib/mongodb';
import { ObjectId } from 'mongodb'; // Import ObjectId to handle MongoDB ObjectId fields

export async function GET(req) {
  const url = new URL(req.url);
  const page = parseInt(url.searchParams.get('page')) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;

  const search = url.searchParams.get('search') || '';
  const searchTerms = search.split(' ').filter(Boolean); // Split search query into individual terms

  const retailerId = url.searchParams.get('retailerId'); // Optional retailerId parameter

  const { db } = await connectToDatabase();

  // Construct the query object
  const query = {
    ...(searchTerms.length && {
      $or: searchTerms.map((term) => ({
        title: { $regex: term, $options: 'i' }, // Case-insensitive search in the title
      })),
    }),
    ...(retailerId && {
      retailerId: ObjectId.isValid(retailerId) ? new ObjectId(retailerId) : retailerId, // Handle ObjectId or string
    }),
  };

  const products = await db
    .collection('products')
    .find(query)
    .sort({ timeCreated: -1 }) // Sort by timeCreated in descending order
    .skip(skip)
    .limit(limit)
    .toArray();

  const totalProducts = await db.collection('products').countDocuments(query);

  return new Response(
    JSON.stringify({
      products,
      nextPage: skip + products.length < totalProducts ? page + 1 : null,
    }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
}
