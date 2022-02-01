
const jwt = require('jsonwebtoken')
const jwtSecret = "ddsfftyy677yttfff";
const ordersmodel = require('../db/OrdersSchema')
function autenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token)
    if (token == null) {
        res.json({ "err": 1, "msg": "Token not match" }).status(400);
    }
    else {
        jwt.verify(token, jwtSecret, (err, data) => {
            if (err) {
                res.json({ "err": 1, "msg": "Token incorrect" }).status(400);
            }
            else {
                console.log("Match")
                next();
            }
        })
    }
}


const ordercontroller = {

    carddetails: (req, res) => {
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

    },

    cardaddress: (req, res) => {

        let email = req.body.email;

        ordersmodel.updateOne({ email: email, Orderno: req.body.orderno }, { $set: { "selectaddr": req.body.selectaddr } }, (err) => {
            if (err) res.json({ err: err });
            res.status(200).json({ msg: "ORDER PLACED" });
        })
    },

    getorder: (req, res) => {
        let email = req.params.email;
        ordersmodel.find({ email: email }, (err, data) => {
            console.log(data)
            if (err) {
                throw err;
            }

            res.status(200).json({ user: data, "err": 0 })
        })
    },

    getinvoice: (
        autenticateToken, (req, res) => {
            let orderno = req.params.orderno;
            ordersmodel.find({ Orderno: orderno }, (err, data) => {
                if (err) {
                    throw err;
                }
                res.status(200).json({ orderdetail: data, "err": 1 })
            })

        }),
    fetchorders: (
        (req, res) => {
            ordersmodel.find({}, (err, data) => {
                if (err) throw err;
                res.status(200).json({ "err": 0, 'data': data })
            })
        })


}
module.exports = ordercontroller

