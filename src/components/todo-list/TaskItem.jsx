export default function TaskItem({
  item,
  editTaskId,
  editText,
  setEditText,
  toggleComplete,
  editTask,
  saveTask,
  confirmDelete
}) {
  return (
    <li>
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
            {item.completed ? "Uncomplete" : "Complete"}
          </button>
          <button onClick={() => editTask(item)}>Edit</button>
          <button onClick={() => confirmDelete(item.id)}>Delete</button>
        </>
      )}
    </li>
  );
}
