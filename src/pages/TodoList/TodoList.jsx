import "./Todo.css";
import useTodo from "../../hooks/useTodo";

import ConfirmModal from "../../features/modals/ConfirmModal";
import TaskItem from "../../components/todo-list/TaskItem";


export default function TodoList() {
  const {
    task, setTask,
    tasks,
    editTaskId,
    editText, setEditText,
    error,
    showModal, setShowModal,
    addTask,
    confirmDelete,
    deleteTask,
    toggleComplete,
    editTask,
    saveTask
  } = useTodo();

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
            <TaskItem
              key={item.id}
              item={item}
              editTaskId={editTaskId}
              editText={editText}
              setEditText={setEditText}
              toggleComplete={toggleComplete}
              editTask={editTask}
              saveTask={saveTask}
              confirmDelete={confirmDelete}
            />
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
