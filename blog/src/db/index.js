import mongoose from 'mongoose';
import { DB_NAME } from '../constents.js';

const connectBD= async () =>{
    try {
        console.log('Connecting to',process.env.MONGODB_URI)
     const dbconnection=   await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
      console.log("The connection is established and host is",dbconnection.connection.host);
    } catch (error) {
        console.log("MONGO DB Connection Failed ", error);
        process.exit(1);
    }
}

export default connectBD;