import React, { useState } from "react";
import { Row, Form, Input, Button, Checkbox } from 'antd';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { toast } from "react-toastify";
// import { Link } from "react-router-dom";
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const SignUp = ({ setAuth }) => {
    const [btnLoading, setBtnLoading] = useState(false);
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        name: ""
    });

    const { email, password, name } = inputs;

    const onChange = e =>
        setInputs({ ...inputs, [e.target.name]: e.target.value });

    const onSubmitForm = async e => {
        e.preventDefault();
        setBtnLoading(true);
        try {
            const body = { email, password, name };
            const response = await fetch(
                "http://localhost:5000/authentication/register",
                {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(body)
                }
            );
            const parseRes = await response.json();

            if (parseRes.jwtToken) {
                localStorage.setItem("token", parseRes.jwtToken);
                setAuth(true);
                setBtnLoading(false);
                toast.success("Register Successfully");
            } else {
                setAuth(false);
                setBtnLoading(false);
                toast.error(parseRes);
            }
        } catch (err) {
            setBtnLoading(false);
            console.error(err.message);
        }
    };
    return (
        <Row type="flex" justify="center" align="middle" style={{ minHeight: '100vh' }}>
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                initialValues={{
                    remember: true,
                }}
                onSubmit={onSubmitForm}
            >
                <Form.Item

                    label="Name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your name!',
                        },
                    ]}
                >
                    <Input

                        name="name"
                        value={name}
                        onChange={e => onChange(e)}
                    />
                </Form.Item>

                <Form.Item

                    label="Email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input

                        name="email"
                        value={email}
                        onChange={e => onChange(e)}
                    />
                </Form.Item>

                <Form.Item
                    label="Password"

                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password

                        name="password"
                        onChange={e => onChange(e)}
                        value={password}
                    />
                </Form.Item>

                <Form.Item
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>


                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    {btnLoading ? <Spin indicator={antIcon} /> :
                        <Button type="primary" htmlType="submit" onClick={onSubmitForm}>
                            Submit
                        </Button>
                    }
                </Form.Item>

            </Form>
        </Row>
    )
}

export default SignUp;
