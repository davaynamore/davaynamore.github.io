import React, { useContext } from 'react';
import TodoContext from '../context';

const Counter = () => {
    const {todos} = useContext(TodoContext);
    const completed = todos.filter(({completed}) => completed).length;
    const uncompleted = todos.filter(({completed}) => !completed).length;

    return (
        <ul className="todo__counter">
            <li>
                <span>
                    Total: {todos.length}
                </span>
            </li>
            <li>
                <span>
                    Completed: {completed}
                </span>
            </li>
            <li>
                <span>
                    Uncomplited: {uncompleted}
                </span>
            </li>
        </ul>
    )
}

export default Counter;