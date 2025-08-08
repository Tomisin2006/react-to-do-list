import React, { useState, useEffect } from 'react';
import './App.css'; 

function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editTaskId, setEditTaskId] = useState(null);
  const [editText, setEditText] = useState('');

  useEffect(() => {
    const storedTasks = localStorage.getItem('myTasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('myTasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task.trim() === '') return;
    const newTask = {
      id: Date.now(),
      text: task,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setTask('');
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
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
    setEditText('');
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
                      textDecoration: item.completed ? 'line-through' : 'none',
                      marginRight: '10px',
                    }}
                  >
                    {item.text}
                  </span>
                  <button onClick={() => toggleComplete(item.id)}>
                    {item.completed ? 'Uncompleted' : 'Complete'}
                  </button>
                  <button onClick={() => editTask(item)}>Edit</button>
                  <button onClick={() => deleteTask(item.id)}>Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
