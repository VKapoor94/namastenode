const express = require('express');
const { connectDB } = require('./config/database');
const cookieParser = require('cookie-parser')
const {authRouter} =require('./routes/auth')
const {profileRouter} =require('./routes/profile')
const {requestRouter} =require('./routes/request')
const app = express();


app.use(express.json())

app.use(cookieParser())

app.use("/",authRouter)
app.use("/",profileRouter)
app.use("/",requestRouter)

app.listen(3000, () => {
    console.log("listening at 3000")
})


connectDB().then(() => {
    console.log("Successfull")
}).catch((err) => {
    console.error("Error", err)
})




