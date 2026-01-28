// import mongoose from "mongoose";
// import { trim } from "validator";
// import isEmail from "validator/lib/isEmail.js";

// const userSchema=new mongoose.Schema({
//     mame:{
//         type: String,
//         required: true,
//         trim: true
//     },
    
//     email:{
//         type: String,
//         required:  true,
//         unique: true,
//         lowercase: true,
//         trim: true
//     },
//     password:{
//         type: String,
//         required: true
//     },
// },{
//     timestamps:true
// });

// export default mongoose.modles.User || mongoose.model('User',userSchema); 

import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: (value) => validator.isEmail(value),
        message: "Invalid email format",
      },
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User || mongoose.model("User", userSchema);