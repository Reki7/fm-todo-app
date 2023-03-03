import React from 'react';
import {useResize} from "../hooks/useResize.js";

const Filter = ({todosLeft, filter, setFilter, clearCompleted}) => {
  const handleFilter = (e) => {
    setFilter(e.target.value);
  }

  const layout = useResize();

  const filterOptions = (
    <div className='Filter-Options'>
      <input type="radio"
             id="filter-all"
             name="filter"
             value="all"
             onChange={handleFilter}
             checked={filter === 'all'} />
      <label htmlFor="filter-all">All</label>
      <input type="radio"
             id="filter-active"
             name="filter"
             value="active"
             onChange={handleFilter}
             checked={filter === 'active'} />
      <label htmlFor="filter-active">Active</label>
      <input type="radio"
             id="filter-completed"
             name="filter"
             value="completed"
             onChange={handleFilter}
             checked={filter === 'completed'} />
      <label htmlFor="filter-completed">Completed</label>
    </div>
  );

  return (
    <>
      <div className='TodoList-Container TodoList-Container-Filter'>
        <div className='Filter'>
          <div>{todosLeft} {todosLeft === 1 ? 'item' : 'items'} left</div>
          {layout === 'desktop' && filterOptions}
          <div className='Filter-ClearCompleted' onClick={() => clearCompleted()}>Clear Completed</div>
        </div>
      </div>
    {layout === 'mobile' && (
      <div className='TodoList-Container TodoList-Container-FilterIsle'>
        <div className='Filter'>
          { filterOptions }
        </div>
      </div>
    )}
    </>
  );
};

export default Filter;