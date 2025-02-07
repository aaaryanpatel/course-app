const { Router } = require('express');
const JWT_ADMIN_PASSWORD = "aladld1234";
const jwt = require('jsonwebtoken')
const adminRouter = Router();
const { adminModel } = require('../db');


adminRouter.post("/signup", async function (req, res) {
    const {email , password, firstName, lastName} = req.body;
    // TODO: zod validation
    // TODO: hash the password so plaintext pw is not stored in the db
    // TODO: Put inside a try catch

    await adminModel.create({
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName

    });


    res.json({
        message: "Signup successed"
    })
})
adminRouter.post("/signin", async function (req, res) {
    const { email , password } = req.body;

    // TODO: ideally password should be hashed and hence you cant compare the user provided password and the database password 
    const user = await adminModel.findOne({
        email: email,
        password: password
    });

    if (user) {
        const token = jwt.sign({
            id: user._id 
        }, JWT_ADMIN_PASSWORD)

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

adminRouter.post("/course", function (req, res) {
    res.json({
        message: "signup endpoint"
    })
})

adminRouter.put("/", function (req, res) {
    res.json({
        message: "signup endpoint"
    })
})

adminRouter.get("/course/bulk", function (req, res) {
    res.json({
        message: "signup endpoint"
    })
})

module.exports = {
    adminRouter: adminRouter
}