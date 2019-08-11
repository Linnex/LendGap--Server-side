const express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    cors = require("cors"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    localStrategy = require("passport-local")
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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(cors())

//Passport Configuration
// app.use(require("express-session")({
//     secret: "divee 789",
//     resave: false,
//     saveUninitialized: false
// }))
app.use(passport.initialize())
app.use(passport.session())
// passport.use(new localStrategy(User.authenticate()))
// passport.serializeUser(User.serializeUser())
// passport.deserializeUser(User.deserializeUser())


const offers = require("./routes/api/offers")
const requests = require("./routes/api/requests")

app.use("/api/markets", offers)
app.use("/api/requests", requests)




const port = process.env.PORT || 9000
app.listen(port, console.log("server started on port " + port))