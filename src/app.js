const express = require('express');
const { auth } = require('./middlewares/auth');
const {connectDB} = require('./config/database');
const { userModel } = require('./models/users');
const app =express();

app.use(express.json())
app.listen(3000,()=>{
    console.log("listening at 3000")
})

app.post('/signup',async(req,res)=>{
    const user =req.body;
    console.log("Hello")
    const userM = new userModel(user)
    try{
        await userM.save()
    }catch(err){
        res.status(400).send("error",err.message)
        return
    }
    res.send("Done")
})

app.patch('/user',async(req,res)=>{
    const data =req.body.userId;
    const reqBody = req.body
    const ALLOWEDUPDATES =[
        "photoUrl","about","gender","age","userId"
    ]

    const isUpdatesAllowed = Object.keys(reqBody).every((k)=>{
        ALLOWEDUPDATES.includes(k)
    })

    if(!isUpdatesAllowed){
        throw new Error("Update not allowed")
    }
    try{
        const user = await userModel.findByIdAndUpdate(data,req.body,{returnDocument:"after"})
        console.log(user)
    res.send("done",user)
    }catch(error){
        res.send("error")
    }
    
})
app.delete('/deleteUser', async (req, res) => {
    try {
      const user = await userModel.findByIdAndDelete(req.body.userId);
  
      if (!user) {
        return res.status(404).send('User not found');
      }
  
      res.status(200).send({ message: 'User deleted successfully', user });
    } catch (err) {
      console.error(err);
      res.status(400).send('Error deleting user');
    }
  });
  
app.get("/getUser",async(req,res)=>{
    const email = req?.body?.email
    try{
        const returnedres = await userModel.findOne({emailId:email})
        if(returnedres.length===0){
            res.status(404).send("User not found")
        }
        else{
            res.send(returnedres)
        }
    }catch(err){
        res.status(400).send("Something went wrong")
    }
    
})

app.get('/feed',async(req,res)=>{
    try{
        const returnedres = await userModel.find({})
        if(returnedres.length===0){
            res.status(404).send("User not found")
        }
        else{
            res.send(returnedres)
        }
    }catch(err){
        res.status(400).send("Something went wrong")
    }
})
connectDB().then(()=>{
    console.log("Successfull")
}).catch((err)=>{
    console.error("Error",err)
})




