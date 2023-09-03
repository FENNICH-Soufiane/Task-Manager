const express = require("express");

const router = express.Router();
const {
  createTask,
  getTasks,
  getOneTask,
  deleteTask,
  updateTask,
} = require("../controllers/taskController");

// Create a task
// router.post("/api/tasks", async (req, res) => {
//   try {
//     const document = await TaskModel.create(req.body);
//     res.status(201).json({ msg: "success", data: document });
//   } catch (error) {
//     res.status(500).json({ msg: error.message });
//   }
// });
router.route("/").post(createTask).get(getTasks);

router.route("/:id").get(getOneTask).delete(deleteTask).put(updateTask);

module.exports = router;
