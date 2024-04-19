const express = require('express');
const app = express();
require("./models/index.js")
const router = require("./routes/index.js");
require ("dotenv").config();
const mongoose = require('mongoose');

//Ajout des routes

app.use(express.json());
app.use("/api", router);

const port = process.env.PORT;

mongoose.connect(process.env.MONGO_URI + '/' + process.env.DB_NAME, { ssl: true })
.then(() => {
    console.log('MongoDB connected !')
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
})
.catch((err) => {
  console.error('Error with MongoDB connection', err);
});


module.exports = app;