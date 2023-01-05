// route that handles CRUD post get put delete routes
const express = require('express')
// setting up router declaring a variable for express router method
const router = express.Router()
// declaring a variable to go to controllers folder to todos.js
const todosController = require('../controllers/todos') 
// middleware ensureAuth destructuring
const { ensureAuth } = require('../middleware/auth')

// router that gets user url, go to middleware folder to auth.js to check to see if the user is authenticated , go to todos.js in controller folder and call getTodos method
router.get('/', ensureAuth, todosController.getTodos)
// router that gets user url, go to todos.js file in the controller folder and call the method createTodo
router.post('/createTodo', todosController.createTodo)
// router that gets the user url, go to todos.js file in the controller folder and call the method markComplete
router.put('/markComplete', todosController.markComplete)
// router that gets the user url, go to todos.js file in the controller folder and call the method markIncomplete
router.put('/markIncomplete', todosController.markIncomplete)
// router that gets the user url, go to the todos.js file in the controller folder and call the method deleteTodo
router.delete('/deleteTodo', todosController.deleteTodo)
// exports router to be used elsewhere
module.exports = router