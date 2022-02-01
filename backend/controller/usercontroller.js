const registermodel = require('../db/RegisterSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const jwtSecret = "ddsfftyy677yttfff";
const nodemailer = require('nodemailer')
const otpmodel = require("../db/otpSchema");
let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'kameshrane99@gmail.com',
        pass: ''
    }
});

function autenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token)
    if (token == null) {
        res.json({ "err": 1, "msg": "Token not match" })
    }
    else {
        jwt.verify(token, jwtSecret, (err, data) => {
            if (err) {
                res.json({ "err": 1, "msg": "Token incorrect" })
            }
            else {
                console.log("Match")
                next();
            }
        })
    }
}


const usercontroller = {

    register: async (req, res) => {
        console.log(req.body)

        let name = req.body.name;
        let lname = req.body.lname;
        let email = req.body.email;
        let password = req.body.password;

        let mobile = req.body.mobile;
        let gender = req.body.gender

        const passwordHash = await bcrypt.hash(password, 10)
        let ins = new registermodel({ name: name, lname: lname, email: email, password: passwordHash, mobile: mobile, gender: gender });
        await ins.save((err) => {
            if (err) {
                res.json({ "err": "Please fill the form" })
            } else {
                res.json({ "msg": "Details added successfully !!" })
            }

        })
    },

    login: async (req, res) => {
        console.log(req.body)
        let email = req.body.email;
        let password = req.body.password;
        const user = await registermodel.findOne({ email: email })
        console.log(user)
        const isMatch = await bcrypt.compare(password, user.password)
        console.log(isMatch)

        if (email === user.email && isMatch) {
            let payload = {
                uid: email
            }
            const token = jwt.sign(payload, jwtSecret, { expiresIn: 3600009 })
            res.status(200).json({ "msg": "Login Successfull", "token": token })
        }
        else if (!email) {
            res.json({ err: 'You must enter an email address.' }).status(400);
        }
        else if (!password) {
            res.json({ err: 'You must enter a password.' }).status(400);
        }
        else {
            res.json({ "err": "Please Enter valid credintails" }).status(400)
        }



    },

    sociallogin: async (req, res) => {
        console.log(req.body)

        let name = req.body.name;
        let lname = req.body.lname;
        let email = req.body.email;
        let password = "123456789";

        let mobile = req.body.mobile;
        let gender = req.body.gender
        const passwordHash = await bcrypt.hash(password, 10)
        registermodel.findOne({ email: req.body.email }).exec((err, data) => {
            if (err) {
                res.json({ "msg": "Somethong Went Wrong" }).status(400)
            }
            else if (data == null) {
                let ins = new registermodel({ name: name, lname: lname, email: email, password: passwordHash, mobile: "9888776655", gender: "male" });
                ins.save((err) => {
                    if (err) { res.json({ "msg": "Somethong Went Wrong" }) }
                    else {
                        let payload = {
                            uid: email
                        }
                        const token = jwt.sign(payload, jwtSecret, { expiresIn: 3600009 })
                        res.status(200).json({ "msg": "Login Successfull", "token": token })
                        // res.status(200).json({ "msg": "Login Success" })
                    }
                })
            }
            else {
                res.status(200).json({ "msg": "This Is A Email Registered For Login " })
            }
        })

    },


    forgotemail: async (req, res) => {
        let data = await registermodel.findOne({ email: req.body.email });
        if (data) {
            let otpcode = Math.floor((Math.random() * 10000) + 1);
            let otpdata = new otpmodel({
                email: req.body.email,
                code: otpcode,
                expiresIn: new Date().getTime() + 300 * 1000

            })
            otpdata.save((e) => {
                if (e) {
                    res.json({ "err": 1, "msg": "Something went wrong in adding data" }).status(400)
                }
                else {
                    res.status(200).json({ "err": 0, "msg": "OTP sent to your email. Please check it !" })
                }
            })
            let mailDetails = {
                from: 'kameshrane99@gmail.com',
                to: 'kameshrane99@gmail.com',
                subject: 'Your OTP for password reset',
                text: '...',
                html: `<!DOCTYPE html>
        <html>
        <head>
        </head>
        <body>
        <h1>Here is your OTP :${otpdata.code} for Password Reset</h1>
        </body>
        </html> `
            };

            mailTransporter.sendMail(mailDetails, function (err, data) {
                if (err) {
                    console.log('Error Occurs');
                } else {
                    console.log('Email sent successfully');
                }
            });
        }
        else {
            res.json({ "err": 1, "msg": "Email id doesn't exist" }).status(400)
        }
    },

    changepass: async (req, res) => {
        let data = await otpmodel.findOne({ email: req.body.email, code: req.body.code });
        if (data) {
            let currentTime = new Date().getTime();
            let diff = data.expiresIn - currentTime;
            if (diff < 0) {
                res.json({ "err": 1, "msg": " Token Expires" }).status(400);
            }
            else {
                let user = await registermodel.findOne({ email: req.body.email })
                if (user) {

                    user.password = req.body.password
                    const salt = await bcrypt.genSalt(10);
                    let hashpassword = await bcrypt.hash(user.password, salt);
                    user.password = hashpassword;
                    user.save();
                    user.save();
                    res.status(200).json({ "err": 0, "msg": "Password Changed Successfully !" });
                }
                else {
                    console.log("Something went wrong :(")
                }
            }
        }
        else {
            res.send("Enter Correct OTP ")
        }
    }
}
module.exports = usercontroller

