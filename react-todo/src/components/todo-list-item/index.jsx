import React, { useContext } from 'react';
import TodoContext from '../context';

const TodoListItem = () => {
    
    const {todos, handlerTodo, filter} = useContext(TodoContext);

    return (
        todos.filter(todo => {
                if (filter === undefined) {
                    return todo;
                }
                if (filter === true) {
                    return todo.completed === true;
                }
                if (filter === false) {
                    return todo.completed === false;
                }
            }
            )
            .map(({id, title, completed}) => {
                return (
                    <li key={id} className="list-group-item todo__item">
                        <label className="todo__label">
                        <div>
                            <input
                                className="todo__input"
                                type="checkbox"
                                checked={completed}
                                onChange={() => handlerTodo(id, 'toggle')}/>
                            <span className="todo__text">{title}</span>
                        </div>
                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => handlerTodo(id, 'delete')}>
                                Delete</button>
                        </label>
                    </li>
                );
            })
    )
}

export default TodoListItem;