const registermodel = require('../db/RegisterSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const jwtSecret = "ddsfftyy677yttfff";



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



const profilecontroller = {

    userprofile: (req, res, next) => {
        console.log(req.file.filename);
        const url = "http://192.168.2.12:8080/public/" + req.file.filename;



        registermodel.updateOne({ email: req.params.user }, { $set: { "profileImg": url } }, (err, data) => {
            if (err) throw err;
            if (data.matchedCount == 1) {

                res.status(200).json({ "err": 0, "msg": "Profile Picture Uploaded" })

            }
            else {
                res.json({ "err": 1, "msg": "Email is not Matching with Database" }).status(400)
            }
        })

    },

    getmulter: (req, res) => {
        let email = req.params.email;
        registermodel.findOne({ email: email }, (err, data) => {

            if (data.profileImg == "") {

                res.json({ "err": 1, "msg": "No Image Found" }).status(400)
            }
            else {

                res.json({ "err": 0, "msg": "Profile Pic found", "data": data })

            }
        })


    },

    addaddress: (req, res) => {
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
    },

    editaddress: (req, res) => {
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
    }
    ,
    deleteadd: (req, res) => {
        let id = req.params.id;
        registermodel.deleteOne({ _id: id }, (err) => {
            if (err) throw err;
            res.status(200).json({ msg: "Do you want to delete" })
        })
    }
    ,
    changepass: async (req, res) => {
        let id = req.params.id;
        let password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        let hashpassword = await bcrypt.hash(password, salt);

        registermodel.updateOne({ _id: id }, { $set: { password: hashpassword } }, (err) => {
            if (err) res.json({ err: err });
            res.status(200).json({ msg: "Password Updated Succesfully" });
        })
    },
    updprofile: (req, res) => {
        let id = req.params.id;
        let name = req.body.name;
        let lname = req.body.lname;
        let email = req.body.email;
        let phone = req.body.moblie;
        console.log(name)
        // let password = req.body.password;
        registermodel.updateOne({ _id: id }, { $set: { name: name, lname: lname, email: email, phone: phone } }, (err) => {
            if (err) res.json({ err: err });
            res.status(200).json({ msg: "Userprofile has Updated Succesfully" });
        })
    }
    ,
    profile: (autenticateToken, (req, res) => {
        let email = req.params.email;
        registermodel.findOne({ email: email }, (err, data) => {
            if (err) res.json({ err: err })
            res.json({ user: data })
            // res.json({ user: data, address: data.Address })
        })
    })
    ,

    getaddress: (autenticateToken, (req, res) => {
        let email = req.params.email;
        registermodel.findOne({ email: email }, (err, data) => {
            if (err) res.json({ err: err })

            res.json({ address: data.Address })
        })
    })
}
module.exports = profilecontroller

