// const express = require('experss');
// const Router = express.Router;
// or below 
const { Router } = require('express');
const { userModel } = require('../db');
const userRouter = Router();
const jwt = require('jsonwebtoken');
//
const { JWT_USER_PASSWORD } = require('../config');

userRouter.post("/signup", async function (req, res) {
    const {email , password, firstName, lastName} = req.body;// TODO: zod validation
    // TODO: hash the password so plaintext pw is not stored in the db
    // TODO: Put inside a try catch

    await userModel.create({
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName

    });


    res.json({
        message: "Signup successed"
    })
})
userRouter.post("/signin", async function (req, res) {

    const { email , password } = req.body;

    // TODO: ideally password should be hashed and hence you cant compare the user provided password and the database password 
    const user = await userModel.findOne({
        email: email,
        password: password
    });

    if (user) {
        const token = jwt.sign({
            id: user._id 
        }, JWT_USER_PASSWORD)

        // can do the cookie logic
        res.json({
            token: token
        })
    } else {
        res.status(403).json({
            message: "Incorrect credentials"
        });
    }
})

userRouter.get("/purchases", function (req, res) {
    res.json({
        message: "Signup endpoint"
    })
})


module.exports = {
    userRouter: userRouter
}