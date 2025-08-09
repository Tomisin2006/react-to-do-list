import { useState, useEffect } from "react";
import "./Todo.css";
import ConfirmModal from "../../features/modals/ConfirmModal";

function TodoList() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editTaskId, setEditTaskId] = useState(null);
  const [editText, setEditText] = useState("");

  // New state for modal
  const [showModal, setShowModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  // Error Validation check
  const [error, setError] = useState("");

  useEffect(() => {
    const storedTasks = localStorage.getItem("myTasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("myTasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task.trim() === "") 
    {
        setError("Please enter a task before adding.");
        return;
    }
     setError("");

    const newTask = {
      id: Date.now(),
      text: task,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setTask("");
  };

   const confirmDelete = (id) => {
    setTaskToDelete(id);
    setShowModal(true);
  };

  const deleteTask = (id) => {
  const updatedTasks = tasks.filter(task => task.id !== taskToDelete);
    setTasks(updatedTasks);
    setTaskToDelete(null);
    setShowModal(false);
  };

  const toggleComplete = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const editTask = (task) => {
    setEditTaskId(task.id);
    setEditText(task.text);
  };

  const saveTask = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, text: editText } : task
    );
    setTasks(updatedTasks);
    setEditTaskId(null);
    setEditText("");
  };

  return (
    <div className="container">
      <div className="box">
        <h1>My To-Do List</h1>

        <div className="input-section">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter a task"
          />
          <button onClick={addTask}>Add Task</button>
        </div>

        <ul>
          {tasks.map((item) => (
            <li key={item.id}>
              {editTaskId === item.id ? (
                <>
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <button onClick={() => saveTask(item.id)}>Save</button>
                </>
              ) : (
                <>
                  <span
                    style={{
                      textDecoration: item.completed ? "line-through" : "none",
                      marginRight: "10px",
                    }}
                  >
                    {item.text}
                  </span>
                  <button onClick={() => toggleComplete(item.id)}>
                    {item.completed ? "Uncompleted" : "Complete"}
                  </button>
                  <button onClick={() => editTask(item)}>Edit</button>
                  {/* <button onClick={() => deleteTask(item.id)}>Delete</button> */}
                   <button onClick={() => confirmDelete(item.id)}>Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
      {error && <p className="error-text" style={{ color: 'red', fontSize: 12 }}>{error}</p>}
      </div>
        <ConfirmModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={deleteTask}
        message="Are you sure you want to delete this task?"
      />
    </div>
  );
}

export default TodoList;
