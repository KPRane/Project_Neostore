const router = require('express').Router()
const categorycontroller = require('../controller/categorycontroller')


router.get('/getcategory/:category_id&&:color_id', categorycontroller.getcategory)

module.exports = router