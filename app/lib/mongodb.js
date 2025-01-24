import mongoose from 'mongoose';

const customersSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // Ensures email addresses are unique
  },
  mobile: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
  orders: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'orders', // Reference to orders collection
  }],
});

const customers = mongoose.models.customers || mongoose.model("customers", customersSchema);

const retailersSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // Ensures email addresses are unique
  },
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'products', // Reference to products collection
  }],
});

const retailers = mongoose.models.retailers || mongoose.model("retailers", retailersSchema);

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
    ref: 'retailers', // Reference to retailers collection
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
  quantity: {
    type: Number, // Changed to Date for timestamps
    default: 1, // Automatically set the default to the current timestamp
  },
});

const products = mongoose.models.products || mongoose.model('products', productsSchema);

// Define the carts schema
const cartsSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'customers', // Reference to customers collection
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'products', // Reference to products collection
  },
  timeCreated: {
    type: Date,
    default: Date.now, // Automatically set the default to the current timestamp
  },
});

// Create the carts model or use the existing one
const carts = mongoose.models.carts || mongoose.model('carts', cartsSchema);

const ordersSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'products', // Reference to products collection
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'customers', // Reference to customers collection
  },
  retailerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'retailers', // Reference to retailers collection (indirectly through product)
  },
  timeCreated: {
    type: Date,
    default: Date.now, // Automatically set the default to the current timestamp
  },
  status: {
    type: String,
    default: "toShip", // Automatically set the default to the current timestamp
  },
});

const orders = mongoose.models.orders || mongoose.model('orders', ordersSchema);

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
  retailers,
  orders,
  carts
}
