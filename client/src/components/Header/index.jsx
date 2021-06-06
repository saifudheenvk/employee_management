import React from "react";
import styled from "styled-components";
import { Header as AntdHeader } from "antd/lib/layout/layout";
import { Row, Col, Dropdown, Menu } from "antd";
import Logo from "../../assets/logo.png";
import User from "../../assets/user.svg";
import { useHistory } from "react-router-dom";

const Container = styled(AntdHeader)`
  position: fixed;
  z-index:100;
  width: 100%;
  display: flex !important;
  align-items: center !important;
  flex-direction: column;
  padding: 10px 10px;
  background: #ffffff !important;
  &.ant-layout-header {
    height: auto;
  }
  border-bottom: 1px solid #ccc;
`;

const HeaderContainer = styled(Row)`
  width: 100%;
  height: 55px;
  &.ant-row {
    justify-content: space-between;
  }
`;

const LogoContainer = styled.div`
  width: 100%;
  height: 55px;
  align-items: center;
  display: flex;
  justify-content: center;
  max-width: 200px;
  cursor: pointer;
`;

const NavbarLogo = styled.img`
  height: 43px;
  margin: auto;
  min-width: 150px;
`;
const UserLogo = styled.img`
  height: 43px;
  margin: auto;
  margin-right: 20%;
`;

const Header = () => {
  const history = useHistory();
  const menu = (
    <Menu>
      <Menu.Item
        onClick={() => {
          localStorage.clear();
          history.push(`/login`);
        }}
      >
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Container>
      <HeaderContainer>
        <Col span={4}>
          <LogoContainer>
            <NavbarLogo src={Logo} />
          </LogoContainer>
        </Col>
        <Col span={17}></Col>
        <Col span={3}>
          <LogoContainer>
            <Dropdown overlay={menu} overlayStyle={{ backgroundColor: "#fff" }}>
              <UserLogo src={User} />
            </Dropdown>
          </LogoContainer>
        </Col>
      </HeaderContainer>
    </Container>
  );
};

export default Header;
