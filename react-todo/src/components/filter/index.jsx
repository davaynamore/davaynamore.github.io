import React, { useContext } from 'react';
import TodoContext from '../context';

const Filter = () => {
    const {filterTodos} = useContext(TodoContext);
    return (
        <div className="btn-group todo__filter" role="group" aria-label="Basic example">
            <button
                type="button"
                className="btn btn-primary"
                onClick={() => filterTodos()}
                >
                All</button>
            <button
                type="button"
                className="btn btn-success"
                onClick={() => filterTodos(true)}
                >
                Completed</button>
            <button
                type="button"
                className="btn btn-warning"
                onClick={() => filterTodos(false)}
                >
                Uncompleted</button>
        </div>
    )
}

export default Filter;