const EmployeeModel = require("../../db/employees/employees.model");
const {
  registerValidation,
  updateValidation,
  stringValidation,
} = require("./employeeValidations");

module.exports.addEmployee = async (req, res) => {
  const validated = registerValidation(req.body);
  if (validated.error) {
    res.statusMessage = validated.error.details[0].message;
    res.send(false);
  } else {
    try {
      const data = await EmployeeModel.create(req.body);
      res.statusMessage = "Success";
      res.json(data);
    } catch (err) {
      res.statusMessage = err;
      res.send(false);
    }
  }
};

module.exports.updateEmployee = async (req, res) => {
  const validated = updateValidation({ ...req.body, id: req.params.id });
  if (validated.error) {
    res.statusMessage = validated.error.details[0].message;
    res.send(false);
  } else {
    try {
      const data = await EmployeeModel.editEmployee(req.body, req.params.id);
      res.statusMessage = "Success";
      res.json(data);
    } catch (err) {
      res.statusMessage = err;
      res.send(false);
    }
  }
};

module.exports.deleteEmployee = async (req, res) => {
  const validated = stringValidation(req.params.id);
  if (validated.error) {
    res.statusMessage = validated.error.details[0].message;
    res.send(false);
  } else {
    try {
      await EmployeeModel.deleteOne({ _id: req.params.id });
      res.statusMessage = "Success";
      res.json(true);
    } catch (err) {
      res.statusMessage = err;
      res.send(false);
    }
  }
};

module.exports.getEmployees = async (req, res) => {
  const validated = stringValidation(req.query.name);
  if (validated.error && req.query.name) {
    res.statusMessage = validated.error.details[0].message;
    res.send(false);
  } else {
    try {
      const data = await EmployeeModel.searchEmployees(req.query.name);
      res.statusMessage = "Success";
      res.json(data);
    } catch (err) {
      res.statusMessage = err;
      res.send(false);
    }
  }
};
