import React, {useEffect, useState} from 'react';
import Card from "./Card.jsx";
import Header from "./Header.jsx";
import {useDispatch, useSelector} from "react-redux";
import {deleteTodo, todosSelector, updateTodo} from "../data/todosSlice.js";


const TodoList = () => {
  const todos1 = useSelector(todosSelector);
  const dispatch = useDispatch();
  const [todos, setTodos] = useState([]);
  const [dragId, setDragId] = useState();

  useEffect(() => {
    setTodos(todos1.map((t, i) => ({...t, order: i})));
  }, [todos1]);


  const handleTodoChange = (todo, action) => {
    switch (action) {
      case 'update':
        dispatch(updateTodo(todo));
        break;
      case 'delete':
        dispatch(deleteTodo(todo));
        break;
    }
  }

  const handleDrag = (event) => {
    setDragId(parseInt(event.currentTarget.id));
  };

  const handleDrop = (event) => {
    const dragCard = todos.find(todo => todo.id === dragId);
    const dropCard = todos.find(todo => todo.id === parseInt(event.currentTarget.id));
    const dragCardOrder = dragCard.order;
    const dropCardOrder = dropCard.order;
    console.log(event, dragCardOrder, dropCardOrder)

    console.log(dragCard, dropCard)
    const newState = todos.map((todo) => {
      if (todo.id === dragId) {
        todo.order = dropCardOrder;
      }
      if (todo.id === parseInt(event.currentTarget.id)) {
        todo.order = dragCardOrder;
      }
      return todo;
    });

    setTodos(newState);
  }

  return (
    <div className='TodoList'>
      <Header />
      <div className='TodoList-Container TodoList-Container-New'>

      </div>
      <div className='TodoList-Container'>
        {
          todos
            .sort((a, b) => a.order - b.order)
            .map(t => (
            <Card key={t.id} todo={t}
                  handleUpdate={handleTodoChange}
                  handleDrop={handleDrop}
                  handleDrag={handleDrag} />
          ))
        }
      </div>
    </div>
  );
};

export default TodoList;