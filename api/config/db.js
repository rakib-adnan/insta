import mongoose  from "mongoose";

//? Connect to MongoDB
const mongoDBConnect = async () => {

    try {
        const connection = await mongoose.connect( process.env.MONGO_STRING);
        console.log(`MongoDB is connected: ${connection.connection.host}`.bgMagenta.black);

    }catch(error){
        console.log(error);
    }
}
//? Export mongoDBConnect
export default mongoDBConnect;