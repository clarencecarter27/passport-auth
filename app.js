const express = require("express"),
      mongoose = require("mongoose"),
      passport = require("passport"),
      bodyParser = require("body-parser"),
      User = require("./models/user"),
      LocalStrategy = require("passport-local"),
      passportLocalMongoose = require("passport-local-mongoose");
      
      
mongoose.connect("mongodb://localhost/auth", {useNewUrlParser: true});
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(require("express-session")({
    secret: "Vasu is actually pretty frickin funny",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ROUTES

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/secret/:username",isLoggedIn, (req, res) => {
   res.render("secret", {username: req.params.username}); 
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}