// src/pages/Home.jsx

import React from "react";
import TaskBoard from "../features/tasks/TaskBoard";

export default function Home() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Team Workflow Board</h1>
      <TaskBoard />
    </div>
  );
}
