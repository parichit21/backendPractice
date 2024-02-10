var express = require('express');
var router = express.Router();

const userModel = require("./users");
const postModel = require("./Posts");
const passport = require('passport');

const localStrategy = require("passport-local");
passport.use(new localStrategy(userModel.authenticate));



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET home page. */
router.get('/login', function(req, res, next) {
  res.render('login');
});


router.get('/feed', function(req, res, next) {
  res.render('feed');
});




// profile route
router.get('/profile', isloggedIn , function(req, res, next) {
  res.render("profile");
});






// post 
router.post('/register', function(req,res){
  // const userData= new userModel({
  //   username: req.body.username,
  //   email: req.body.email,
  //   fullName: req.body.fullName,
  // });

  const { username, email, fullname } = req.body;
const userData = new userModel({ username, email, fullname  });

userModel.register(userData, req.body.password)
.then(function(){
  passport.authenticate("local")(req,res,function(){
    res.redirect("/profile");
  })

  
})
  
})

router.post('/login', passport.authenticate("local",{
  successRedirect: '/profile',
  failureRedirect: "/"
}), function(req, res){
  // res.send("log in ")
  res.render('/profile')
})

router.post('/logout', function(req,res){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/login');
  });
})

function isloggedIn(req,res,next){
  if(req.isAuthenticated()) return next();
  res.redirect("/");
}
















module.exports = router;
