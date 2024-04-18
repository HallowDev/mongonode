const express = require('express');
const app = express();
require("./models/index.js")
const router = require("./routes/index.js");

//Ajout des routes

app.use(express.json());
app.use("/api", router);

module.exports = app;