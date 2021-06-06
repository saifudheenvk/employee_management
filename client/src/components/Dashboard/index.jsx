import { Row, Col, PageHeader, Button, Input, Form } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import EmployeeActions from "../../actions/employees/employeeActions";
import Header from "../Header";
import AddEmployee from "./AddEmployee";
import TableData from "./TableData";
import { SearchOutlined } from "@ant-design/icons";
import { useDebounce } from "../../utils/useDebounce";

const Container = styled(Row)`
  padding: 100px 0px 0px 0px;
`;

const Search = styled(Input)`
  width: 300px;
`;

const Content = styled(Col)`
  text-align: center;
`;

const HeaderContainer = styled(PageHeader)`
  padding: 25px 0px 40px 0px;
`;

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const history = useHistory();
  const [form] = Form.useForm();

  const fetchData = (text) => {
    setLoading(true);
    if (text) {
      setSearchText(text);
    }
    EmployeeActions.getAllEmployees(text || searchText).then((res) => {
      setData(res.data);
      setLoading(false);
    });
  };
  useEffect(() => {
    if (!localStorage.getItem("userCredentials")) {
      history.push("/login");
    }
    fetchData();
  }, []);

  const onSearchFieldChange = useCallback(useDebounce(fetchData, 1000), []);

  return (
    <div>
      <Header />
      <Container>
        <AddEmployee
          isEdit={false}
          form={form}
          fetchData={fetchData}
          showModal={showModal}
          setShowModal={setShowModal}
        />
        <Col span={3} />
        <Content span={18}>
          <div>
            <HeaderContainer
              title="Employers"
              extra={[
                <Search
                  onChange={(e) => {
                    onSearchFieldChange(e.target.value);
                  }}
                  placeholder="Search"
                  suffix={<SearchOutlined />}
                />,
                <Button
                  onClick={() => {
                    setShowModal(true);
                  }}
                >
                  Add New Employee
                </Button>,
              ]}
            />
          </div>
          <TableData fetchData={fetchData} data={data} loading={loading} />
        </Content>
        <Col span={3} />
      </Container>
    </div>
  );
};

export default Dashboard;
