import React, { Fragment, useState, useEffect } from "react";
import { Button, Table } from 'antd';
import EditTodo from "./EditTodo";
import { toast } from "react-toastify";
const ListTodos = ({ allTodos, setTodosChange }) => {
  const [todos, setTodos] = useState([]); 
  const columns = [
    {
      title: 'S/N',
      dataIndex: 'todo_id',
      key: 'todo_id',
    },
    {
      title: 'Todo',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Edit',
      dataIndex: 'edit',
      key: 'edit',
      render: (_, todo) => <EditTodo  todo={todo} setTodosChange={setTodosChange} />,
    },
    {
      title: 'Todo',
      dataIndex: 'todo',
      key: 'todo',
      render: (_, todo) => <Button key={`delete-todo-${todo.todo_id}`} danger onClick={() => deleteTodo(todo.todo_id)}> Delete </Button>,
    },
  ]

  // Delete todo function
  async function deleteTodo(id) {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/dashboard/todos/${id}`, {
        method: "DELETE",
        headers: { jwt_token: localStorage.token }
      });

      setTodos(todos.filter(todo => todo.todo_id !== id));
      toast.success(`Todo ${id} deleted successfully`);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    setTodos(allTodos);
  }, [allTodos]);

  return (
    <Fragment>
      <Table columns={columns} dataSource={todos} pagination={{ pageSize: 5}} />
    </Fragment>
  );
};

export default ListTodos;
