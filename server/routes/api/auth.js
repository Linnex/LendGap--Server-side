const express = require("express"),
      router = express.Router(),
      User = require("../../models/users"),
      passport = require("passport")



//AUTH ROUTES

// handle sign up logic
router.post("/register", (req, res) => {
    var newUser = new User({
        username: req.body.username
    });
    User.register(newUser, req.body.password, (err, user) => {
        if (err) {
            console.log(err)
            return res.redirect("/register")
        } else {
            passport.authenticate("local")(req, res, () => {
                req.send("success","Welcome to alphaLodge " + user.username)
                // res.redirect("/hostels")
            })
        }
    })
})


//handle sign in logic
router.post("/login", passport.authenticate("local", {
    successRedirect: "/hostels",
    failureRedirect: "/login"
}), (req, res) => {
 
})
 
//Log out logic
router.get("/logout",(req,res)=>{
    req.logOut()
    req.send("success","Logged you out")
    res.redirect("/hostels")
})


module.exports = router