const express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    cors = require("cors"),
    port = process.env.PORT || 1001

app.use(bodyParser.json())
app.use(cors())