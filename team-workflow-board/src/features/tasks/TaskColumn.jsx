// src/features/tasks/TaskColumn.jsx

import React from "react";
import TaskCard from "./TaskCard";
import { TASK_STATUS } from "./taskTypes";

export default function TaskColumn({ status, tasks, onEdit }) {
  // Filter tasks belonging to this column
  const columnTasks = tasks.filter((t) => t.status === status);

  return (
    <div className="flex-1 bg-gray-50 p-4 rounded-lg shadow min-h-[300px] flex flex-col gap-3">
      <h2 className="font-bold text-lg mb-2">{status}</h2>

      {columnTasks.length === 0 ? (
        <p className="text-gray-400 text-sm">No tasks here</p>
      ) : (
        columnTasks.map((task) => (
          <TaskCard key={task.id} task={task} onEdit={onEdit} />
        ))
      )}
    </div>
  );
}
