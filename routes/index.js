const express = require('express')
const router = express();
const userRoutes = require('./user.js')
const accountRoutes = require('./account.js')
const accountLineRoute = require('./transaction.js')

router.use("/auth", userRoutes)
router.use("/account", accountRoutes)
router.use("/line", accountLineRoute)

module.exports = router