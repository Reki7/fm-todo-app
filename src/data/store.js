import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./todosSlice.js";

export const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
})