const Offer = require("../models/offers"),
    Request = require("../models/requests"),
    User = require("../models/users"),
    passport = require("passport"),
    bcrypt = require('bcryptjs'),
    jwt = require('jsonwebtoken');
    secretKey = "divee789"





exports.createUsers = (req, res) => {
    var newUser = {
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    };
    User.findOne({ email: req.body.email }).then(item => {
        if (item) {
            return res.send('A user with the given email is already registered')
        }
        else {
            User.create(newUser, (err, user) => {
                if (err) {
                    return res.status(500).send("There was a problem registering the user.")
                }
                User.findOne({ email: req.body.email }, (err, user) => {
                    if (err) {
                        return res.status(500).send("There was a problem getting user")
                    }
                    let token = jwt.sign({ id: user.id }, secretKey, {
                        expiresIn: 86400 // expires in 24 hours
                    })
                    res.status(200).send({ auth: true, token: token, user: user });
                })

            })
        }
    })
}
exports.logIn = (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
            return res.status(500).send('Error on the server.')
        }
        if (!user) {
            return res.status(404).send('No user found.');
        }
        let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) {
             return res.status(401).send({ auth: false, token: null,message:"Password not valid" })
     }
     let token = jwt.sign({ id: user.id }, secretKey, { expiresIn: 86400 // expires in 24 hours
     })
     res.status(200).send({ auth: true, token: token, user: user });
    })
}

exports.getOffers = (req, res) => {
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
        loan: req.body.loan,
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


exports.getRequests = (req, res) => {
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
        loan: req.body.loan,
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

// User.register(newUser, req.body.password, (err, user) => {
//     if (err) {
//         console.log(err)
//         res.send(err.message)
//     } else {
//         passport.authenticate("local")(req, res, () => {
//             console.log("successfully added user")
//             console.log(user)
//             res.status(200).send(newUser)
//         })
//     }
// })
// exports.getUser = (req, res) => {
//     let user = User.find(user => {
//         return user.id === req.session.passport.user
//     })

//     console.log([user, req.session])

//     res.send({ user: user })
// }

// exports.logUser = (req, res, next) => {
//     passport.authenticate("local", (err, user, info) => {
//         if (err) {
//             return next(err);
//         }

//         if (!user) {
//             return res.status(400).send([user, "Cannot log in", info]);
//         }

//         req.login(user, err => {
//             res.send("Logged in");
//         });
//     }), (req, res) => { }
// }