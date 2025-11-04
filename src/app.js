const express = require('express');
const { auth } = require('./middlewares/auth');
const { connectDB } = require('./config/database');
const { userModel } = require('./models/users');
const { validateSignUpData } = require('./helpers/validation');
const validator = require("validator")
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const app = express();

app.use(express.json())

app.use(cookieParser())
app.listen(3000, () => {
    console.log("listening at 3000")
})

app.post('/signup', async (req, res) => {
    //Validation of data
    try {
        validateSignUpData(req)
        const passwordHash = await bcrypt.hash(req.body.password, 10)
        const { firstName, lastName, emailId, password } = req.body;

        //emcrypt password

        const user = req.body;
        console.log("Hello")
        const userM = new userModel({
            firstName, lastName, emailId, password: passwordHash
        })
        try {
            await userM.save()
        } catch (err) {
            res.status(400).send("error", err.message)
            return
        }
        res.send("Done")
    } catch (err) {
        res.status(400).send("error", err.message)
        console.log(err)
    }
})

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        if (!validator.isEmail(email)) {
            throw new Error("Not va;lid email")
        }
        const user = await userModel.findOne({ emailId: email })
        if (!user) {
            throw new Error("Email not present")
        }
        const isPasswrodValid = bcrypt.compare(password, user.password)
        if (isPasswrodValid) {
            //create a jwt token
            //send in cookies
            const token = await jwt.sign({ _id: user._id},"DEVTINER$720",{expiresIn:'1d'})
            console.log(token)
            res.cookie("token", token)
            res.send("Login successfully")
        } else {
            res.send("Password is not correct")
        }
    } catch (err) {
        res.send("Invalid creds")
        console.log(err)
    }
})

app.get("/profile",auth, async (req, res) => {
  try{
    res.send(req.user)
  }catch(err){
    console.log(err)
  }
 
})

app.post("/sendConnectionRequest",auth,async(req,res)=>{
    console.log("sendConnectionRequest");
    res.send(req.user)
})
connectDB().then(() => {
    console.log("Successfull")
}).catch((err) => {
    console.error("Error", err)
})




