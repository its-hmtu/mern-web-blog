import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI)
    console.log(`MongoDB Connected: ${connect.connection.host}`)
  } catch(e) {
    console.error(`Error ${e.message}`)
    process.exit(1)
  }
}

export default connectDb;