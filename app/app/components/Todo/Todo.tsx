'use client'

import { useState } from 'react';

import {
  todoSlice,
  useSelector,
  useDispatch,
  getTodos
} from '@/lib/redux';
import { LuDelete } from "react-icons/lu";
import styles from './todo.module.css';

export const Todo = () => {
  const dispatch = useDispatch()
  const todoList = useSelector(getTodos)
  const [currentTodo, setCurrentTodo] = useState('');

  const handleAddTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTodo(e.target.value);
  }

  const handleAdd = () => {
    if(!currentTodo) return;
    dispatch(todoSlice.actions.addItem(currentTodo));
    setCurrentTodo("")
  }

  return (
    <div>
      <h2 data-test-id="heading">Todo App</h2>
      <div className={styles.row}>
        <div className={styles.wrapper}>
          <input data-test-id="add-todo-input" type="text" placeholder='Add todo' className={styles.input} value={currentTodo} onChange={handleAddTodo} />
          <button
            className={styles.button}
            aria-label="Add todo"
            onClick={handleAdd}
            data-test-id='add-todo-button'
          >Add</button>
        </div>
      </div>
      {todoList.length === 0 && <div className={styles.row}>
        <p className={styles.paragraph} data-test-id="no-todo">No todos</p></div>}
      {todoList.length > 0 && (
        <>
        <hr />
        <div>
        {
          todoList.map((todo) => {
            return (
              <div key={todo?.id} className={styles.todoItem} data-test-id={`todo-${todo?.title?.split(" ").join("-").toLowerCase()}`}>
                <div className={styles.todoLeft} data-test-id="todo-item">
                  <input data-test-id="todo-checkbox" className={styles.todoCheckbox} type="checkbox" checked={todo?.completed} onChange={() => dispatch(todoSlice.actions.toggleItem(todo?.id))} />
                  <p data-test-id="todo-title" className={`${styles.todoTitle} ${todo?.completed ? styles?.completed : ''}`}>{todo.title}</p>
                </div>
                <LuDelete data-test-id="todo-delete" className={styles.todoRight} onClick={() => dispatch(todoSlice.actions.removeItem(todo?.id))} />
              </div>
            )
          })
        }
        </div>
        </>
      )}
    </div>
  )
}
