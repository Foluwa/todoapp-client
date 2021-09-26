import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Layout, Menu } from "antd";

//components
import InputTodo from "../../components/TodoList/InputTodo";
import ListTodos from "../../components/TodoList/ListTodos";
const { Header, Content } = Layout;

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");
  const [allTodos, setAllTodos] = useState([]);
  const [todosChange, setTodosChange] = useState(false);

  const capitalizeFirstChar =(text) => {
    let result = text.toLowerCase();
    return result.charAt(0).toUpperCase() + result.slice(1);
  }

  const getProfile = async () => {
    try {
      const res = await fetch("http://localhost:5000/dashboard/", {
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

  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          style={{ lineHeight: "64px" }}
        >
          <Menu.Item key="1">Todos Dashboard</Menu.Item>
          <Menu.Item key="2"><span>{capitalizeFirstChar(name)}'s todo list</span></Menu.Item>
          <Menu.Item key="3" onClick={e => logout(e)}>Logout</Menu.Item>
        </Menu>
      </Header>

      <Content style={{ padding: "0 50px" }}>
        <InputTodo setTodosChange={setTodosChange} />
        <ListTodos allTodos={allTodos} setTodosChange={setTodosChange} />
      </Content>

    </Layout>

  );
};

export default Dashboard;
