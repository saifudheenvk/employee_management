import React from "react";
import styled from "styled-components";
import { Input, Form, Button } from "antd";

const InputBox = styled(Input)`
  background: #fff;
  border-radius: 20px;
  height: 45px;
  font-family: Comfortaa;
`;

const SubmitButton = styled(Button)`
  background: #00f0ff;
  border-radius: 20px;
  height: 45px;
  width: 100%;
  color: #9d6deb;
  font-weight: bold;
`;

const LoginForm = ({ onFinish, onFinishFailed, loading }) => {
  return (
    <Form name="login" onFinish={onFinish} onFinishFailed={onFinishFailed}>
      {!window.location.href.includes("login") && (
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Please input Name!" }]}
        >
          <InputBox type="text" placeholder="Name" />
        </Form.Item>
      )}
      <Form.Item
        name="email"
        rules={[{ required: true, message: "Please input email id!" }]}
      >
        <InputBox type="email" placeholder="Email" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input password!" }]}
      >
        <InputBox type="password" placeholder="Password" />
      </Form.Item>
      <Form.Item>
        <SubmitButton type="primary" htmlType="submit" loading={loading}>
          {window.location.href.includes("login") ? "LOG IN" : "SIGN UP"}
        </SubmitButton>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
