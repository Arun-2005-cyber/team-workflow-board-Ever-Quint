// src/features/tasks/TaskBoard.jsx

import React, { useState } from "react";
import { useSelector } from "react-redux";
import TaskColumn from "./TaskColumn";
import useTaskFilters from "./useTaskFilters";
import TaskFormModal from "./TaskFormModal";
import ToastMessage from "../../components/ToastMessage";
import { TASK_STATUS } from "./taskTypes";

export default function TaskBoard() {
  const tasks = useSelector((state) => state.tasks.tasks);
  const {
    filteredTasks,
  } = useTaskFilters(tasks);

  const [editingTask, setEditingTask] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  const handleCloseToast = () => setToast({ ...toast, show: false });

  return (
    <div className="flex flex-col gap-6">
      {/* Board Columns */}
      <div className="flex gap-6">
        {Object.values(TASK_STATUS).map((status) => (
          <TaskColumn
            key={status}
            status={status}
            tasks={filteredTasks}
            onEdit={handleEdit}
          />
        ))}
      </div>

      {/* Task Form Modal */}
      {editingTask && (
        <TaskFormModal
          task={editingTask}
          onClose={() => setEditingTask(null)}
          setToast={setToast}
        />
      )}

      {/* Toast Message */}
      {toast.show && (
        <ToastMessage
          type={toast.type}
          message={toast.message}
          onClose={handleCloseToast}
        />
      )}
    </div>
  );
}
