import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button, Layout, Menu } from "antd";
import InputTodo from "../../components/TodoList/InputTodo";
import ListTodos from "../../components/TodoList/ListTodos";
const { Header, Content } = Layout;

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");
  const [allTodos, setAllTodos] = useState([]);
  const [todosChange, setTodosChange] = useState(false);

  const capitalizeFirstChar = (text) => {
    let result = text.toLowerCase();
    return result.charAt(0).toUpperCase() + result.slice(1);
  }

  const getProfile = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/dashboard`, {
        method: "GET",
        headers: { jwt_token: localStorage.token }
      });
      const parseData = await res.json();
      // console.log('Parse_Data ', parseData);
      // console.log('Parse_Data ID ', parseData[0]['todo_id']);
      // console.log('Parse_Data DESC',  parseData[0]['description']);
      if (parseData[0]['todo_id'] !== null && parseData[0]['description'] !== null) {
        setAllTodos(parseData);
      }
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

        {/* {(typeof allTodos[0]['todo_id'] === "undefined") ?
          <h1>No todos found</h1> : <ListTodos allTodos={allTodos} setTodosChange={setTodosChange} />} */}


        <ListTodos allTodos={allTodos} setTodosChange={setTodosChange} />

      </Content>

    </Layout>

  );
};

export default Dashboard;
