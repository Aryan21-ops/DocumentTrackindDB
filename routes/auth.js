const express  = require('express')
const router = express.Router()

const Authcontroller = require('../Controllers/Admincontroller')
const UserAuthcontroller = require('../Controllers/Usercontroller')
const authenticate = require('../middleware/authenticate')



router.post('/register',  Authcontroller.register)
router.post('/adminlogin',  Authcontroller.login)

router.post('/userlogin', authenticate, UserAuthcontroller.login)


module.exports = router