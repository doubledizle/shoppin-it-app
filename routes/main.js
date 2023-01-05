//This directs the flow to the controller handling homepage, login and signup
const express = require('express')
// setup router by declaring a variable for express router method
const router = express.Router()
// declare variable going into controllers folder to auth.js file
const authController = require('../controllers/auth') 
// declare variable going into controllers folder to home.js file
const homeController = require('../controllers/home')
// middleware ensureAuth destructuring this isn't being used in this router but will be used in todos.js router
const { ensureAuth, ensureGuest } = require('../middleware/auth')

// router gets url request from user, sends that request to the home.js file in the controller folder calling the method getIndex
router.get('/', homeController.getIndex)
// router gets url request from user, sends that request to auth.js file in the controller folder calling the method getLogin
router.get('/login', authController.getLogin)
// router gets url request from user, sends that request to auth.js file in controller folder calling the method postLogin
router.post('/login', authController.postLogin)
// router gets url request from user, sends that request to auth.js file in controller folder calling the method logout
router.get('/logout', authController.logout)
// router gets url request from user, sends that request to auth.js file in controller folder calling the method getSignup
router.get('/signup', authController.getSignup)
// router gets url request from user, sends that request to auth.js file in controller folder calling the method postSignup
router.post('/signup', authController.postSignup)

// export router to be used elsewhere
module.exports = router