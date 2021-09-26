import React, { Fragment, useState } from "react";
import { Modal, Button } from 'antd';
import { toast } from "react-toastify";
const EditTodo = ({ todo, setTodosChange }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    editText(todo.todo_id);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Edit Todo
  const editText = async id => {
    try {
      const body = { description };

      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("jwt_token", localStorage.token);

      await fetch(`${process.env.REACT_APP_API_URL}/dashboard/todos/${id}`, {
        method: "PUT",
        headers: myHeaders,
        body: JSON.stringify(body)
      });

      setTodosChange(true);
      toast.success(`Todo ${id} edited Successfully`);

      // window.location = "/";
    } catch (err) {
      console.error(err.message);
      toast.error(`Error editting Todo ${id} edited Successfully`);
    }
  };

  const [description, setDescription] = useState(todo.description);
  return (
    <Fragment key={`edit-todo-${todo.todo_id}`}>
      <Button
        type="primary"
        onClick={showModal}
        data-toggle="modal"
        data-target={`#id${todo.todo_id}`}
      >
        Edit
      </Button>
      <Modal
        title={`Edit Todo ${todo.todo_id}`}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      //footer={<><Button type="primary" onClick={handleOk}>Edit</Button> <Button onClick={handleCancel}>Cancel</Button></>}

      >
        <div
          className="modal"
          id={`id${todo.todo_id}`}
          onClick={() => setDescription(todo.description)}
        >
          <div className="modal-dialog">
            <div className="modal-content">

              <div className="modal-body">
                <input
                  type="text"
                  className="form-control"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                />
              </div>

              <div className="modal-footer">
              </div>
            </div>
          </div>
        </div>
      </Modal>


    </Fragment>
  );
};

export default EditTodo;
