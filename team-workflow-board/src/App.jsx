import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import TaskBoard from './features/tasks/TaskBoard';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<TaskBoard />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
