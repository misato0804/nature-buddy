import mongoose from "mongoose";

const connectDB = async () => {
    const url = process.env.MONGODB_URI as string;
    try {
        const connect = await mongoose.connect(url);
        console.log(`mongoose connected: ${connect.connection?.host}`)
    } catch (e: any) {
        console.log(e)
        process.exit(1)
    }
}

export default connectDB;