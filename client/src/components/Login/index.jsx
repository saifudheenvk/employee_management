import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Card, message } from "antd";
import LoginForm from "./LoginForm";
import { useHistory, Link } from "react-router-dom";
import UserActions from "../../actions/users/userActions";

const Container = styled(Card)`
  border-radius: 25px;
  background: #f7f6f2;
  //remove after confirmation
  flex: 1;
`;

const Highlighted = styled.span`
  color: #9d6deb;
  font-weight: bold;
`;

const Title = styled.p`
  font-weight: bold;
  font-family: Comfortaa;
  color: #9d6deb;
  margin-bottom: 30px;
  font-size: 36px;
`;

//remove after confirmation
const Mock = styled.div`
  margin: 100px;
  display: flex;
`;
//remove after confirmation
const Extra = styled.div`
  flex: 1;
`;

const RoutingText = styled.p`
  color: #9d6deb;
  text-align: center;
`;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const onFinish = (values) => {
    setLoading(true);
    const payload = { ...values };
    if (window.location.href.includes("login"))
      UserActions.authenticateUser(payload).then((response) => {
        console.log(response.data);
        if (response.data) {
          localStorage.setItem("userCredentials", response.data.token);
          history.push("/dashboard");
        } else {
          message.error("Couldn't login");
        }
      });
    else
      UserActions.registerUser(payload).then((response) => {
        if (response.data) {
          history.push("/login");
        } else {
          message.error(response.statusText);
        }
      });

    setLoading(false);
  };

  const onFinishFailed = (values) => {
    console.log("Success:", values);
  };

  useEffect(() => {
    if (localStorage.getItem("userCredentials")) {
      history.push("/dashboard");
    }
  }, []);

  return (
    <Mock>
      <Extra />
      <Container>
        <Title>
          Sign {window.location.href.includes("login") ? "In" : "Up"}
        </Title>
        <LoginForm
          loading={loading}
          onFinishFailed={onFinishFailed}
          onFinish={onFinish}
        />
        {window.location.href.includes("login") ? (
          <RoutingText>
            Not a member yet?{" "}
            <Link to={`/signup`}>
              <Highlighted>Sign Up</Highlighted>
            </Link>
          </RoutingText>
        ) : (
          <RoutingText>
            Already a member?{" "}
            <Link to={`/login`}>
              <Highlighted>Sign in</Highlighted>
            </Link>
          </RoutingText>
        )}
      </Container>
      <Extra />
    </Mock>
  );
};

export default Login;
