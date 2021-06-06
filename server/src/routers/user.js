const isAuth = require("../middleware/isAuth");
const UserControllers = require("../controllers/users/users");
const express = require("express");
const router = express.Router();

router.get("/", isAuth(), UserControllers.getAllUsers);
router.get("/:id", isAuth(), UserControllers.getUserById);
router.post("/create", UserControllers.registerUser);

module.exports = router;
