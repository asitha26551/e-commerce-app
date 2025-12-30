import mongoose from "mongoose";

const connectDB = async () => {
    mongoose.connection.on('connected', () => {
        console.log("DB connected");
    });

    try {
        await mongoose.connect(`${process.env.MONGODB_URI}e-commerce`);
        console.log("MongoDB connection successful");
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        process.exit(1);
    }
}

export default connectDB;
