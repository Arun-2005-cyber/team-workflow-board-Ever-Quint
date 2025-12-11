/* eslint-disable no-undef */
/**
 * Basic filtering test.
 * We pre-populate localStorage with tasks and then render the board with filter applied via URL.
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TaskBoard from '../src/features/tasks/TaskBoard';

const sampleStore = {
  schemaVersion: 2,
  tasks: [
    { id: '1', title: 'Low prio', priority: 'Low', status: 'Backlog', description: '', assignee: '', tags: [], createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: '2', title: 'High prio', priority: 'High', status: 'Backlog', description: '', assignee: '', tags: [], createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
  ]
};

beforeEach(() => {
  localStorage.setItem('team-workflow-storage', JSON.stringify(sampleStore));
});

afterEach(() => {
  localStorage.clear();
});

test('filter by priority via URL', async () => {
  render(
    <MemoryRouter initialEntries={['/?priority=High']}>
      <TaskBoard />
    </MemoryRouter>
  );

  expect(await screen.findByText('High prio')).toBeInTheDocument();
  expect(screen.queryByText('Low prio')).toBeNull();
});
