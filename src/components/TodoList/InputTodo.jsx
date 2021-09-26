import React, { Fragment, useState } from "react";
import {Button, Form, Input, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const InputTodo = ({ setTodosChange }) => {
  const [description, setDescription] = useState("");
  const [addBtn, setAddBtn] = useState(false);

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const onSubmitForm = async e => {
    e.preventDefault();
    setAddBtn(true);
    try {
      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("jwt_token", localStorage.token);

      const body = { description };
      await fetch(`${process.env.REACT_APP_API_URL}/dashboard/todos`, {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(body)
      });

      //const parseResponse = await response.json();
      // console.log(parseResponse);
      setTodosChange(true);
      setDescription("");
      // window.location = "/";
      setAddBtn(false);
    } catch (err) {
      console.error(err.message);
      setAddBtn(false);
    }
  };
  return (
    <Fragment>
      <h1 className="text-center my-5"> </h1>
      <form className="d-flex" onSubmit={onSubmitForm}>

        <Form.Item>
          <Form.Item>
            <Input size="large" 
              placeholder="Add a Todo" 
              value={description}
              onChange={e => setDescription(e.target.value)}
              required
               />

          </Form.Item>
          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit">
              {addBtn ? <Spin indicator={antIcon} /> : <>Add Todo</>}
            </Button>
          </Form.Item>
        </Form.Item>
      </form>
    </Fragment>
  );
};

export default InputTodo;
