import React from 'react';

const Card = ({todo, clickHandler=()=>{}, handleDrag, handleDrop}) => {


  const handleDragOver = (event) => {

  }

  return (
    <div className='TodoCard'
         id={todo.id}
         draggable={true}
         onDragStart={handleDrag}
         onDrop={handleDrop}
         onDragOver={e => e.preventDefault()} >
      <input type='checkbox' checked={todo.completed} className='TodoCard-Check' onChange={clickHandler} />
      {/*<div className='TodoCard-Check'></div>*/}
      <div className='TodoCard-Text'>
        {todo.text}
      </div>
      <img className='TodoCard-Delete' src='/images/icon-cross.svg' />
    </div>
  );
};

export default Card;