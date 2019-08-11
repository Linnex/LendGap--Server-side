const mongoose = require("mongoose")

const requestSchema = new mongoose.Schema({
    loan: Number,
    interest: Number,
    duration:Number,
    // Author: {
    //     id: {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: "User"
    //     },
    //     username: String
    // }
})

const Request = mongoose.model("Request",requestSchema)

module.exports = Request