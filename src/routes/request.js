import express from 'express'
export const requestRouter = express.Router();
import {auth} from '../middlewares/auth.js'

requestRouter.post("/sendConnectionRequest",auth,async(req,res)=>{
    console.log("sendConnectionRequest");
    res.send(req.user)
})

