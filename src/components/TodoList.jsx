import React, {useEffect, useState} from 'react';
import Card from "./Card.jsx";
import Header from "./Header.jsx";

const todos_init = [
  {
    id: 1,
    completed: false,
    text: 'Task #1'
  },
  {
    id: 2,
    completed: true,
    text: 'Task #2'
  },
  {
    id: 3,
    completed: true,
    text: 'Task #3'
  },
  {
    id: 4,
    completed: true,
    text: 'Task #4'
  },
  {
    id: 5,
    completed: true,
    text: 'Task #5'
  },
  {
    id: 6,
    completed: true,
    text: 'Task #6'
  },
  {
    id: 7,
    completed: true,
    text: 'Task #7'
  },
  {
    id: 8,
    completed: true,
    text: 'Task #8'
  },
]

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [dragId, setDragId] = useState();

  useEffect(() => {
    setTodos(todos_init.map((t, i) => ({...t, order: i})));
  }, [todos_init]);


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
      Todo List
      <div className='TodoList-Container'>
        {
          todos
            .sort((a, b) => a.order - b.order)
            .map(t => (
            <Card key={t.id} todo={t} handleDrop={handleDrop} handleDrag={handleDrag} />
          ))
        }
      </div>
    </div>
  );
};

export default TodoList;