const express = require('express');
const router = express();
const auth = require("../middleware/auth.js")
const transactionCtrl = require("../controllers/transaction.js");

router.get("/:accountId", auth, transactionCtrl.readAllByAccount)
router.post("/:accountId", auth, transactionCtrl.create)
router.put("/:id", auth, transactionCtrl.update)
router.delete("/:id", auth, transactionCtrl.delete)

module.exports = router;
