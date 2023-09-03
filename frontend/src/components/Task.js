import React from "react";
import { FaEdit, FaCheckDouble, FaTrashAlt } from "react-icons/fa";

const Task = ({ index, task, deleteTask, getSingleTask, setToComplete, isCompleted }) => {
  return (
    <div className={task.completed  ? "task completed":"task"} >
      <p>
        <b>{index}. </b>
        {task.name}
      </p>
      <div className="task-icons">
        <FaCheckDouble color={task.completed  ? "black":"green"} onClick={() => setToComplete(task)}/>
        <FaEdit color="purple" onClick={() => getSingleTask(task)} />
        <FaTrashAlt color="red" onClick={() => deleteTask(task._id)} />
      </div>
    </div>
  );
};

export default Task;
