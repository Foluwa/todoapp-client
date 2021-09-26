import React, { Fragment, useState } from "react";
import { Form, Input, Spin } from 'antd';
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
      const response = await fetch("http://localhost:5000/dashboard/todos", {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(body)
      });

      const parseResponse = await response.json();

      console.log(parseResponse);

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
      <h1 className="text-center my-5">Input Todo</h1>
      <form className="d-flex" onSubmit={onSubmitForm}>

        <Form.Item>
          <Form.Item>
            <Input size="large" placeholder="Add Todo" value={description}
              onChange={e => setDescription(e.target.value)} />
          </Form.Item>
          <Form.Item>
            <button className="btn btn-success ">{addBtn ? <Spin indicator={antIcon} /> : <>Add</>}</button>
          </Form.Item>
        </Form.Item>
      </form>
    </Fragment>
  );
};

export default InputTodo;
