import React, { useMemo, useState, useEffect } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import TaskColumn from "./TaskColumn";
import TaskForm from "./TaskForm";
import TaskFilters from "./TaskFilters";
import useTasks from "./userTasks";
import { ToastProvider, useToast } from "../../components/ui/ToastProvider";
import Button from "../../components/ui/Button";
import useFilterSync from "../../hooks/useFilterSync";
import { Plus } from "lucide-react";
import "./taskboard.css"; // styles below

function BoardInner() {
  const { tasks, addTask, updateTask, deleteTask, migrationPerformed } = useTasks();
  const { filters } = useFilterSync();
  const { show } = useToast();

  const [editing, setEditing] = useState(null);
  const [formOpen, setFormOpen] = useState(false);

  const taskToEdit = useMemo(() => editing, [editing]);

  // migration toast once
  useEffect(() => {
    if (migrationPerformed) show("Storage migrated to latest schema");
  }, [migrationPerformed, show]);

  // derived filtered tasks
  const filtered = useMemo(() => {
    let list = tasks.slice();
    if (filters.status && filters.status.length) list = list.filter((t) => filters.status.includes(t.status));
    if (filters.priority) list = list.filter((t) => t.priority === filters.priority);
    if (filters.q) {
      const q = filters.q.toLowerCase();
      list = list.filter((t) => (t.title || "").toLowerCase().includes(q) || (t.description || "").toLowerCase().includes(q));
    }
    if (filters.sort === "created") list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    if (filters.sort === "updated") list.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    if (filters.sort === "priority") {
      const rank = { High: 3, Medium: 2, Low: 1 };
      list.sort((a, b) => rank[b.priority] - rank[a.priority]);
    }
    return list;
  }, [tasks, filters]);

  const statuses = useMemo(() => ["Backlog", "In Progress", "Done"], []);

  function openNew() {
    setEditing(null);
    setFormOpen(true);
  }

  function handleSave(payload) {
    if (payload.id) {
      updateTask(payload);
      show("Task updated");
    } else {
      addTask(payload);
      show("Task created");
    }
  }

  function handleDelete(id) {
    deleteTask(id);
    show("Task deleted");
  }

  function handleChangeStatus(id, status) {
    const t = tasks.find((x) => x.id === id || String(x.id) === String(id));
    if (!t) return;
    updateTask({ ...t, status });
    show("Status updated");
  }

  // STABLE onDragEnd (do NOT wrap in useCallback with tasks dependency)
  function onDragEnd(result) {
    if (!result.destination) return;
    const taskId = result.draggableId;
    const newStatus = result.destination.droppableId;
    handleChangeStatus(taskId, newStatus);
  }

  return (
    <div className="app-shell board-v2">
      <div className="header header-v2">
        <div className="title-area">
          <h1>Team Workflow Board</h1>
          <div className="subtitle">Organize tasks — drag to move, click to edit or delete</div>
        </div>

        <div className="controls controls-v2">
          <TaskFilters />
          <Button onClick={openNew} aria-label="New Task" className="new-task-btn">
            <Plus size={14} style={{ marginRight: 8 }} /> New Task
          </Button>
        </div>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="board board-v2-columns">
          {statuses.map((s) => (
            <TaskColumn
              key={s}
              status={s}
              tasks={filtered.filter((t) => t.status === s)}
              onEdit={(t) => { setEditing(t); setFormOpen(true); }}
              onChangeStatus={handleChangeStatus}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </DragDropContext>

      <TaskForm open={formOpen} onClose={() => setFormOpen(false)} onSave={handleSave} initial={taskToEdit} />
    </div>
  );
}

export default function TaskBoardWithProviders() {
  return (
    <ToastProvider>
      <BoardInner />
    </ToastProvider>
  );
}
