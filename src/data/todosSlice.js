import {createSlice} from "@reduxjs/toolkit";
import {todos_init} from "./data.js";

const initialState = {
  todos: todos_init,
}

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    createTodo(state, action) {
      state.todos = [...state.todos, {...action.payload, id: new Date().getTime()}]
    },
    updateTodo(state, action) {
      state.todos = state.todos.map(todo => {
        if (todo.id === action.payload.id)
          return {...todo, ...action.payload}
        else
          return todo
      });
    },
    deleteTodo(state, action) {
      state.todos = state.todos.filter(todo => todo.id !== action.payload.id)
    },
    deleteCompleted(state, action) {
      state.todos = state.todos.filter(todo => !todo.completed);
    },
  }
})

export const { createTodo, updateTodo, deleteTodo, deleteCompleted } = todosSlice.actions;
export const todosSelector = state => state.todos.todos;

export default todosSlice.reducer;
