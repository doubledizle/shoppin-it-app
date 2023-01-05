// check to see if the user is authenticated and continue using next()
// allows us to force a redirect to home page if unathenticated user tries to manually type in url
module.exports = {
  ensureAuth: function(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    } else {
      res.redirect('/')
    }
  }
}
