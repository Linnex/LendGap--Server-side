const express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    cors = require("cors"),
    mongoose = require("mongoose")
    //mongodb+srv://divee789:divee789@cluster0-ujvhg.mongodb.net/test?retryWrites=true

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
//Middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
app.use(cors())

const offers = require("./routes/api/market")

app.use("/api/markets", offers)

const port = process.env.PORT || 9000


app.listen(port, console.log("server started on port " + port))