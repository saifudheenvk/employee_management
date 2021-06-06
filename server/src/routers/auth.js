const express = require("express");
const UserControllers = require("../controllers/users/users");
const router = express.Router();

router.post("/login", UserControllers.login);

module.exports = router;
