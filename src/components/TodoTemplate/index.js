import { useState, useEffect } from "react";
import axios from "axios";
import "./TodoTemplate.scss";
import TodoHead from "../TodoHead";
import TodoList from "../TodoList";
import TodoCreate from "../TodoCreate";

function TodoTemplate() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios
      .get("/api/todos")
      .then((res) => {
        setTodos(res.data.todos);
      })
      .catch((err) => console.log(err));
  }, []);

  const onToggle = (id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    );
    setTodos(newTodos);
  };

  const onRemove = (id) => {
    axios
      .delete(`/api/todos/${id}/`)
      .then((res) => {
        const newTodos = todos.filter((todo) => todo.id !== id);
        setTodos(newTodos);
      })
      .catch((err) => console.log(err));
  };
  
  const onCreate = (text) => {
    const newTodo = { text };
    axios
      .post("/api/todos/create/", newTodo)
      .then((res) => {
        setTodos([...todos, res.data.todo]);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="template-container">
      <TodoHead todos={todos} />
      <TodoList todos={todos} onToggle={onToggle} onRemove={onRemove} />
      <TodoCreate onCreate={onCreate} />
    </div>
  );
}

export default TodoTemplate;
