// Server.js runs on startup and requires all mvc and middleware acting as both controller and router. As controller, it acts as the brain that controlls the application. As router, it inherits all routing from the router directing from home url to files in folders shown in our dependancies below.
const express = require('express')
const app = express()
// mongoose connects to mongodb allowing us to use understandable methods
const mongoose = require('mongoose')
// passport.js is acting as user authentication
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
// flash is being used as a message success/warning/error system 
const flash = require('express-flash')
const logger = require('morgan')
const connectDB = require('./config/database')
// declared variable directing to the main.js file in the routes folder
const mainRoutes = require('./routes/main')
// declared variable directing to the todos.js in the routes folder
const todoRoutes = require('./routes/todos')

// initializing our hidden path .env and guiding to the .env file in config folder
require('dotenv').config({ path: './config/.env' })

// Passport config
require('./config/passport')(passport)

connectDB()
// templating langquage aka view engine that renders our html
app.set('view engine', 'ejs')
// sets location for static assests in the public folder for client side rendering images, css, and js event listeners
app.use(express.static('public'))
// replaces body-parser
app.use(express.urlencoded({ extended: true }))
// parses JSON content from incoming requests
app.use(express.json())
// express morgan middleware
app.use(logger('dev'))

// Sessions
// creates and stores user login in the database as a collection named sessions
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
)

// Passport middleware
// helps with authentication and cookies
app.use(passport.initialize())
app.use(passport.session())

// Initialize express flash messages
app.use(flash())

// Server.js is acting as a router listening to user url going to home page '/' calls the variable declared at the beginning of server.js directing us to main.js in routes folder
app.use('/', mainRoutes)
// server.js acting as router listening on user url '/todos' and calling declared variable to go to todo.js in routes folder
app.use('/todos', todoRoutes)

// initialize or setting up our port in this case localhost:5500 found in .env file and console logging it
app.listen(process.env.PORT, () => {
  console.log(`Server is running, you better catch it on localhost:${process.env.PORT}!`)
})