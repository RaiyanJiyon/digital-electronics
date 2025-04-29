import { MongoClient, ServerApiVersion, Db } from "mongodb";

let db: Db | null = null; // Explicitly define the type

export const connectDB = async (): Promise<Db> => {
  if (db) {
    return db;
  }

  try {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
      throw new Error(
        "Invalid or undefined MONGODB_URI environment variable"
      );
    }

    // Create a MongoClient with a MongoClientOptions object to set the Stable API version
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        deprecationErrors: true,
      },
    });

    await client.connect();
    db = client.db('digital-electronics');
    console.log("Connected to db");
    return db;
  } catch (error) {
    // Log any connection errors
    console.error('Failed to connect to MongoDB:', error);
    throw error;
  }
};