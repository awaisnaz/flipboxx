import { MongoClient } from 'mongodb';

const updateProducts = async () => {
  const uri = 'mongodb+srv://admin:1nACNzCJsc7At7fR@cluster0.ji731.mongodb.net/ecommerce'; // Replace with your MongoDB connection string
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(); // Default database
    const collection = db.collection('products');

    // Create a JavaScript Date object for 1 January 2026
    const timeAvailableDate = new Date('2026-01-01T00:00:00Z');

    // Update all documents, adding the field only if it does not exist
    const result = await collection.updateMany(
      {}, // Match all documents
      {
        $set: {
          timeAvailable: timeAvailableDate, // Set the date field
        },
      }
    );

    console.log(`${result.modifiedCount} documents updated`);
  } catch (error) {
    console.error('Error updating products:', error);
  } finally {
    await client.close();
  }
};

updateProducts();
