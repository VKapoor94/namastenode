const express = require('express')
const app =express();

app.listen(3000,()=>{
    console.log("listening at 3000")
})

app.use('/user',[(req,res,next)=>{
   console.log("Handling user 1")
    next()
   // res.send("send 1")
    
},(req,res,next)=>{
    console.log("Handling user 2")
    //res.send("send 2")
    next()
},
(req,res,next)=>{
    console.log("Handling user 2")
    //res.send("send 3")
    next()
},
(req,res)=>{
    console.log("Handling user 2")
    res.send("send 4")
}])

