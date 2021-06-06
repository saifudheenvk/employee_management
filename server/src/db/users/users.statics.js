const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function findByEmail(email) {
  return this.findOne({ email });
}

async function registerUser({ name, email, password }) {
  const record = await this.findByEmail(email);
  if (record) {
    throw new Error("This email already exists");
  } else {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const newUser = await this.create({ name, email, password: hash });
    return newUser;
  }
}

async function login({ email, password }) {
  const user = await this.findByEmail(email);
  if (!user) throw new Error("Incorrect email.");
  const validPass = await bcrypt.compare(password, user.password);
  if (validPass) {
    const token = jwt.sign({ userId: user._id }, process.env.JWT_TOKEN, {
      expiresIn: "12h",
    });
    return { userId: user._id, token, tokenExpiration: 12 };
  } else throw new Error("Incorrect password.");
}

module.exports = { findByEmail, registerUser, login };
