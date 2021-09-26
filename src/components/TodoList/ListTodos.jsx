import React, { Fragment, useState, useEffect } from "react";
import { Table } from 'antd';
import EditTodo from "./EditTodo";

const ListTodos = ({ allTodos, setTodosChange }) => {
  console.log(allTodos);
  const [todos, setTodos] = useState([]); 

  console.log('todos ', todos)

  const columns = [
    {
      title: 'S/N',
      dataIndex: 'todo_id',
      key: 'todo_id',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Edit',
      dataIndex: 'edit',
      key: 'edit',
      render: (_, todo) => <EditTodo todo={todo} setTodosChange={setTodosChange} />,
      //render: (_, todos) => <span>{todos.description}</span>,
    },
    {
      title: 'Todo',
      dataIndex: 'todo',
      key: 'todo',
      render: (_, todo) => <button className="btn btn-danger" onClick={() => deleteTodo(todo.todo_id)}> Delete </button>,
    },
  ]

  //delete todo function

  async function deleteTodo(id) {
    try {
      await fetch(`http://localhost:5000/dashboard/todos/${id}`, {
        method: "DELETE",
        headers: { jwt_token: localStorage.token }
      });

      setTodos(todos.filter(todo => todo.todo_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    setTodos(allTodos);
  }, [allTodos]);

  console.log(todos);
  

  return (
    <Fragment>
      <Table columns={columns} dataSource={todos} pagination={{ pageSize: 5}} />
    </Fragment>
  );
};

export default ListTodos;
