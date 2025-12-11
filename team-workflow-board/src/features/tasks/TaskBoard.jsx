import React from 'react';
import TaskColumn from './TaskColumn';
import TaskFilters from './TaskFilters';

export default function TaskBoard({ tasks, updateTask, onOpenEdit }) {
  const statuses = ['Backlog', 'In Progress', 'Done'];
  return (
    <div>
      <TaskFilters />
      <div className="flex gap-4 mt-4">
        {statuses.map(status => (
          <TaskColumn key={status} status={status} tasks={tasks.filter(t => t.status === status)} updateTask={updateTask} onOpenEdit={onOpenEdit} />
        ))}
      </div>
    </div>
  );
}
