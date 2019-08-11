const Offer = require("../models/offers"),
      Request = require("../models/requests")
exports.getOffers =  (req, res) => {
    Offer.find({}, (err, allOffers) => {
        console.log("Finding offers");
        if (err) {
            console.log("error!!! in finding offers");
            console.log(err)
        } else {
            console.log("finding offers successful");
            res.send(allOffers)
        }
    })
}

exports.createOffers = (req, res) => {

    const newOffer = {
        loan:req.body.loan,
        interest: req.body.interest,
        duration: req.body.duration
    }
    Offer.create(newOffer, (err, item) => {
        if (err) {
            console.log(err)
        } else {
            console.log(item)
            res.status(201)
        }
    })

}


exports.getRequests = (req,res)=>{
    Request.find({}, (err, allReqs) => {
        console.log("Finding requests");
        if (err) {
            console.log("error!!! in finding request");
            console.log(err)
        } else {
            console.log("finding request successful");
            res.send(allReqs)
        }
    })
}

exports.createRequests = (req, res) => {

    const newReq = {
        loan:req.body.loan,
        interest: req.body.interest,
        duration: req.body.duration
    }
    Request.create(newReq, (err, item) => {
        if (err) {
            console.log(err)
        } else {
            console.log(item)
            res.status(201)
        }
    })

}