const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const jwt = require("jsonwebtoken");
const jwtSecret = "wewr32vsdfgswfwr2343ert";
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require("bcrypt");
// const fs=require('fs')
//dbconnection 
const nodemailer = require('nodemailer');

const db = "mongodb://localhost:27017/Neostore";
const connectDB = async () => {
    try {
        await mongoose.connect(db, { useNewUrlParser: true });
        console.log("MongoDB connected")
    }
    catch (err) {
        console.log(err.message);
    }
}
connectDB();
//end
const productmodel = require('../db/productSchema')
const colormodel = require('../db/colorSchema')
const categorymodel = require('../db/categorySchema')

const ordersmodel = require('../db/OrdersSchema')
const registermodel = require('../db/RegisterSchema')
const otpmodel = require('../db/otpSchema')



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

const DIR = './public/';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});
router.post('/user-profile/:user', upload.single('profileImg'), (req, res, next) => {
    const url = "http://127.0.0.1:8080/public/" + req.file.filename;
    registermodel.updateOne({ email: req.params.user }, { $set: { "profileImg": url } }, (err, data) => {
        if (err) throw err;
        console.log(data);
        if (data.matchedCount == 1) {

            res.json({ "err": 0, "msg": "Profile Picture Uploaded" })

        }
        else {
            res.json({ "err": 1, "msg": "Email is not Matching with Database" })
        }
    })

})
router.get("/getmulter/:email", (req, res) => {
    let email = req.params.email;
    registermodel.findOne({ email: email }, (err, data) => {

        if (data.profileImg == "") {

            res.json({ "err": 1, "msg": "No Image Found" })
        }
        else {

            res.json({ "err": 0, "msg": "Profile Pic found", "data": data })

        }
    })
})

router.post("/adduser", async (req, res) => {
    // console.log(req.body)

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


})

let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'kameshrane99@gmail.com',
        pass: 'shaila20499'
    }
});

router.post("/login", async (req, res) => {
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
        res.json({ "msg": "Login Successfull", "token": token })
    }
    else if (!email) {
        res.json({ err: 'You must enter an email address.' });
    }
    else if (!password) {
        res.json({ err: 'You must enter a password.' });
    }
    else {
        res.json({ "err": "Please Enter valid credintails" })
    }


})


//checkout without login
router.get('/loginfirst', autenticateToken, (req, res) => {
    res.json({ "err": 0 })

})
router.get("/fetchpost", (req, res) => {


    productmodel.find({ "color_id": ["61cc0c7fde8b502a31b9e100", "61cc0c7fde8b502a31b9e0fe"] }).populate(["category_id", "color_id"])
        .then(product => {
            console.log(product);
            // res.send("Data Fetch")
            res.json({ product: product })
        })

})
//add address
router.post("/addaddress", (req, res) => {
    // let Address=[];
    console.log("address section")
    console.log(req.body)
    registermodel.find({ email: req.body.email }, (err, data) => {
        if (err) {
            res.json({ err: 1, 'msg': "Unable to Add Address" })
        }
        else {
            let email = req.body.email;
            let address = req.body.address;
            let pincode = req.body.pincode;
            let city = req.body.city;
            let state = req.body.state;
            let country = req.body.country;
            let update = req.body.update;
            // let Address=req.body.Address;
            // console.log(Address)
            let addressData = { Address_id: Math.random(), address: address, pincode: pincode, city: city, state: state, country: country }
            console.log(addressData)

            data[0].Address.push(addressData)

            registermodel.updateOne({ email: email }, { $set: { Address: data[0].Address } }, (err, data) => {
                if (err) {
                    res.json({ 'err': 1, "msg": "Address Not Added" })
                }
                else {
                    res.json({ "err": 0, "msg": "Address added successfully", user_details: data });
                    console.log(data.Address)
                }
            })
        }
    })
})

//edit address
router.post("/editaddress", (req, res) => {
    console.log("address edit section")
    console.log(req.body)
    registermodel.updateMany({}, { $set: { "Address.$[elem].address": req.body.address, "Address.$[elem].pincode": req.body.pincode, "Address.$[elem].city": req.body.city, "Address.$[elem].state": req.body.state, "Address.$[elem].country": req.body.country } }, { arrayFilters: [{ "elem.Address_id": req.body.Address_id }] }, (err, data) => {
        if (err) {
            console.log(err);
            res.json({ err: 1, 'msg': "unable to Update address" })
        }
        else {

            registermodel.find({ email: req.body.email }, (err, data) => {
                if (!data[0]) {
                    console.log('inside email not found');
                    res.json({ err: 1, "msg": "Unable to genrate jwt" })
                }
                else {
                    let payload = { uid: data }
                    const token = jwt.sign(payload, jwtSecret, { expiresIn: 360 })
                    res.status(200).json({ "err": 0, "msg": "Address Updated Successfully", "token": token })
                }
            })
        }
    })
})


//delete address
router.delete('/deleteadd/:Address._id', (req, res) => {
    let id = req.params.id;
    registermodel.deleteOne({ _id: id }, (err) => {
        if (err) throw err;
        res.json({ msg: "Do you want to delete" })
    })
})
//changepassword
router.put("/changepass/:id", async (req, res) => {
    let id = req.params.id;
    let password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    let hashpassword = await bcrypt.hash(password, salt);

    registermodel.updateOne({ _id: id }, { $set: { password: hashpassword } }, (err) => {
        if (err) res.json({ err: err });
        res.json({ msg: "Password Updated Succesfully" });
    })
})


