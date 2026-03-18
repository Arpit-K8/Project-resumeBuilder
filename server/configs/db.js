import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("Mongoose connected to DB");
    });
    let mongodbURI = process.env.MONGODB_URI;
    const projectName = "resume-builder";

    if (!mongodbURI) {
      throw new Error("MONGODB_URI is not defined in environment variables");
    }

    if(mongodbURI.includes("<password>")){
      const password = process.env.MONGODB_PASSWORD;
        if(!password){
            throw new Error("MONGODB_PASSWORD is not defined in environment variables");
        }
        mongodbURI = mongodbURI.replace("<password>", password);
    }

    if(mongodbURI.endsWith("/")){
      mongodbURI = mongodbURI.slice(0, -1);
    }

    await mongoose.connect(`${mongodbURI}/${projectName}`);

  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default connectDB;