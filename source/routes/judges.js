const express = require("express");
const { getQuota, judgesLogin } = require("../controllers/judges");

const router = express.Router();

router.get('/quota', getQuota);
router.post("/login", judgesLogin)

const judgesRouter = router;

module.exports = {
    judgesRouter
}
