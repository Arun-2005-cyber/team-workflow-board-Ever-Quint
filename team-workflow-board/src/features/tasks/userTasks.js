/* eslint-disable react-hooks/refs */
import { useReducer, useEffect, useRef } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import { migrateStorage, CURRENT_SCHEMA_VERSION } from "../../utils/storageMigrations";
import { nowISO } from "../../utils/date";
import { v4 as uuidv4 } from "uuid";

const initialState = { tasks: [] };

function reducer(state, action) {
  switch (action.type) {
    case "SET":
      return { ...state, tasks: action.payload };
    case "ADD":
      return { ...state, tasks: [action.payload, ...state.tasks] };
    case "UPDATE":
      return { ...state, tasks: state.tasks.map((t) => (t.id === action.payload.id ? action.payload : t)) };
    case "DELETE":
      return { ...state, tasks: state.tasks.filter((t) => t.id !== action.payload) };
    default:
      return state;
  }
}

export default function useTasks() {
  const [raw, setRaw] = useLocalStorage("team-workflow-storage", { schemaVersion: CURRENT_SCHEMA_VERSION, tasks: [] });
  const [state, dispatch] = useReducer(reducer, initialState);
  const migrationPerformed = useRef(false);

  useEffect(() => {
    const { data, migrated } = migrateStorage(raw);
    if (migrated) {
      setRaw(data);
      migrationPerformed.current = true;
    }
    dispatch({ type: "SET", payload: data.tasks || [] });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setRaw({ schemaVersion: CURRENT_SCHEMA_VERSION, tasks: state.tasks });
  }, [state.tasks]);

  function addTask(payload) {
    const now = nowISO();
    const task = {
      id: uuidv4(),
      title: payload.title || "",
      description: payload.description || "",
      status: payload.status || "Backlog",
      priority: payload.priority || "Medium",
      assignee: payload.assignee || "",
      tags: payload.tags || [],
      createdAt: now,
      updatedAt: now
    };
    dispatch({ type: "ADD", payload: task });
    return task;
  }

  function updateTask(task) {
    const t = { ...task, updatedAt: nowISO() };
    dispatch({ type: "UPDATE", payload: t });
    return t;
  }

  function deleteTask(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  return {
    tasks: state.tasks,
    addTask,
    updateTask,
    deleteTask,
    migrationPerformed: migrationPerformed.current
  };
}
