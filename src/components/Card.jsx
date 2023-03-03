import React, {useState} from 'react';

const Card = ({todo, updateHandler, dragStartHandler, dropHandler, isNew=false}) => {
  const [editing, setEditing] = useState(isNew);
  const [text, setText] = useState(todo.text);
  const [isDraging, setIsDraging] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDelete = () => {
    updateHandler(todo, 'delete');
  }

  const handleKey = (e) => {
    if (e.key === "Escape") {
      handleTextEdit(false)
    } else if (e.key === "Enter") {
      handleTextEdit(true)
    }
  }

  const handleCheck = () => {
    const updatedTodo = {...todo, completed: !todo.completed}
    updateHandler(updatedTodo, 'update');
  }

  const handleTextEdit = (result = false) => {
    if (result) {
      const updatedTodo = {...todo, text: text}
      updateHandler(updatedTodo, isNew ? 'create' : 'update');
      if (isNew)
        setText(todo.text);
    } else {
      setText(todo.text)
    }
    setEditing(isNew);
  }

  const handleDragStart = (e) => {
    setIsDraging(true);
    dragStartHandler(e);
  }

  const handleDragEnd = (e) => {
    setIsDraging(false);
  }

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  }

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  }

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    dropHandler(e);
  }

  return (
    <div className={`TodoCard ${isDragOver && 'TodoCard-DragOver'} ${isDraging && 'TodoCard-Dragging'}`}
         id={todo.id}
         draggable={!editing}
         onDragStartCapture={handleDragStart}
         onDragEndCapture={handleDragEnd}
         onDragEnterCapture={handleDragEnter}
         onDragLeaveCapture={handleDragLeave}
         onDropCapture={handleDrop}
         onDragOverCapture={handleDragOver}
    >
      <input id={'cb_' + todo.id}
             type='checkbox'
             checked={todo.completed}
             disabled={isNew}
             className='TodoCard-Check TodoCard-Check-hide'
             onChange={() => handleCheck(todo.id)} />
      <label htmlFor={'cb_' + todo.id} className='TodoCard-Check' />
      { editing
      ? (
          <input value={text}
                 type='text'
                 placeholder='Create a new todo...'
                 onChange={(e) => setText(e.target.value)}
                 onBlur={() => handleTextEdit(false)}
                 onKeyDown={handleKey}
                 className='TodoCard-TextEditor'/>
        )
      : (
          <div className='TodoCard-Text' contentEditable={editing} onDoubleClick={() => setEditing(true)}>
            {todo.text}
          </div>
        )
      }
      {!isNew &&
        <img className='TodoCard-Delete'
             src='/images/icon-cross.svg'
             onClick={handleDelete}
             alt='' />
      }
    </div>
  );
};

export default Card;