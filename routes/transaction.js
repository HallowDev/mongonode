const express = require('express');
const router = express();
//const auth = require("../middleware/auth.js")
const transactionCtrl = require("../controllers/transaction.js");

router.get("/:accountId", transactionCtrl.readAllByAccount)
router.post("/:accountId", transactionCtrl.create)
router.put("/:id", transactionCtrl.update)
router.delete("/:id", transactionCtrl.delete)

module.exports = router;
