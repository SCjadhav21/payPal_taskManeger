const { connection } = require("./Config/db");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const app = express();
const { UserModel } = require("./Model/user.model");
require("dotenv").config();
app.use(express.json());
app.use(cors());
app.post("/signup", async (req, res) => {
  const { Email, Password } = req.body;
  try {
    const user = await UserModel.find({ Email });

    if (user.length > 0) {
      res.send("email is already registered");
    } else {
      bcrypt.hash(Password, 7, async (err, hash) => {
        const user = new UserModel({ Email, Password: hash });
        await user.save();
        res.send("Registered");
      });
    }
  } catch (err) {
    res.send("Error in registering the user");
  }
});

app.post("/login", async (req, res) => {
  const { Email, Password } = req.body;

  try {
    const user = await UserModel.findOne({ Email });

    if (user) {
      bcrypt.compare(Password, user.Password, function (err, result) {
        if (err) {
          res.send("something went wrong");
        } else if (result) {
          const token = jwt.sign({ userId: user._id }, process.env.key);

          res.send({ res: "Login Successfull", token: token });
        } else {
          res.send("Invalid Credentials");
        }
      });
    } else {
      res.send("Invalid Credentials");
    }
  } catch (err) {
    res.send("Something went wrong");
    console.log(err);
  }
});

app.listen(process.env.port, async (req, res) => {
  try {
    await connection;
    console.log(`Connect to db and running on ${process.env.port}`);
  } catch (err) {
    console.log(err);
  }
});
