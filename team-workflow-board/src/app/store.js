import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "../features/tasks/TaskSlice";

// Creating the Redux store
const store = configureStore({
  reducer: {
    tasks: tasksReducer, // Registering our "tasks" slice here
  },
});

export default store;
