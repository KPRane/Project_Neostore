const router = require('express').Router()
const ordercontroller = require('../controller/ordercontroller')

router.post('/carddetails', ordercontroller.carddetails)
router.post('/cardaddress', ordercontroller.cardaddress)
router.get("/getorder/:email", ordercontroller.getorder)

router.get("/getinvoice/:orderno", ordercontroller.getinvoice)
router.get("/fetchorders", ordercontroller.fetchorders)





module.exports = router