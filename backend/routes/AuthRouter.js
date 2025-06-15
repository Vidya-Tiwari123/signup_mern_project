const router = require('express').Router();
const { SignupValidation, LoginValidation } = require('../Middlewares/Authvalidation');
const { signup,login } = require('../Controllers/Authcontroller');

router.post('/signup', SignupValidation, signup);
router.post('/login', LoginValidation, login)
 

module.exports = router;
