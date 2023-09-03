const TaskModel = require("../model/taskModel");

exports.createTask = async (req, res) => {
  try {
    const document = await TaskModel.create(req.body);
    res.status(201).json({ msg: "success", data: document });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const document = await TaskModel.find();
    res.status(200).json({ msg: "success", data: document });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.getOneTask = async (req, res) => {
  const { id } = req.params;
  try {
    const document = await TaskModel.findById(id);
    if (!document) {
      return res
        .status(404)
        .json({ msg: `There is no task with this id ${id}.` });
    }
    res.status(200).json({ msg: "success", data: document });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const document = await TaskModel.findByIdAndDelete(id);
    if (!document) {
      return res.status(404).json(`there is no task with this ${id}`);
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  try {
    const document = await TaskModel.findByIdAndUpdate(id, req.body, {
      new: true, // Return the updated task
      runValidators: true, // Run the validation in the modelTask on update
    });
    if (!document) {
      return res
        .status(404)
        .json({ msg: `There is no task with this id ${id}` });
    }
    res.status(201).json({ msg: "success", data: document });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
