const mongoose = require("mongoose");
const statics = require("./employees.statics");

const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

EmployeeSchema.statics = statics;
module.exports = mongoose.model("Employee", EmployeeSchema);
