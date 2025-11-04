import mongoose from 'mongoose'

const connectionRequest = new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    status:{
        type:String,
        enum:{
            values:["ignored","interested","accepted","rejected"],
            message:'{VALUE} is incorrect'
        }
    }
},{
    timestamps:true
})

connectionRequest.pre("save",function (next){
    const connectionRequest =this;
    console.log("preeeeeeee")
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("Connot send connection requredt to yourself")
    }
    next()
})

connectionRequest.index({fromUserId:1,toUserId:1})
export const connectionRequestModel = mongoose.model("connectionRequest",connectionRequest)