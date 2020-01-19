import React from 'react';
import TodoListItem from '../todo-list-item';

const TodoList = () => {

    return (
        <ul className="list-group todo__list">
            <TodoListItem />
        </ul>
    )
}

export default TodoList;