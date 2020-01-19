import React, { useState, useEffect } from 'react';
import TodoService from '../api';
import TodoList from './todo-list';
import TodoContext from './context';
import Counter from './counter';
import Filter from './filter';
import Spinner from './spinner';
import './App.scss';

const todoApi = new TodoService();

function App() {

  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState();

  useEffect(() => {
    todoApi.getAllTodos()
      .then(data => {
        setTimeout(() => {
          setTodos(data);
        }, 1500);
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    console.log("TCL: App -> todos", todos)
  }, [todos]);

  const handlerTodo = (id, type) => {
    const newTodos = [...todos];
    const index = newTodos.findIndex(todo => id === todo.id);
    if (type === 'toggle') {
      newTodos[index].completed = !newTodos[index].completed;
      setTodos(newTodos);
    } else if (type === 'delete') {
      setTodos([
        ...newTodos.slice(0, index),
        ...newTodos.slice(index + 1)
      ])
    }
  }

  const filterTodos = (filter) => {
    switch(filter) {
      case true:
        setFilter(true);
        break;
      case false:
        setFilter(false);
        break;
      default:
        setFilter();
        break;
    }
  }

  const context = {
    todos,
    handlerTodo,
    filterTodos,
    filter
  };

  return (
    <TodoContext.Provider value={context}>
      <div className="container jumbotron">
        <div className="row">
          <div className="col">

            <div className="todo">
              <h1 className="todo__title">todo list</h1>
              {
                todos.length ? (
                  <React.Fragment>
                    <Counter />
                    <Filter />
                    <TodoList />
                  </React.Fragment>
                ) : <Spinner />
              }
            </div>

          </div>
        </div>
      </div>
    </TodoContext.Provider>
  );
}

export default App;
