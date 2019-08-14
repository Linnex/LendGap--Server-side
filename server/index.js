const express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    cors = require("cors"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    localStrategy = require("passport-local"),
    User = require("./models/users")

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//mongodb+srv://divee789:divee789@cluster0-ujvhg.mongodb.net/test?retryWrites=true


//Connecting to Database    

mongoose.connect("mongodb://localhost/lendgap", {
    useNewUrlParser: true
}, (err) => {
    if (err) {
        console.log("divine connect error")
    } else {
        console.log("divine connect successful")
    }
})
mongoose.connection.on('error', function (err) {
    console.log("divine error:", err);
});
mongoose.connection.on('connected', function () {
    console.log("divine connection")
});



//MIDDLEWARE
const enableCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
}
app.use(enableCrossDomain)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(cors())

// Passport Configuration
app.use(require("express-session")({
    secret: "divee 789",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000
    }
}))
app.use(passport.initialize())
app.use(passport.session())
passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())


const offers = require("./routes/api/offers")
const requests = require("./routes/api/requests")
const authRoutes = require("./routes/api/auth")

app.use("/api/markets", offers)
app.use("/api/requests", requests)
app.use("/api", authRoutes)




const port = process.env.PORT || 9000
app.listen(port, console.log("server started on port " + port))