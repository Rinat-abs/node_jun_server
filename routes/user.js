const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const {registerValidators, loginValidation} = require('../utils/validators');
const ifAuthMiddleware = require('../middleware/ifAuth'); 

router.post('/login',ifAuthMiddleware, loginValidation, userController.login)
router.post('/reg',ifAuthMiddleware, registerValidators, userController.reg)
router.get('/logout', userController.logout);


module.exports = router