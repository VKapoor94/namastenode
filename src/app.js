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
    }
    res.send("Done")
})
connectDB().then(()=>{
    console.log("Successfull")
}).catch(()=>{
    console.error("Error")
})




