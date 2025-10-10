const express = require('express')
const app =express();

app.use('/test/2',(req,res)=>{
    res.send("test2")
})

app.use('/test',(req,res)=>{
    res.send("test")
})
app.listen(3000,()=>{
    console.log("listening at 3000")
})

app.get('/user',(req,res)=>{
    res.send("User data")
})

app.post('/user',(req,res)=>{
    res.send("data saved")
})

app.delete('/user',(req,res)=>{
    res.send("delete")
})

app.put('/user',(req,res)=>{
    res.send("put call")
})
// app.use("/",(req,res)=>{
//     res.send("hello world  ss")
// })