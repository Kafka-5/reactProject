import { useState, useRef, useMemo, useCallback, useEffect } from "react";
import styles from "./TasksManager.module.css";

export default function TasksManager() {
  const [tasks, setTasks] = useState<
    { id: number; text: string; completed: boolean }[]
  >([]);
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");

  const inputRef = useRef<HTMLInputElement | null>(null);

  // Auto-focus on input field
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Add a new task
  const addTask = () => {
    if (!input.trim()) return;

    setTasks((prev) => [
      ...prev,
      { id: Date.now(), text: input.trim(), completed: false },
    ]);

    setInput("");
  };

  // Toggle complete (useCallback required)
  const toggleTask = useCallback((id: number) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  }, []);

  // Filtered tasks using useMemo
  const filteredTasks = useMemo(() => {
    return tasks.filter((t) =>
      t.text.toLowerCase().includes(search.toLowerCase())
    );
  }, [tasks, search]);

  // Productivity Score
  const score = useMemo(() => {
    const completed = tasks.filter((t) => t.completed).length;
    const remaining = tasks.length - completed;
    return completed * 10 - remaining * 2;
  }, [tasks]);

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Tasks Manager</h2>

      {/* Input row */}
      <div className={styles.inputRow}>
        <input
          ref={inputRef}
          className={styles.inputField}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new task..."
        />

        <button className={styles.addButton} onClick={addTask}>
          Add
        </button>
      </div>

      {/* Search */}
      <input
        className={styles.searchBar}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search tasks..."
      />

      {/* Score */}
      <p>
        <strong>Productivity Score:</strong> {score}
      </p>

      {/* Task list */}
      <ul className={styles.taskList}>
        {filteredTasks.map((task) => (
          <li
            key={task.id}
            onClick={() => toggleTask(task.id)}
            className={`${styles.taskItem} ${
              task.completed ? styles.completed : ""
            }`}
          >
            {task.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
