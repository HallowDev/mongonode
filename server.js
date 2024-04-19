const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = require("./app.js");
app.use(express.json());

