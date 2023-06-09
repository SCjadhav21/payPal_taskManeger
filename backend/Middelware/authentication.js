const jwt = require("jsonwebtoken");
require("dotenv").config();
const Authentication = (req, res, next) => {
  const token = req.headers.authorization;

  jwt.verify(token, process.env.key, async (err, decoded) => {
    if (err) {
      res.send({ massage: err.message, alert: "you are not logged in" });
    } else {
      req.body.UserId = decoded.userId;
      next();
    }
  });
};

module.exports = { Authentication };
