import mongoose from "mongoose";

const url = "mongodb://localhost:27017/postaway";
export const connectUsingMongoose = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Mongodb using mongoose is connected ");
  } catch (err) {
    console.log(err);
  }
};
