import mongoose from "mongoose";

const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://ozkanoglusude:h3cZWTJbo7NjztNo@cluster1.famc9hj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1"
    )
    .then(() => console.log("MongoDB connected successfully"));
};

export default connectDB;
