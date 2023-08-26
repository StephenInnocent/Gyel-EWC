const express = require("express");
const { createUser, changePassword } = require("../controllers/users");

const router = express.Router();

router.post("/register", createUser);
router.patch('/password', changePassword);
const usersRouter = router;

module.exports = {
    usersRouter
}
