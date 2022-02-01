const router = require('express').Router()
const usercontroller = require('../controller/usercontroller')
const jwt = require('jsonwebtoken');
const jwtSecret = "abcdefghijklmnopqrstuvwxyz";

router.post('/adduser', usercontroller.register)
router.post('/login', usercontroller.login)
router.post("/socialloginuser", usercontroller.sociallogin)

router.put("/changepassword", usercontroller.changepass)

router.post("/forgetemail", usercontroller.forgotemail)

function autenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token)
    if (token == null) {
        res.json({ "err": "Token not match" })
    }
    else {
        jwt.verify(token, jwtSecret, (err, data) => {
            if (err) {
                res.json({ "err": "Token incorrect" })
            }
            else {
                res.json({ "msg": " Token Matched" })
                next();
            }
        })
    }
}

router.get('/loginfirst', autenticateToken, (req, res) => {
    res.json({ "msg": "Token correct " })

})


module.exports = router