//update profile
router.put('/updprofile/:id', (req, res) => {
    let id = req.params.id;
    let name = req.body.name;
    let lname = req.body.lname;
    let email = req.body.email;
    let phone = req.body.moblie;
    console.log(name)
    // let password = req.body.password;
    registermodel.updateOne({ _id: id }, { $set: { name: name, lname: lname, email: email, phone: phone } }, (err) => {
        if (err) res.json({ err: err });
        res.json({ msg: "Userprofile has Updated Succesfully" });
    })
})

router.get("/profile/:email", autenticateToken, (req, res) => {
    let email = req.params.email;
    registermodel.findOne({ email: email }, (err, data) => {
        if (err) res.json({ err: err })
        res.json({ user: data })
        // res.json({ user: data, address: data.Address })
    })
})//getaddress
router.get("/getaddress/:email", autenticateToken, (req, res) => {
    let email = req.params.email;
    registermodel.findOne({ email: email }, (err, data) => {
        if (err) res.json({ err: err })

        res.json({ address: data.Address })
    })
})
//checkout
router.post("/carddetails", (req, res) => {
    let field = {
        Orderno: req.body.orderno,
        email: req.body.email,
        items: req.body.items,

        total: req.body.total,
        // selectaddr: " "

    };
    console.log(field)
    let ins = new ordersmodel({ ...field });
    ins.save((err) => {
        if (err) {
            console.log(err)
            res.send("Error");
        } else {
            res.send({ flag: 1, msg: "Details Added" });


        }

    });
});
router.post("/cardaddress", (req, res) => {

    let email = req.body.email;

    ordersmodel.updateOne({ email: email, Orderno: req.body.orderno }, { $set: { "selectaddr": req.body.selectaddr } }, (err) => {
        if (err) res.json({ err: err });
        res.json({ msg: "ORDER PLACED" });
    })


});


//order data
router.get("/getorder/:email", (req, res) => {
    let email = req.params.email;
    ordersmodel.find({ email: email }, (err, data) => {
        console.log(data)
        if (err) {
            throw err;
        }

        res.json({ user: data, "err": 0 })
    })
})
//getinvoice
router.get("/getinvoice/:orderno", autenticateToken, (req, res) => {
    let orderno = req.params.orderno;
    ordersmodel.find({ Orderno: orderno }, (err, data) => {
        if (err) {
            throw err;
        }
        res.json({ orderdetail: data, "err": 1 })
    })
})
router.get("/fetchproduct", (req, res) => {

    productmodel.find().populate(["category_id", "color_id"])
        .then(product => {

            res.json({ product: product })
        })

})
router.get("/getcategory/:category_id&&:color_id", (req, res) => {

    if (req.params.category_id == "dummy") {
        productmodel.find({ color_id: req.params.color_id }).populate()
            .then(product => {

                res.json({ product: product })
            })
    }
    else if (req.params.color_id == "dummy") {
        productmodel.find({ category_id: req.params.category_id }).populate()
            .then(product => {

                res.json({ product: product })
            })
    } else {
        productmodel.find({ category_id: req.params.category_id, color_id: req.params.color_id }).populate()
            .then(product => {

                res.json({ product: product })
            })
    }

})

router.post("/forgetemail", async (req, res) => {
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
                res.json({ "err": 1, "msg": "Something went wrong in adding data" })
            }
            else {
                res.json({ "err": 0, "msg": "OTP sent to your email. Please check it !" })
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
        res.json({ "err": 1, "msg": "Email id doesn't exist" })
    }

})
router.put("/changepassword", async (req, res) => {
    let data = await otpmodel.findOne({ email: req.body.email, code: req.body.code });
    if (data) {
        let currentTime = new Date().getTime();
        let diff = data.expiresIn - currentTime;
        if (diff < 0) {
            res.json({ "err": 1, "msg": " Token Expires" });
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
                res.json({ "err": 0, "msg": "Password Changed Successfully !" });
            }
            else {
                console.log("Something went wrong :(")
            }
        }
    }
    else {
        res.send("Enter Correct OTP ")
    }
})



router.get("/fetchorders", autenticateToken, (req, res) => {
    ordersmodel.find({}, (err, data) => {
        if (err) throw err;
        res.json({ "err": 0, 'data': data })
    })

})
router.get("/singleproduct/:id", (req, res) => {
    let id = req.params.id

    productmodel.findOne({ _id: id })
        .populate("color_id")
        .then(product => {
            console.log(product);

            res.json({ product: product, err: "0", image: product.product_subimages })
            //   res.send("Data Fetch")
        })

})
//rating
router.put("/Rating/:id", (req, res) => {
    let id = req.params.id;
    let product_rating = req.body.newrating

    console.log(id)

    console.log(product_rating)
    console.log(req.body)

    productmodel.updateOne({ _id: id }, { $set: { product_rating: product_rating } }, (err) => {
        if (err) {
            res.json({ err: err })
        }
        else {
            res.json({ msg: "Rating Updated Succesfully" });
        }

    })
})



module.exports = router;