// controller that handles router request method call getIndex from browser to respond and render with our view engine ejs
module.exports = {
  getIndex: (req, res) => {
    res.render('index.ejs')
  }
}