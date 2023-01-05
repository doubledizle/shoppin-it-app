// connecting to our database using mongoose
const mongoose = require('mongoose')

// async fn using mongoose to connect to our db
// the try bock is a bit outdated and normally use 
//  const conn = await mongoose.connect(
//      process.env.DB_STRING
//  )
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    })
    // if connection is successful log to console connected
    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (err) {
    // if connection fails log error to console
    console.error(err)
    // close the program
    process.exit(1)
  }
}
// export the funcion connectDB so that we can all it in server.js to connect to our database
module.exports = connectDB
