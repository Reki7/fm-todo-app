import React, {useEffect, useState} from 'react';
import Card from "./Card.jsx";
import Header from "./Header.jsx";
import {useDispatch, useSelector} from "react-redux";
import {createTodo, deleteCompleted, deleteTodo, todosSelector, updateTodo} from "../data/todosSlice.js";
import Filter from "./Filter.jsx";


const TodoList = () => {
  const todos = useSelector(todosSelector);
  const dispatch = useDispatch();
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [todosLeft, setTodosLeft] = useState(0);
  const [dragId, setDragId] = useState();

  useEffect(() => {
    const ffunc = (todo) => (
      filter === 'all'
      || (filter === 'active' && !todo.completed)
      || (filter === 'completed' && todo.completed)
    )
    let lTodos = 0;
    const tTodos = todos.filter(ffunc)
      .map((t, i) => {
        if (!t.completed)
          lTodos += 1;
        return {...t, order: i}
      });
    setFilteredTodos(tTodos);
    setTodosLeft(lTodos);
  }, [todos, filter]);


  const handleTodoChange = (todo, action) => {
    switch (action) {
      case 'update':
        dispatch(updateTodo(todo));
        break;
      case 'delete':
        dispatch(deleteTodo(todo));
        break;
      case 'create':
        dispatch(createTodo(todo));
        break;
    }
  }

  const clearCompleted = () => {
    console.log('Clear')
    dispatch(deleteCompleted());
  }

  const handleDrag = (event) => {
    setDragId(parseInt(event.currentTarget.id));
  };

  const handleDrop = (event) => {
    const dragCard = filteredTodos.find(todo => todo.id === dragId);
    const dropCard = filteredTodos.find(todo => todo.id === parseInt(event.currentTarget.id));
    const dragCardOrder = dragCard.order;
    const dropCardOrder = dropCard.order;
    console.log(event, dragCardOrder, dropCardOrder)

    console.log(dragCard, dropCard)
    const newState = filteredTodos.map((todo) => {
      if (todo.id === dragId) {
        todo.order = dropCardOrder;
      }
      if (todo.id === parseInt(event.currentTarget.id)) {
        todo.order = dragCardOrder;
      }
      return todo;
    });

    setFilteredTodos(newState);
  }

  return (
    <div className='TodoList'>
      <Header />
      <div className='TodoList-Container TodoList-Container-New'>
        <Card todo={{
          id: 0,
          completed: false,
          text: ''
        }} handleUpdate={handleTodoChange} isNew={true} />
      </div>
      <div className='TodoList-Container TodoList-Container-MainList'>
        {
          filteredTodos
            .sort((a, b) => a.order - b.order)
            .map(t => (
            <Card key={t.id} todo={t}
                  handleUpdate={handleTodoChange}
                  handleDrop={handleDrop}
                  handleDrag={handleDrag} />
          ))
        }
      </div>
      <Filter todosLeft={todosLeft}
              filter={filter}
              setFilter={setFilter}
              clearCompleted={clearCompleted} />
    </div>
  );
};

export default TodoList;