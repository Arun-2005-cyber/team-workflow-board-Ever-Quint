import { useReducer, useEffect, useRef } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import { migrateStorage, CURRENT_SCHEMA_VERSION } from '../../utils/storageMigrations';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';

const initialState = { tasks: [] };

function reducer(state, action) {
  switch (action.type) {
    case 'SET':
      return { ...state, tasks: action.payload };
    case 'ADD':
      return { ...state, tasks: [action.payload, ...state.tasks] };
    case 'UPDATE':
      return {
        ...state,
        tasks: state.tasks.map(t => (t.id === action.payload.id ? action.payload : t))
      };
    case 'DELETE':
      return { ...state, tasks: state.tasks.filter(t => t.id !== action.payload) };
    default:
      return state;
  }
}

export default function useTasks() {
  const [rawStore, setRawStore] = useLocalStorage('team-workflow-storage', { schemaVersion: CURRENT_SCHEMA_VERSION, tasks: [] });
  const [state, dispatch] = useReducer(reducer, initialState);
  const migratedRef = useRef(null);

  // on mount: migrate if needed and initialize state
  useEffect(() => {
    const { data, migrated } = migrateStorage(rawStore);
    if (migrated) {
      setRawStore(data);
      migratedRef.current = true;
    }
    const tasks = (data && data.tasks) || [];
    dispatch({ type: 'SET', payload: tasks });
  }, []); // eslint-disable-line

  // persist on tasks change
  useEffect(() => {
    setRawStore({ schemaVersion: CURRENT_SCHEMA_VERSION, tasks: state.tasks });
  }, [state.tasks]); // eslint-disable-line

  const addTask = (payload) => {
    const now = new Date().toISOString();
    const task = {
      id: uuidv4(),
      title: payload.title,
      description: payload.description || '',
      status: payload.status || 'Backlog',
      priority: payload.priority || 'Medium',
      assignee: payload.assignee || '',
      tags: payload.tags || [],
      createdAt: now,
      updatedAt: now
    };
    dispatch({ type: 'ADD', payload: task });
    return task;
  };

  const updateTask = (task) => {
    const t = { ...task, updatedAt: new Date().toISOString() };
    dispatch({ type: 'UPDATE', payload: t });
    return t;
  };

  const deleteTask = (id) => dispatch({ type: 'DELETE', payload: id });

  return {
    tasks: state.tasks,
    addTask,
    updateTask,
    deleteTask,
    migrationPerformed: migratedRef.current
  };
}
