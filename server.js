const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = require("./app.js");
app.use(express.json());

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
