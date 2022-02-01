const router = require('express').Router()
const profilecontroller = require('../controller/profilecontroller')

const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const fs = require('fs')
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
router.post('/user-profile/:user', upload.single('profileImg'), profilecontroller.userprofile)

router.get('/getmulter/:email', profilecontroller.getmulter)
router.post("/addaddress", profilecontroller.addaddress)

router.put("/editaddress", profilecontroller.editaddress)

router.delete("/deleteadd/:Address._id", profilecontroller.deleteadd)


router.put("/changepass/:id", profilecontroller.changepass)
router.put("/updprofile/:id", profilecontroller.updprofile)

router.get("/profile/:email", profilecontroller.profile)
router.get("/getaddress/:email", profilecontroller.getaddress)





module.exports = router