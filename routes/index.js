const express = require('express')
const router = express();
const userRoutes = require('./user.js')
const accountRoutes = require('./account.js')
const transactionRoute = require('./transaction.js')
const categoryRoute = require('./category.js')

router.use("/auth", userRoutes)
router.use("/account", accountRoutes)
router.use("/transaction", transactionRoute)
router.use("/category", categoryRoute)

module.exports = router