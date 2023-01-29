const express = require("express");

const routes = express.Router();

routes.get("/annotation", (req, res) => {
    res.send("Hello World");
})

module.exports = routes;