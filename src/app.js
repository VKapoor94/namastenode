const express = require('express');
const { auth } = require('./middlewares/auth');
const app =express();

app.listen(3000,()=>{
    console.log("listening at 3000")
})


app.use('/admin',(req,res,next)=>{
    let token ="xyzww"
    if(!token=="xyz"){
        res.status(401).send("unauthorized")  
    }
    else{
        next()
       }
   
})

app.get('/admin/getData',auth,(req,res)=>{
    //logic of fetching all dd
    res.send("admin")

})

app.get('/admin/deleteUser',(req,res)=>{
    //logic of fetching all dd
    res.send("admin delete")
})


app.use('/user',[(req,res,next)=>{
    console.log("Handling user 1")
     res.send("send 1")
     
 }])
