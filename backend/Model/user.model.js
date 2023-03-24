const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  Full_Name: String,
  Email: String,
  Password: String,
});

const UserModel = mongoose.model("user", UserSchema);

module.exports = { UserModel };
