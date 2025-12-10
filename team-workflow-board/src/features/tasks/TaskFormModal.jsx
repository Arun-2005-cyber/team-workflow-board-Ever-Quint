// src/features/tasks/TaskFormModal.jsx

import React, { useState, useEffect } from "react";
import Modal from "../../components/ui/Modal";
import Button from "../../components/ui/Button";
import TextInput from "../../components/ui/TextInput";
import Select from "../../components/ui/Select";
import { useDispatch } from "react-redux";
import { addTask, updateTask } from "./tasksSlice";
import { TASK_STATUS, TASK_PRIORITY, EMPTY_TASK } from "./taskTypes";

export default function TaskFormModal({ task = EMPTY_TASK, onClose, setToast }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ ...task });

  // eslint-disable-next-line no-unused-vars
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFormData({ ...task });
  }, [task]);

  const handleChange = (e) => {
    setDirty(true);
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title) {
      setToast({ show: true, message: "Title is required", type: "error" });
      return;
    }

    if (task.id) {
      dispatch(updateTask({ ...formData }));
      setToast({ show: true, message: "Task updated", type: "success" });
    } else {
      dispatch(addTask(formData));
      setToast({ show: true, message: "Task created", type: "success" });
    }

    onClose();
    setDirty(false);
  };

  return (
    <Modal open={true} onClose={onClose} title={task.id ? "Edit Task" : "Create Task"}>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <TextInput
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <TextInput
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          textarea
        />

        <TextInput
          label="Assignee"
          name="assignee"
          value={formData.assignee}
          onChange={handleChange}
        />

        <Select name="status" label="Status" value={formData.status} onChange={handleChange}>
          {Object.values(TASK_STATUS).map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </Select>

        <Select name="priority" label="Priority" value={formData.priority} onChange={handleChange}>
          {Object.values(TASK_PRIORITY).map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </Select>

        <Button type="submit">{task.id ? "Update Task" : "Create Task"}</Button>
      </form>
    </Modal>
  );
}
