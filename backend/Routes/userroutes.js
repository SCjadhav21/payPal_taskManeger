const { UserModel } = require("../Model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require("express");

const UserRoutes = express.Router();

UserRoutes.use(express.json());

UserRoutes.post("/signup", async (req, res) => {
  const { Full_Name, Email, Password } = req.body;
  try {
    const user = await UserModel.find({ Email });

    if (user.length > 0) {
      res.send("email is already registered");
    } else {
      bcrypt.hash(Password, 7, async (err, hash) => {
        if (err) {
          res.send("something went wrong");
        } else {
          const user = new UserModel({ Full_Name, Email, Password: hash });
          await user.save();
          res.send("Registered");
        }
      });
    }
  } catch (err) {
    res.send("Error in registering the user");
  }
});
UserRoutes.post("/login", async (req, res) => {
  const { Email, Password } = req.body;

  try {
    const user = await UserModel.findOne({ Email });

    if (user) {
      bcrypt.compare(Password, user.Password, function (err, result) {
        if (err) {
          res.send("something went wrong");
        } else if (result) {
          const token = jwt.sign({ userId: user._id }, process.env.key);
          
          res.send({
            res: "Login Successfull",
            token: token,
            data: { name: user.Full_Name, email: user.Email },
          });
        } else {
          res.send("Invalid Credentials");
        }
      });
    } else {
      res.send("Invalid Credentials");
    }
  } catch (err) {
    res.send("Something went wrong");
  }
});

module.exports = { UserRoutes };
