import mongoose from 'mongoose';

export const connectDB = async () => {
    await mongoose.connect(`${process.env.MONGODB_URI}`)
        .then(() => { console.log("DB CONNECTED") })
}

/*  first import the mongoose from mongoose 
create the function of async await to connect db
*/