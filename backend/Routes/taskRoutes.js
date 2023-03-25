const { TaskModel } = require("../Model/task.model");
const express = require("express");
const TaskRoutes = express.Router();
const { Authentication } = require("../Middelware/authentication");
TaskRoutes.use(express.json());
TaskRoutes.use(Authentication);

TaskRoutes.get("/all", async (req, res) => {
  let userId = req.body.UserId;
  try {
    let task = await TaskModel.find({ UserId: userId });
    res.send(task);
  } catch (err) {
    res.send("Something went wrong");
  }
});

TaskRoutes.get("/bug", async (req, res) => {
  let userId = req.body.UserId;
  try {
    let task = await TaskModel.find({ TaskType: "bug", UserId: userId });
    res.send(task);
  } catch (err) {
    res.send("Something went wrong");
  }
});
TaskRoutes.get("/story", async (req, res) => {
  let userId = req.body.UserId;
  try {
    let task = await TaskModel.find({ TaskType: "story", UserId: userId });
    res.send(task);
  } catch (err) {
    res.send("Something went wrong");
  }
});
TaskRoutes.get("/feature", async (req, res) => {
  let userId = req.body.UserId;
  try {
    let task = await TaskModel.find({ TaskType: "feature", UserId: userId });
    res.send(task);
  } catch (err) {
    res.send("Something went wrong");
  }
});

TaskRoutes.get("/all/:status", async (req, res) => {
  let userId = req.body.UserId;
  const status = req.params.status;
  try {
    let task = await TaskModel.find({ TaskStatus: status, UserId: userId });
    res.send(task);
  } catch (err) {
    res.send("Something went wrong");
  }
});
TaskRoutes.get("/bug/:status", async (req, res) => {
  let userId = req.body.UserId;
  const status = req.params.status;
  try {
    let task = await TaskModel.find({
      TaskStatus: status,
      TaskType: "bug",
      UserId: userId,
    });
    res.send(task);
  } catch (err) {
    res.send("Something went wrong");
  }
});
TaskRoutes.get("/story/:status", async (req, res) => {
  let userId = req.body.UserId;
  const status = req.params.status;
  try {
    let task = await TaskModel.find({
      TaskStatus: status,
      TaskType: "story",
      UserId: userId,
    });
    res.send(task);
  } catch (err) {
    res.send("Something went wrong");
  }
});
TaskRoutes.get("/feature/:status", async (req, res) => {
  let userId = req.body.UserId;
  const status = req.params.status;
  try {
    let task = await TaskModel.find({
      TaskStatus: status,
      TaskType: "feature",
      UserId: userId,
    });
    res.send(task);
  } catch (err) {
    res.send("Something went wrong");
  }
});

TaskRoutes.get("/getById/:id", async (req, res) => {
  let userId = req.body.UserId;
  let id = req.params.id;

  try {
    const task = await TaskModel.findOne({ _id: id, UserId: userId });
    res.send(task);
  } catch (err) {
    res.send("Something went wrong");
  }
});

TaskRoutes.delete("/:id", async (req, res) => {
  let userId = req.body.UserId;
  let id = req.params.id;

  try {
    const task = await TaskModel.findOneAndDelete({ _id: id, UserId: userId });
    res.send(`task data with id:${id} is deleted`);
  } catch (err) {
    res.send("Something went wrong");
  }
});

TaskRoutes.patch("/:id", async (req, res) => {
  let userId = req.body.UserId;
  const id = req.params.id;
  const payload = req.body;
  console.log(req.body);
  try {
    await TaskModel.findOneAndUpdate(
      { _id: id, UserId: userId },
      { ...payload }
    );

    res.send(`task data with id:${id} is updated`);
  } catch (err) {
    res.send("Something went wrong");
  }
});

TaskRoutes.post("/", async (req, res) => {
  try {
    const task = new TaskModel({ ...req.body });
    await task.save();
    res.send("task added succesfully");
  } catch (err) {
    res.send(err);
  }
});

module.exports = { TaskRoutes };
