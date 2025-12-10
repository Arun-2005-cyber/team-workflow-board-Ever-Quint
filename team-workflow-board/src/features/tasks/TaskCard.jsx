// src/features/tasks/TaskCard.jsx

import React from "react";
import Card from "../../components/ui/Card";
import Tag from "../../components/ui/Tag";
import Button from "../../components/ui/Button";
import Select from "../../components/ui/Select";
import { useDispatch } from "react-redux";
import { deleteTask, updateTask } from "./";
import { TASK_STATUS, TASK_PRIORITY } from "./taskTypes";

// Outside TaskCard component
// eslint-disable-next-line react-refresh/only-export-components
export function relativeTime(timestamp) {
  if (!timestamp) return "updated just now";

  const diff = Date.now() - new Date(timestamp).getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));

  if (hours === 0) return "updated just now";
  if (hours === 1) return "updated 1 hour ago";
  return `updated ${hours} hours ago`;
}

export default function TaskCard({ task, onEdit }) {
  const dispatch = useDispatch();

  // Format time difference like: "updated 3 hours ago"
//   function relativeTime(timestamp) {
//     const diff = Date.now() - timestamp;
//     const hours = Math.floor(diff / (1000 * 60 * 60));

//     if (hours === 0) return "updated just now";
//     if (hours === 1) return "updated 1 hour ago";
//     return `updated ${hours} hours ago`;
//   }

  // Handle status change
  function handleStatusChange(e) {
    dispatch(updateTask({ id: task.id, status: e.target.value }));
  }

  // Priority color
  const priorityColor =
    task.priority === TASK_PRIORITY.HIGH
      ? "text-red-600"
      : task.priority === TASK_PRIORITY.MEDIUM
      ? "text-yellow-600"
      : "text-green-600";
      

  return (
    <Card className="p-4 flex flex-col gap-3">
      {/* Task Title */}
      <h3 className="font-semibold text-lg">{task.title}</h3>

      {/* Assignee */}
      {task.assignee && (
        <p className="text-sm text-gray-600">
          Assigned to: <span className="font-medium">{task.assignee}</span>
        </p>
      )}

      {/* Priority */}
      <p className={`text-sm font-semibold ${priorityColor}`}>
        Priority: {task.priority}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {task.tags.map((tag, i) => (
          <Tag key={i}>{tag}</Tag>
        ))}
      </div>

      {/* Updated time */}
      <p className="text-xs text-gray-400">{relativeTime(task.updatedAt)}</p>

      {/* Status dropdown */}
      <Select value={task.status} onChange={handleStatusChange}>
        <option value={TASK_STATUS.BACKLOG}>Backlog</option>
        <option value={TASK_STATUS.IN_PROGRESS}>In Progress</option>
        <option value={TASK_STATUS.DONE}>Done</option>
      </Select>

      {/* Buttons (Edit + Delete) */}
      <div className="flex justify-between mt-2">
        <Button variant="secondary" size="sm" onClick={() => onEdit(task)}>
          Edit
        </Button>

        <Button
          variant="destructive"
          size="sm"
          onClick={() => dispatch(deleteTask(task.id))}
        >
          Delete
        </Button>
      </div>
    </Card>
  );
  
}

