const express = require("express");
const { createAdminOrJudge, adminLogin } = require("../controllers/Admin");
const { getAllUsersOrJudgesOrAdmin } = require("../controllers/seederAdmin");

const router = express.Router();

router.post("/register/:role", createAdminOrJudge);
router.post("/login", adminLogin)
router.get("/:category", getAllUsersOrJudgesOrAdmin)

const adminRouter = router;

module.exports = {
    adminRouter
}
