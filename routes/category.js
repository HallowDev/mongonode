const express = require('express');
const router = express();
const auth = require("../middleware/auth.js")
const categoryCtrl = require("../controllers/category.js");

router.get("/", auth, categoryCtrl.readAll)
router.post("/", auth, categoryCtrl.create)
router.put("/:id", auth, categoryCtrl.update)
router.delete("/:id", auth, categoryCtrl.delete)

module.exports = router;
