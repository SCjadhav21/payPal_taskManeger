const { TaskModel } = require("../Model/task.model");
const express = require("express");
const TaskRoutes = express.Router();
const { Authentication } = require("../Middelware/authentication");
TaskRoutes.use(express.json());
TaskRoutes.use(Authentication);

TaskRoutes.get("/:id", async (req, res) => {
  let id = req.params.id;

  try {
    const task = await TaskModel.findOne({ _id: id });
    res.send(task);
  } catch (err) {
    res.send("Something went wrong");
  }
});

TaskRoutes.delete("/:id", async (req, res) => {
  let id = req.params.id;

  try {
    const task = await TaskModel.findOneAndDelete({ _id: id });
    res.send(`task data with id:${id} is deleted`);
  } catch (err) {
    res.send("Something went wrong");
  }
});

TaskRoutes.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const payload = req.body;
  try {
    await TaskModel.findOneAndUpdate({ _id: id }, { ...payload });

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
