import jwt from 'jsonwebtoken';
import  { userModel } from '../models/users.js';
export const auth =async(req,res,next)=>{
  try{
const {token} =  req.cookies;
if(!token){
    throw new Error("Token not found")
}
  const decodedObj = await jwt.verify(token, "DEVTINER$720")
  const {_id} =decodedObj;
  const user=await userModel.findById(_id);
  if(!user){
    throw new Error("Error getting user");
  }
  req.user = user
  next()

  }catch(err){
    res.status(400).send("User not found")
  }
}