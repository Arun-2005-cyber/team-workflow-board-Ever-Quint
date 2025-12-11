import React from "react";
import Card from "../../components/ui/Card";
import Tag from "../../components/ui/Tag";
import Select from "../../components/ui/Select";
import { timeAgo } from "../../utils/date";
import { Pencil, Trash2, Clock } from "lucide-react";

export default function TaskCard({
  task,
  onEdit,
  onDelete,
  onChangeStatus
}) {
  return (
    <Card
      className="task-card"
      style={{
        padding: "16px",
        borderRadius: "14px",
        background: "white",
        border: "1px solid #eee",
        boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
        transition: "0.2s",
        cursor: "grab"
      }}
    >
      {/* TOP SECTION */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: 16 }}>
            {task.title}
          </div>
          <div style={{ fontSize: 13, color: "#666", marginTop: 4 }}>
            {task.assignee || "Unassigned"}
          </div>
        </div>

        <div style={{ textAlign: "right" }}>
          <div
            style={{
              fontSize: 12,
              fontWeight: 600,
              padding: "2px 8px",
              borderRadius: 6,
              display: "inline-block",
              background:
                task.priority === "High"
                  ? "rgba(255, 77, 79, 0.15)"
                  : task.priority === "Low"
                  ? "rgba(82, 196, 26, 0.15)"
                  : "rgba(24, 144, 255, 0.15)",
              color:
                task.priority === "High"
                  ? "#ff4d4f"
                  : task.priority === "Low"
                  ? "#52c41a"
                  : "#1890ff"
            }}
          >
            {task.priority}
          </div>

          <div
            style={{
              fontSize: 12,
              color: "#999",
              marginTop: 8,
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: 4
            }}
          >
            <Clock size={14} /> {timeAgo(task.updatedAt)}
          </div>
        </div>
      </div>

      {/* TAGS */}
      <div style={{ marginTop: 10, display: "flex", gap: 6, flexWrap: "wrap" }}>
        {task.tags?.map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>

      {/* ACTIONS */}
      <div
        style={{
          marginTop: 14,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={() => onEdit(task)}
            style={{
              border: "none",
              background: "none",
              cursor: "pointer"
            }}
          >
            <Pencil size={18} color="#1890ff" />
          </button>

          <button
            onClick={() => onDelete(task.id)}
            style={{
              border: "none",
              background: "none",
              cursor: "pointer"
            }}
          >
            <Trash2 size={18} color="#ff4d4f" />
          </button>
        </div>

        <Select
          id={`status-${task.id}`}
          label=""
          value={task.status}
          onChange={(v) => onChangeStatus(task.id, v)}
          options={[
            { value: "Backlog", label: "Backlog" },
            { value: "In Progress", label: "In Progress" },
            { value: "Done", label: "Done" }
          ]}
        />
      </div>
    </Card>
  );
}
