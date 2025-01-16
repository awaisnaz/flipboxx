import { MongoClient, ObjectId } from 'mongodb';

const updateProducts = async () => {
  const uri = 'mongodb+srv://admin:1nACNzCJsc7At7fR@cluster0.ji731.mongodb.net/ecommerce'; // Replace with your MongoDB connection string
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(); // Default database
    const collection = db.collection('products');

    // Update all documents, adding the fields only if they do not exist
    const result = await collection.updateMany(
      {}, // Match all documents
      {
        $set: {
          retailerId: new ObjectId(), // Add random ObjectId if not present
          soldFlag: false // Add false if not present
        }
      },
    //   { upsert: false } // Ensures existing documents are only modified
    );

    console.log(`${result.modifiedCount} documents updated`);
  } catch (error) {
    console.error('Error updating products:', error);
  } finally {
    await client.close();
  }
};

updateProducts();
