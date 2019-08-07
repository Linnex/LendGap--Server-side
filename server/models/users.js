const mongoose = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose")

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email:String
})

userSchema.plugin(passportLocalMongoose)
var User = mongoose.model("User", userSchema)

module.exports = User