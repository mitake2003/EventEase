import mongoose from "mongoose";

const connectdb = async () => {
    try {
        const dbInstance = await mongoose.connect(process.env.MONGODB_URL);
        console.log("DB Connected Successfull ", dbInstance.connection.host);
    } catch(err) {
        console.log("DB Connection Failed !!! ", err);
    }
};

export { connectdb };