// src/features/tasks/taskTypes.js

// Task Status Values
export const TASK_STATUS = {
  BACKLOG: "Backlog",
  IN_PROGRESS: "In Progress",
  DONE: "Done",
};

// Task Priority Values
export const TASK_PRIORITY = {
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
};

// Default empty task template (used for creating new tasks)
export const EMPTY_TASK = {
  title: "",
  description: "",
  status: TASK_STATUS.BACKLOG,
  priority: TASK_PRIORITY.MEDIUM,
  assignee: "",
  tags: [],
};
