import mongoose from "mongoose";

export const db = mongoose.connection;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.LOCAL_MONGO_URI, {
      // must add in order to not get any error masseges:
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(`mongo database is connected!!! ${conn.connection.host} `);
  } catch (error) {
    console.error(`Error: ${error} `);
    process.exit(1); // passing 1 - will exit the proccess with error
  }
};

export default connectDB;

// Models
// require('./categoryModel')
// require('./userModel')
// require('./contactModel')