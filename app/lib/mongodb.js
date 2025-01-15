import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  priceOld: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true,
  },
});

const products = mongoose.models.products || mongoose.model('products', ProductSchema);

// async function connectToDatabase() {
//   if (mongoose.connection.readyState === 0) {
//   let db = await mongoose.connect(process.env.MONGODB_URL);  
//   return db;
// }

async function connectToDatabase() {
  console.log("Connecting to MongoDB...");
  await mongoose.connect(process.env.MONGODB_URL);
  console.log('MongoDB connected');
  return { db: mongoose.connection.db };
}

export {
  connectToDatabase,
  products
}
