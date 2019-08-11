const express = require("express"),
    router = express.Router(),
    Request = require("../../models/requests"),
    marketController = require("../../controllers/app")


//Get Requests
router.get("/",marketController.getRequests)

//Add Requests
router.post("/",marketController.createRequests)

//Delete offer
router.delete("/:id", (req, res) => {
    Request.findByIdAndRemove(req.params.id, (err, removed) => {
        if (err) {
            console.log("Error in removing")
        }
    })
})


module.exports = router