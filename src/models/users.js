import mongoose from "mongoose";
import validator from 'validator'
import jwt from'jsonwebtoken'
import bcrypt from 'bcrypt'
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
            if(!validator.isStrongPassword(value)){
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

userSchema.methods.getJWT = async function (){
    const user = this;
            const token = await jwt.sign({ _id: user._id},"DEVTINER$720",{expiresIn:'1d'})
        return token
}

userSchema.methods.validatePassword =async function (passwordInputByUser) {
    const user =this;
        const isPasswrodValid = bcrypt.compare(passwordInputByUser, user.password)
        return isPasswrodValid;
}

export const userModel = mongoose.model("user",userSchema)