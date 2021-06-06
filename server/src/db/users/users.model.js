const mongoose = require("mongoose");
const statics = require("./users.statics");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

UserSchema.statics = statics;
module.exports = mongoose.model("User", UserSchema);
