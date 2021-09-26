import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button, Layout, Menu } from "antd";

//components
import InputTodo from "../../components/TodoList/InputTodo";
import ListTodos from "../../components/TodoList/ListTodos";
const { Header, Content } = Layout;

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");
  const [allTodos, setAllTodos] = useState([]);
  const [todosChange, setTodosChange] = useState(false);

  console.log('allTodos ', allTodos);

  const capitalizeFirstChar = (text) => {
    let result = text.toLowerCase();
    return result.charAt(0).toUpperCase() + result.slice(1);
  }

  const getProfile = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/dashboard/`, {
        method: "GET",
        headers: { jwt_token: localStorage.token }
      });

      const parseData = await res.json();
      console.log('parseData ', parseData);

      setAllTodos(parseData);

      setName(parseData[0].user_name);
    } catch (err) {
      console.error(err.message);
    }
  };

  const logout = async e => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(false);
      toast.success("Logout successfully");
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProfile();
    setTodosChange(false);
  }, [todosChange]); 

  console.log('allTodos ', allTodos);
  console.log('allTodos ', allTodos.isEmpty);
  console.log('allTodos length ', allTodos.length);
  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          style={{ lineHeight: "64px" }}
        >
          <Menu.Item key="1">Todos Dashboard</Menu.Item>
          <Menu.Item key="2"><span>{capitalizeFirstChar(name)}'s todo list</span></Menu.Item>
          <Menu.Item key="3"><Button onClick={(event) => logout(event)}>Logout</Button></Menu.Item>
        </Menu>
      </Header>

      <Content style={{ padding: "0 50px" }}>
        <InputTodo setTodosChange={setTodosChange} />

{/* Continue from here */}
        {allTodos.length < 1 && allTodos[0].todo_id !== 'null' ? 
          <h1>No todos found</h1> : <ListTodos allTodos={allTodos} setTodosChange={setTodosChange} />}
      </Content>

    </Layout>

  );
};

export default Dashboard;
