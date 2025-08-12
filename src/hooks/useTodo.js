import { useState, useEffect } from "react";

export default function useTodo() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editTaskId, setEditTaskId] = useState(null);
  const [editText, setEditText] = useState("");
  const [error, setError] = useState("");

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

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
    if (task.trim() === "") {
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

  const deleteTask = () => {
    setTasks(tasks.filter((t) => t.id !== taskToDelete));
    setTaskToDelete(null);
    setShowModal(false);
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const editTask = (task) => {
    setEditTaskId(task.id);
    setEditText(task.text);
  };

  const saveTask = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, text: editText } : t
      )
    );
    setEditTaskId(null);
    setEditText("");
  };

  return {
    task, setTask,
    tasks,
    editTaskId, setEditTaskId,
    editText, setEditText,
    error,
    showModal, setShowModal,
    addTask,
    confirmDelete,
    deleteTask,
    toggleComplete,
    editTask,
    saveTask
  };
}
