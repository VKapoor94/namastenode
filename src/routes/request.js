import express from 'express'
export const requestRouter = express.Router();
import { auth } from '../middlewares/auth.js'
import { connectionRequestModel } from '../models/connectionRequest.js';
import { userModel } from '../models/users.js';

requestRouter.post("/request/send/:status/:toUserId", auth, async (req, res) => {
    try {
        const fromUserId = req.user._id;
        const toUserId =req.params.toUserId;
        const status =req.params.status;

        const ALLOWED_STATUS = ["ignored","interested"]
        if(!ALLOWED_STATUS.includes(status)){
            return res.status(400).send({
                message:'invalid status value'+status
            })
        }

        const toUser = await userModel.findById(toUserId);
        if(!toUser){
            return res.status(400).send("User not preent")
        }

        //if existing connection request
        const existingConnection = await connectionRequestModel.findOne({
            $or:[
                {fromUserId,toUserId},
                {fromUserId:toUserId,toUserId:fromUserId}
            ],
            fromUserId:fromUserId,
            toUserId:toUserId
        })
        if(existingConnection){
            return res.status(400).send({
                message:"Connection request already exist"
            })
        }
        const connectionRequest = new connectionRequestModel({
            fromUserId,
            toUserId,
            status
        })
       const data = await connectionRequest.save()
      return res.send({
        message:"Connection request successfully",
        data
       })


    } catch (err) {
      return  res.status(400).send(err.message)
    }


})

requestRouter.post("/request/review/:status/:requestId", auth, async (req, res) => {
   try{
    const loggedInUser =req.user;
    const requestId =req.params.requestId;
    const status = req.params.status;
     const ALLOWED_STATUS = ["accepted","rejected"]
        if(!ALLOWED_STATUS.includes(status)){
            return res.status(400).send({
                message:'invalid status value'+status
            })
        }

        const toUser = await connectionRequestModel.findById({_id:requestId,toUserId:loggedInUser._id,status:'interested'});
        if(!toUser){
            return res.status(400).send("User not preent")
        }
        toUser.status = status;
      const data =  await toUser.save()
      res.send({message:"Connection request "+status})
 
   }catch(err){
    res.status(400).send("Error")
   }
   
})


