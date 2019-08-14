const express = require("express"),
    router = express.Router(),
    User = require("../../models/users"),
    passport = require("passport"),
    marketController = require("../../controllers/app"),
    middleware = require("../../middleware/index")




//AUTH ROUTES

//Get user
// router.get("/user", middleware.isLoggedIn, marketController.getUser)

// handle sign up logic
router.post("/register", marketController.createUsers)


//handle sign in logic
router.post("/login", marketController.logIn)

//Log out logic
router.get("/logout", (req, res) => {
    req.logOut()
    console.log("logged out")
    return res.send()
})


module.exports = router