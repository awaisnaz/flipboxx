import mongoose from 'mongoose';

const productsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  originalPrice: {
    type: Number,
    required: true,
  },
  description: {
    type: String, // Changed type to String (assuming this was intended)
    required: true,
  },
  retailerId: {
    type: mongoose.Schema.Types.ObjectId, // Changed to ObjectId
    required: true,
  },
  soldFlag: {
    type: Boolean, // Changed type to Boolean
    required: true,
  },
  timeAvailable: {
    type: Date, // Changed to Date for timestamps
    required: true,
  },
  timeCreated: {
    type: Date, // Changed to Date for timestamps
    default: Date.now, // Automatically set the default to the current timestamp
  },
});

const products = mongoose.models.products || mongoose.model('products', productsSchema);

const customersSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // Ensures email addresses are unique
  },
  address: {
    type: String,
    required: false,
  }
});

const customers = mongoose.models.customers || mongoose.model("customers", customersSchema);

const retailersSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // Ensures email addresses are unique
  }
});

const retailers = mongoose.models.retailers || mongoose.model("retailers", retailersSchema);

// async function connectToDatabase() {
//   if (mongoose.connection.readyState === 0) {
//   let db = await mongoose.connect(process.env.MONGODB_URL);  
//   return db;
// }

async function connectToDatabase() {
  if (mongoose.connection.readyState === 0) {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("MongoDB connected");
  }
  return { db: mongoose.connection.db };
}

export {
  connectToDatabase,
  products,
  customers,
  retailers
}
