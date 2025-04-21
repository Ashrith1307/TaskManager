const express = require("express");
const mongoose = require("mongoose");
const tasks = require("./models/tasks");

const app = express();
app.use(express.json()); //Middleware

// MongoDB Connection
mongoose
  .connect(
    "mongodb+srv://devarapallyashrithreddy:13-01-2007@cluster0.w6pgok9.mongodb.net/",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("MongoDb is live");
  })
  .catch(() => {
    console.log("Error in starting MongoDb");
  });

// inserting a task
app.post("/tasks", async (req, res) => {
  const { taskTitle } = req.body;
  try {
    const newtask = tasks({ title: taskTitle });
    await newtask.save();
    res.status(200).json({ message: "Added task : ", taskTitle });
  } catch (err) {
    res.status(500).json({ message: "Error in Adding task: ", err });
  }
});

// getting all tasks from mongoDb
app.get("/tasks", async (req, res) => {
  try {
    const alltasks = await tasks.find();
    res.status(200).json(alltasks);
  } catch (err) {
    res.status(500).json({ message: "Error in getting tasks :", err });
  }
});

// Deleting a task by the id
// after ":": is known as "params"
app.delete("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const D_task = await tasks.findByIdAndDelete(id);
    if (!D_task) {
      return res.status(404).json({ message: "Task not Found" });
    }
    res.status(200).json({ message: `Task ${D_task.title} deleted` });
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
});

// updating a task status
app.patch("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  try {
    const Upd_tasks = await tasks.findByIdAndUpdate(
      id,
      { completed: completed },
      { new: true }
    );
    if (!Upd_tasks) {
      res.status(404).json({ message: "Task not Found" });
    }
    res.status(200).json({
      message: `task updated successfully`,
    });
  } catch (error) {
    res.status(500).json({ message: "Error in Updating the task" });
  }
});
//Server live on 5000
app.listen(5000, () => {
  console.log("Server is Live on PORT 5000");
});
