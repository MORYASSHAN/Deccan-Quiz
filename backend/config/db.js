import mongoose from 'mongoose';

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://itsmoryasshan_db_user:quizapp123@cluster0.pf9wjzp.mongodb.net/QuizApp')
    .then(()=>{console.log("DB CONNECTED")})
}
     
/*  first import the mongoose from mongoose 
create the function of async await to connect db
*/