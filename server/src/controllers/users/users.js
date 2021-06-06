const UserModel = require("../../db/users/users.model");
const { registerValidation, loginValidation } = require("./userValidation");

module.exports.getAllUsers = async () => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (err) {
    res.statusMessage = err;
    res.send(false);
  }
};

module.exports.getUserById = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (user) {
      delete user.password;
      res.json(user);
    } else {
      res.statusMessage = "No such User";
      res.send(null);
    }
  } catch (err) {
    res.statusMessage = err;
    res.send(false);
  }
};

module.exports.registerUser = async (req, res) => {
  const validated = registerValidation(req.body);
  if (validated.error) {
    res.statusMessage = validated.error.details[0].message;
    res.send(false);
  } else {
    try {
      savedUser = await UserModel.registerUser(req.body);
      res.statusMessage = "Success";
      res.send(savedUser);
    } catch (err) {
      res.statusMessage = err;
      res.send(false);
    }
  }
};

module.exports.login = async (req, res) => {
  const validated = loginValidation(req.body);
  if (validated.error) {
    res.statusMessage = validated.error.details[0].message;
    res.send(false);
  } else {
    try {
      const data = await UserModel.login(req.body);
      res.statusMessage = "Success";
      res.json(data);
    } catch (err) {
      res.statusMessage = err;
      res.send(false);
    }
  }
};
