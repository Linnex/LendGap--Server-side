const mongoose = require("mongoose")

const offerSchema = new mongoose.Schema({
    loan: Number,
    interest: Number,
    duration:Number,
    Author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
})

const Offer = mongoose.model("Offer", offerSchema)

module.exports = Offer