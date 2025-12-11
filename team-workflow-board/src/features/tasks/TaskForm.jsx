import React, { useEffect } from "react";
import Modal from "../../components/ui/Modal";
import TextInput from "../../components/ui/TextInput";
import TextArea from "../../components/ui/TextArea";
import Select from "../../components/ui/Select";
import Button from "../../components/ui/Button";
import useDirtyForm from "../../hooks/useDirtyForm";
import { X } from "lucide-react";

export default function TaskForm({ open, onClose, onSave, initial }) {
  const defaults = {
    title: "",
    description: "",
    status: "Backlog",
    priority: "Medium",
    assignee: "",
    tags: []
  };

  const { values, setValues, reset, dirty } = useDirtyForm(initial || defaults);

  useEffect(() => {
    if (open) reset(initial || defaults);
    // only run when modal opens/closes (do not depend on initial to avoid mid-typing resets)
  }, [open]); // eslint-disable-line

  const handleChange = (field) => (value) => {
    if (field === "tags") {
      const arr = value.split(",").map((x) => x.trim()).filter(Boolean);
      setValues((p) => ({ ...p, tags: arr }));
    } else {
      setValues((p) => ({ ...p, [field]: value }));
    }
  };

  function onSubmit(e) {
    e.preventDefault();
    if (!values.title || !values.title.trim()) {
      alert("Title is required");
      return;
    }
    onSave({ ...initial, ...values });
    onClose();
  }

  return (
    <Modal open={open} onClose={() => { if (!dirty || confirm("Discard changes?")) onClose(); }} title={initial ? "Edit Task" : "New Task"}>
      <form onSubmit={onSubmit}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ margin: 0 }}>{initial ? "Edit Task" : "New Task"}</h2>
          <button type="button" className="icon-btn" onClick={() => { if (!dirty || confirm("Discard changes?")) onClose(); }}><X size={18} /></button>
        </div>

        <div style={{ marginTop: 12 }}>
          <TextInput id="t-title" label="Title" value={values.title} onChange={handleChange("title")} required />
          <TextArea id="t-desc" label="Description" value={values.description} onChange={handleChange("description")} rows={4} />
          <div className="form-row">
            <Select id="t-status" label="Status" value={values.status} onChange={handleChange("status")} options={[
              { value: "Backlog", label: "Backlog" }, { value: "In Progress", label: "In Progress" }, { value: "Done", label: "Done" }
            ]} />
            <Select id="t-priority" label="Priority" value={values.priority} onChange={handleChange("priority")} options={[
              { value: "High", label: "High" }, { value: "Medium", label: "Medium" }, { value: "Low", label: "Low" }
            ]} />
          </div>

          <div className="form-row">
            <TextInput id="t-assignee" label="Assignee" value={values.assignee} onChange={handleChange("assignee")} />
            <TextInput id="t-tags" label="Tags (comma separated)" value={(values.tags || []).join(", ")} onChange={handleChange("tags")} />
          </div>

          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 12 }}>
            <Button type="button" variant="secondary" onClick={() => { if (!dirty || confirm("Discard changes?")) onClose(); }}>Cancel</Button>
            <Button type="submit">Save</Button>
          </div>
        </div>
      </form>
    </Modal>
  );
}
