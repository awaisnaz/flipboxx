import { connectToDatabase } from '../../lib/mongodb';

export async function GET(req) {
  const url = new URL(req.url);
  const page = parseInt(url.searchParams.get('page')) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;

  const search = url.searchParams.get('search') || '';
  const searchTerms = search.split(' ').filter(Boolean); // Split search query into individual terms

  const { db } = await connectToDatabase();

  // If the search term is empty, query for all products
  const query = searchTerms.length
    ? {
        $or: searchTerms.map((term) => ({
          title: { $regex: term, $options: 'i' }, // Case-insensitive search in the title
        })),
      }
    : {}; // Empty query for all products when search is empty

  const products = await db
    .collection('products')
    .find(query)
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
