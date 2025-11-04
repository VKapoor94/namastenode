import express from 'express'
export const profileRouter = express.Router();
import{ auth }from '../middlewares/auth.js'
import { validateEditProfileData } from '../helpers/validation.js';



profileRouter.get("/profile/view",auth, async (req, res) => {
  try{
    res.send(req.user)
  }catch(err){
    console.log(err)
  }
 
})

profileRouter.patch("/profile/edit",auth,async(req,res)=>{
    try{
        if(!validateEditProfileData(req)){
            throw new Error("Cant update profile")
        }
        const loggedInUser =req.user;
        Object.keys(req.body).forEach((key)=>{
            loggedInUser[key]= req.body[key]

        })
        console.log("logged in user",loggedInUser)
        await loggedInUser.save()
        res.send({data:loggedInUser})
    }catch(err){
        console.log(err)
res.send(400).send("Error")
    }
})
