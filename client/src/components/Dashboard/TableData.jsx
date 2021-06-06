import { message, Popconfirm, Table, Tooltip, Form } from "antd";
import { useState } from "react";
import styled from "styled-components";
import EmployeeActions from "../../actions/employees/employeeActions";
import Loader from "../../assets/Loader.svg";
import AddEmployee from "./AddEmployee";

const SpinContainer = styled.div`
  margin: 2rem 0;
  height: 380px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledTable = styled(Table)`
  border-radius: 6px;
  font-size: 12px;
`;

const Delete = styled.p`
  cursor: pointer;
  color: #1890ff;
`;

const Adress = styled.p`
  white-space: nowrap;
  width: 180px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TableData = ({ data, loading, fetchData }) => {
  const [showModal, setShowModal] = useState(false);
  const [clickedRecord, setClickedRecord] = useState(null);
  const [form] = Form.useForm();
  const deleteEmployee = (id) => {
    EmployeeActions.deleteEmployee(id).then((res) => {
      if (res.data) {
        fetchData();
        message.success("Deleted");
      } else {
        message.error("Couldn't delete");
      }
    });
  };

  const columns = [
    {
      title: "No:",
      key: "index",
      render: (id, record, index) => index,
    },
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
      render: (name) => name,
    },
    {
      title: "Age",
      key: "age",
      dataIndex: "age",
      render: (age) => age,
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
      render: (email) => email,
    },
    {
      title: "Address",
      key: "address",
      dataIndex: "address",
      render: (adress) => (
        <Tooltip title={adress}>
          <Adress>{adress}</Adress>
        </Tooltip>
      ),
    },
    {
      title: "Phone Number",
      key: "phoneNumber",
      dataIndex: "phoneNumber",
      render: (phoneNumber) => phoneNumber,
    },
    {
      key: "delete",
      render: (_, record) => (
        <Popconfirm
          title={`Do you want to remove ${record.name}?`}
          onConfirm={(e) => {
            e.stopPropagation();
            deleteEmployee(record._id);
          }}
        >
          <Delete
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            Delete
          </Delete>
        </Popconfirm>
      ),
    },
  ];
  return (
    <>
      <AddEmployee
        isEdit={true}
        form={form}
        fetchData={fetchData}
        showModal={showModal}
        setShowModal={setShowModal}
      />
      <StyledTable
        onRow={(record, index) => ({
          onClick: (event) => {
            form.setFieldsValue(record);
            setShowModal(true);
          },
        })}
        locale={{
          emptyText: !loading ? (
            <p>No results found for the specified filter</p>
          ) : (
            <SpinContainer>
              <img className="rotate-image" src={Loader} alt="" />
            </SpinContainer>
          ),
        }}
        pagination={{
          pageSize: 12,
          total: data.length,
          showSizeChanger: false,
        }}
        columns={columns}
        dataSource={data}
      />
    </>
  );
};
export default TableData;
