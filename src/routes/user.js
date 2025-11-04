import  express from "express"
export const userRouter = express.Router()
import{ auth }from '../middlewares/auth.js'
import { connectionRequestModel } from '../models/connectionRequest.js';
import { userModel } from "../models/users.js";

const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills"

//get pending request
userRouter.get("/users/requests/received", auth, async (req, res) => {
    try{
        const loggedInUser =req.user;
        const connectionRequest = await connectionRequestModel.find({
            toUserId:loggedInUser._id,
            status:"interested"
        }).populate("fromUserId",["firstName","lastName"])
        res.json({message:"Data fetched successfully",data:connectionRequest})

    }catch(err){
        res.status(400).send("")
    }
})

userRouter.get("/users/connections", auth, async (req, res) => {
    try{
        console.log("kdkdk")
        const loggedInUser =req.user;
        const connectionRequest = await connectionRequestModel.find({
            $or:[
                {toUserId:loggedInUser._id,status:'accepted'},
                {fromUserId:loggedInUser._id,status:'accepted'}
            ]
        }).populate("fromUserId",USER_SAFE_DATA)
        .populate("toUserId",USER_SAFE_DATA)

        const data =connectionRequest.map((row)=>{
            if(row.fromUserId._id.toString() ===loggedInUser._id.toString()){
               return row.toUserId
            }
            return row.fromUserId;
        })

        res.json({message:"Data fetched successfully",data})



    }catch(err){
     console.log(err)
        res.status(400).send(err)
    }
})

userRouter.get("/feed", auth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const page = parseInt(req.query.page) || 1;  // default page = 1
    let limit = parseInt(req.query.limit) || 10; // default limit = 10
    if(limit>50){
        limit=50
    }
    const skip = (page - 1) * limit;

    // Find all connection requests involving the logged-in user
    const connectionRequest = await connectionRequestModel.find({
      $or: [
        { fromUserId: loggedInUser._id },
        { toUserId: loggedInUser._id }
      ]
    }).select("fromUserId toUserId");

    // Hide users already connected or requested
    const hideUserFromfeed = new Set();
    connectionRequest.forEach((req) => {
      hideUserFromfeed.add(req.fromUserId.toString());
      hideUserFromfeed.add(req.toUserId.toString());
    });

    // Fetch users excluding self and hidden ones with pagination
    const users = await userModel.find({
      $and: [
        { _id: { $nin: Array.from(hideUserFromfeed) } },
        { _id: { $ne: loggedInUser._id } }
      ]
    })
      .select(USER_SAFE_DATA)
      .skip(skip)
      .limit(limit);

    // Count total for pagination info
    const totalUsers = await userModel.countDocuments({
      $and: [
        { _id: { $nin: Array.from(hideUserFromfeed) } },
        { _id: { $ne: loggedInUser._id } }
      ]
    });

    res.send({
      data: users,
      pagination: {
        total: totalUsers,
        page,
        limit,
        totalPages: Math.ceil(totalUsers / limit)
      }
    });

  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
});
