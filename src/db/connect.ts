import mongoose from "mongoose";

const connectDB = async (uri: string) => {
	mongoose.set("strictQuery", true);
	return mongoose.connect(uri);
};

export default connectDB;
