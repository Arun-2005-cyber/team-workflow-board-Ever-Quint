// src/features/tasks/TaskSlice.js

import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";

const STORAGE_KEY = "taskData";
const SCHEMA_VERSION = 2; // current version

// ----------------------
// Load tasks + apply migrations
// ----------------------
function loadTasksFromStorage() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));

    if (!saved) {
      return { tasks: [], schemaVersion: SCHEMA_VERSION, migrated: false };
    }


    if (saved.schemaVersion !== SCHEMA_VERSION) {
      const migrated = migrateData(saved);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
      return { ...migrated, migrated: true };
    }

    return { ...saved, migrated: false };
  } catch (e) {
    console.error("Storage error:", e);
    return { tasks: [], schemaVersion: SCHEMA_VERSION, migrated: false };
  }
}


function migrateData(oldData) {

  if (!oldData.schemaVersion || oldData.schemaVersion === 1) {
    const newTasks = oldData.tasks.map((t) => ({
      ...t,
      priority: t.priority || "Medium",
      tags: t.tags || [],
    }));

    return {
      schemaVersion: 2,
      tasks: newTasks,
    };
  }

  return oldData; 
}

// ----------------------
// Save tasks to localStorage
// ----------------------
function saveToStorage(state) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      schemaVersion: SCHEMA_VERSION,
      tasks: state.tasks,
    })
  );
}


const initialData = loadTasksFromStorage();

// ----------------------
// Redux Slice
// ----------------------
const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: initialData.tasks,
    migrated: initialData.migrated,
  },

  reducers: {
    // Create a new task
    createTask: (state, action) => {
      const now = dayjs().toISOString();

      const newTask = {
        id: uuidv4(),
        title: action.payload.title,
        description: action.payload.description,
        status: action.payload.status,
        priority: action.payload.priority,
        assignee: action.payload.assignee,
        tags: action.payload.tags || [],
        createdAt: now,
        updatedAt: now,
      };

      state.tasks.push(newTask);
      saveToStorage(state);
    },

    // Update task
    updateTask: (state, action) => {
      const { id, updates } = action.payload;
      const task = state.tasks.find((t) => t.id === id);

      if (task) {
        Object.assign(task, updates);
        task.updatedAt = dayjs().toISOString();
        saveToStorage(state);
      }
    },

    // Delete task
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
      saveToStorage(state);
    },

    // Move task to a new status (drag-and-drop or dropdown)
    changeStatus: (state, action) => {
      const { id, status } = action.payload;
      const task = state.tasks.find((t) => t.id === id);

      if (task) {
        task.status = status;
        task.updatedAt = dayjs().toISOString();
        saveToStorage(state);
      }
    },
  },
});

export const { createTask, updateTask, deleteTask, changeStatus } =
  tasksSlice.actions;

export default tasksSlice.reducer;
