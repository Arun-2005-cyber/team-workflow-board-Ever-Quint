import React from "react";
import TaskCard from "./TaskCard";
import { Droppable, Draggable } from "@hello-pangea/dnd";

export default function TaskColumn({
  status,
  tasks,
  onEdit,
  onDelete,
  onChangeStatus
}) {
  return (
    <Droppable droppableId={status}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          style={{
            width: 330,
            background: snapshot.isDraggingOver
              ? "linear-gradient(180deg,#f0f5ff,#f7f9ff)"
              : "#fafafa",
            border: "1px solid #e5e5e5",
            borderRadius: 16,
            padding: "14px 12px",
            marginRight: 18,
            transition: "0.25s",
            boxShadow: snapshot.isDraggingOver
              ? "0 0 12px rgba(0,0,0,0.08)"
              : "0 0 3px rgba(0,0,0,0.04)",
            display: "flex",
            flexDirection: "column"
          }}
        >
          {/* Column Title */}
          <h3
            style={{
              marginTop: 0,
              marginBottom: 14,
              fontSize: 20,
              fontWeight: 700,
              color: "#333"
            }}
          >
            {status}
          </h3>

          {/* Tasks List */}
          <div style={{ flex: 1 }}>
            {tasks.map((task, index) => (
              <Draggable
                key={task.id}
                draggableId={String(task.id)}
                index={index}
              >
                {(prov, snap) => (
                  <div
                    ref={prov.innerRef}
                    {...prov.draggableProps}
                    {...prov.dragHandleProps}
                    style={{
                      marginBottom: 12,
                      borderRadius: 14,
                      transition: "0.2s",
                      transform: snap.isDragging
                        ? "rotate(1deg)"
                        : "rotate(0deg)",
                      boxShadow: snap.isDragging
                        ? "0 6px 16px rgba(0,0,0,0.10)"
                        : "none",
                      ...prov.draggableProps.style
                    }}
                  >
                    <TaskCard
                      task={task}
                      onEdit={onEdit}
                      onDelete={onDelete}
                      onChangeStatus={onChangeStatus}
                    />
                  </div>
                )}
              </Draggable>
            ))}
          </div>

          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}
