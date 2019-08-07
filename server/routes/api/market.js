const express = require("express"),
    router = express.Router(),
    mongoose = require("mongoose"),
    Offer = require("../../models/offers")


// Get Offers
router.get("/", async (req, res) => {
    Offer.find({}, (err, allOffers) => {
        console.log("inside hostel");
        if (err) {
            console.log("error!!!");
            console.log(err)
        } else {
            console.log("success");
            console.log(allOffers)
            res.send(allOffers)
        }
    })
})

//Add Offers
router.post("/", (req, res) => {

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
            res.status(201).send("successful")
        }
    })

})

//Delete offer
router.delete("/:id", async (req, res) => {
    Offer.findByIdAndRemove(req.params.id, (err, removed) => {
        if (err) {
            console.log("Error in removing")
        }
    })
})


module.exports = router