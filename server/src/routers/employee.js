const isAuth = require("../middleware/isAuth");
const EmployeeController = require("../controllers/employees/employee");
const express = require("express");
const router = express.Router();

router.post("/", isAuth(), EmployeeController.addEmployee);
router.delete("/:id", isAuth(), EmployeeController.deleteEmployee);
router.put("/:id", isAuth(), EmployeeController.updateEmployee);
router.get("/", isAuth(), EmployeeController.getEmployees);

module.exports = router;
