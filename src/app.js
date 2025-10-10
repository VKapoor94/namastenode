const express = require('express')
const app =express();

app.use("/",(req,res)=>{
    res.send("hello world  ss")
})

app.use('/test',(req,res)=>{
    res.send("test")
})
app.listen(3000,()=>{
    console.log("listening at 3000")
})