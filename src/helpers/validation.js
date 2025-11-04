
import  validator  from 'validator';

export const validateSignUpData=(req)=>{
    const {firstName, lastName, emailId , password} =req.body;
    if(!firstName || !lastName){
        throw new Error("Firtname and lastname reuired")
    }else if(firstName.length<4 || firstName.length>50){
                throw new Error("Firtname incorrect")
    }
    else if(!validator.isEmail(emailId)){
                        throw new Error("email incorrect")
    }
   }

   export const validateEditProfileData =(req)=>{
    const allowedEditFields = ["firstName","lastName","emailId","photoUrl","gender","age","about","skills"]
   const isEditAllowed = Object.keys(req.body).every((field)=>allowedEditFields.includes(field))
   console.log(isEditAllowed)
return isEditAllowed   
}