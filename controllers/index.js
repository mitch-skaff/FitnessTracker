const router = require("express").Router();
const views = require("./view");
const api = require("./api")

router.use("/", views);
router.use("/api", api)

module.exports = router