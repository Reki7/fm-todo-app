import React, {useState} from 'react';

const Card = ({todo, handleUpdate, handleDrag, handleDrop}) => {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(todo.text);

  const handleDelete = () => {
    handleUpdate(todo, 'delete');
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
    handleUpdate(updatedTodo, 'update');
  }

  const handleTextEdit = (result = false) => {
    setEditing(false);
    if (result) {
      const updatedTodo = {...todo, text: text}
      handleUpdate(updatedTodo, 'update');
    } else {
      setText(todo.text)
    }
  }

  // const handleDragOver = (event) => {
  //
  // }

  return (
    <div className='TodoCard'
         id={todo.id}
         draggable={true}
         onDragStart={handleDrag}
         onDrop={handleDrop}
         onDragOver={e => e.preventDefault()} >
      <input id={'cb_' + todo.id}
             type='checkbox'
             checked={todo.completed}
             className='TodoCard-Check TodoCard-Check-hide'
             onChange={() => handleCheck(todo.id)} />
      <label htmlFor={'cb_' + todo.id} className='TodoCard-Check' />
      { editing
      ? (
          <input value={text}
                 type='text'
                 onChange={(e) => setText(e.target.value)}
                 onBlur={handleTextEdit}
                 onKeyDown={handleKey}
                 className='TodoCard-TextEditor'/>
        )
      : (
          <div className='TodoCard-Text' contentEditable={editing} onDoubleClick={() => setEditing(true)}>
            {todo.text}
          </div>
        )
      }
      <img className='TodoCard-Delete'
           src='/images/icon-cross.svg'
           onClick={handleDelete}
           alt='' />
    </div>
  );
};

export default Card;