const { connection } = require("./Config/db");
const express = require("express");

const cors = require("cors");
const { TaskRoutes } = require("./Routes/taskRoutes");
const { UserRoutes } = require("./Routes/userroutes");
const app = express();

require("dotenv").config();
app.use(express.json());
app.use(cors());

app.use("/task", TaskRoutes, (req, res) => {
  res.sendStatus(404);
});

app.use("/", UserRoutes, (req, res) => {
  res.sendStatus(404);
});

app.listen(process.env.port, async (req, res) => {
  try {
    await connection;
    console.log(`Connected to db and running on ${process.env.port}`);
  } catch (err) {
    console.log(err);
  }
});
