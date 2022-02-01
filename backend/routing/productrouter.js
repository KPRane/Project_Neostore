const router = require('express').Router()
const productcontroller = require('../controller/productcontroller')

router.get('/fetchproduct', productcontroller.fetchproduct)
router.get('/fetchpost', productcontroller.fetchpost)
router.get("/singleproduct/:id", productcontroller.singleproduct)

router.put("/Rating/:id", productcontroller.Rating)






module.exports = router