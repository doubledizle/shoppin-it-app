// controller that handles router CRUD after which is directed to models to get our shcema then talk to our database
// require models todo schema to talk to the database for us
const Todo = require('../models/Todo')

// module.exports enables the todos.js in routes folder to call these methods
module.exports = {
  getTodos: async (req, res) => {
    console.log(req.user)
    try {
      // finds all the items that match the userId
      const todoItems = await Todo.find({ userId: req.user.id })
      // counts all the not completed items by userId. We don't need to use .toArray because mongoose does it for us
      const itemsLeft = await Todo.countDocuments({ userId: req.user.id, completed: false })
      // render ejs passing in our items for the todo list of remaining items for the count and user name to be displayed on the page
      res.render('todos.ejs', { todos: todoItems, left: itemsLeft, user: req.user })
    } catch (err) {
      console.log(err)
    }
  },
  createTodo: async (req, res) => {
    try {
      // use Todo model to talk to database and create a new object using mongoose methods
      await Todo.create({ todo: req.body.todoItem, completed: false, userId: req.user.id })
      console.log('Todo has been added!')
      res.redirect('/todos')
    } catch (err) {
      console.log(err)
    }
  },
  markComplete: async (req, res) => {
    try {
      // use Todo model to talk to database using mongoose method targeting by id and changing completed to true which adds the class from css to gray and strike it out
      await Todo.findOneAndUpdate({ _id: req.body.todoIdFromJSFile }, {
        completed: true
      })
      console.log('Marked Complete')
      res.json('Marked Complete')
    } catch (err) {
      console.log(err)
    }
  },
  markIncomplete: async (req, res) => {
    try {
      // use Todo model to talk to database using mongoose method targeting by id and changing completed boolean to false which removes the class from css 
      await Todo.findOneAndUpdate({ _id: req.body.todoIdFromJSFile }, {
        completed: false
      })
      console.log('Marked Incomplete')
      res.json('Marked Incomplete')
    } catch (err) {
      console.log(err)
    }
  },
  deleteTodo: async (req, res) => {
    console.log(req.body.todoIdFromJSFile)
    try {
      // use Todo model to talk to database using mongoose targeting by id and deleting the todo
      await Todo.findOneAndDelete({ _id: req.body.todoIdFromJSFile })
      console.log('Deleted Todo')
      res.json('Deleted It')
    } catch (err) {
      console.log(err)
    }
  }
}