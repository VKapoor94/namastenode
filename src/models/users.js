import mongoose from "mongoose";
import validator from 'validator'
const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:3
    },
    lastName :{
        type:String,
        required:true
    }, emailId:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email not valid")
            }
        }
    },
    password :{
        type:String,
        required:true,
        validate(value){
            if(validator.isStrongPassword(value)){
                throw new Error("Validate failed password not strong")
            }
        }
       
    },
   age: {
    type: Number,
    min: 18,
  
  },
  gender: {
    type: String,
    validate(value) {
      if (!["male", "female", "Others"].includes(value)) {
        throw new Error("Gender must be male, female, or Others");
      }
    }
    },
    photoUrl:{
        type:String,
        validate(value){
            if(validator.isURL(value)){
                throw new Error("Errror ")
            }
        }
    },
    about:{
        type:String,
           default: 'This si s'
    },
    skills:{
        type:[String],
        validate(value){
            if(value.length>4){
                throw new Error("only 4 skills")
            }
        }
    }

},
{
    timestamps:true
}

)

export const userModel = mongoose.model("user",userSchema)