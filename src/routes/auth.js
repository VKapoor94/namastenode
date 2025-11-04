import express from 'express'
import { validateSignUpData } from '../helpers/validation.js';
import bcrypt from 'bcrypt'
import { userModel } from '../models/users.js';
import validator from 'validator'
export const authRouter = express.Router();


authRouter.post('/signup', async (req, res) => {
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



authRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        if (!validator.isEmail(email)) {
            throw new Error("Not va;lid email")
        }
        const user = await userModel.findOne({ emailId: email })
        if (!user) {
            throw new Error("Email not present")
        }
        const isPasswrodValid =user.validatePassword(password)
        if (isPasswrodValid) {
            //create a jwt token
            //send in cookies
            const token = await user.getJWT();
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


authRouter.post("/logout",async(req,res)=>{
    res.cookie("token",null,{expires: new Date(Date.now())})
    res.send("Logout successfull")
})

