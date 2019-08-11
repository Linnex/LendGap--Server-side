const express = require("express"),
    router = express.Router(),
    Offer = require("../../models/offers"),
    Request = require("../../models/requests")
    marketController = require("../../controllers/app")


// Get Offers
router.get("/", marketController.getOffers)

//Add Offers
router.post("/", marketController.createOffers)

//Delete offer
router.delete("/:id", (req, res) => {
    Offer.findByIdAndRemove(req.params.id, (err, removed) => {
        if (err) {
            console.log("Error in removing")
        }
    })
})


module.exports = router