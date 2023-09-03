import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

import TaskForm from "./TaskForm";
import Task from "./Task";
import { URL } from "../App";
import spinner from "../assets/loader.gif";

// http://localhost:7000/api/tasks

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    completed: false,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [taskId, setTaskId] = useState("");

  const { name } = formData;
  const handleInputChange = (e) => {
    // e.target.name = name
    const { name, value } = e.target;
    // const {value } = e.target;👀
    setFormData({
      ...formData,
      [name]: value,
      // name: value,👀
    });
  };

  const getTasks = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`${URL}/api/tasks`);
      console.log(data);
      setIsLoading(false);
      setTasks(data);
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const createTask = async (e) => {
    e.preventDefault();
    if (name === "") {
      return toast.error("Input field cannot be empty.");
    }
    try {
      await axios.post(`${URL}/api/tasks`, formData);
      setFormData({ ...formData, name: "" });
      toast.success("Task added successfully");
      getTasks();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${URL}/api/tasks/${id}`);
      // eslint-disable-next-line no-restricted-globals
      // location.reload() // or use getTasks()
      getTasks();
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Show name when we want to update it
  const getSingleTask = async (task) => {
    setFormData({ name: task.name });
    setTaskId(task._id); // 👀
    setIsEditing(true); // for change Add to Edit when we want to update task
  };

  const updateTask = async (e) => {
    e.preventDefault();
    if (name === "") {
      return toast.error("Input field cannot be empty");
    }
    try {
      await axios.put(`${URL}/api/tasks/${taskId}`, formData); // 👀
      setFormData({ ...formData, name: "" });
      setIsEditing(false);
      getTasks();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const setToComplete = async (task) => {
    const newFormData = {
      name: task.name,
      // completed: true,
      completed: !task.completed, // Toggle the completed status
    };
    try {
      const res = await axios.put(`${URL}/api/tasks/${task._id}`, newFormData);
      console.log(res);
      getTasks();
    } catch (error) {
      toast.error(error.message);
    }
  };
  // method for calculate nbr of tasks
  const count = tasks?.data?.length;
  const countIncompleteTasks = tasks?.data?.filter(
    (task) => task.completed === true
  ).length;

  return (
    <div>
      <h2>Task Manager</h2>
      <TaskForm
        name={name}
        handleInputChange={handleInputChange}
        createTask={createTask}
        isEditing={isEditing}
        updateTask={updateTask}
      />
      {count > 0 && (
        <div className="--flex-between --pb">
          <p>
            <b>Total Tasks: </b>
            {count}
          </p>
          <p>
            <b>Completed Tasks: </b>
            {countIncompleteTasks}
          </p>
        </div>
      )}
      <hr />
      {isLoading && (
        <div className="--flex-center">
          <img src={spinner} alt="spinner" />
        </div>
      )}
      {!isLoading && tasks.data && tasks.data.length === 0 ? (
        <div className="--flex-center --py">
          <h3>No tasks for the moment</h3>
        </div>
      ) : (
        <>
          {tasks.data &&
            tasks.data.map((item, index) => (
              <Task
                index={index + 1}
                task={item}
                key={index}
                deleteTask={deleteTask}
                getSingleTask={getSingleTask}
                setToComplete={setToComplete}
              />
            ))}
        </>
      )}
    </div>
  );
};

export default TaskList;
