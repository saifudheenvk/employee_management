import { Form, Input, Button, Modal, message } from "antd";
import TextArea from "antd/lib/input/TextArea";
import EmployeeActions from "../../actions/employees/employeeActions";

const AddEmployee = ({ showModal, setShowModal, fetchData, form, isEdit }) => {
  const onFinish = (values) => {
    if (!isEdit)
      EmployeeActions.addEmployee(values).then((res) => {
        if (res.data) {
          form.resetFields();
          setShowModal(false);
          fetchData();
          message.success("Added Employee");
        } else {
          message.error("Couldn't add employee");
        }
      });
    else {
      EmployeeActions.updateEmployee(values, form.getFieldValue("_id")).then(
        (res) => {
          if (res.data) {
            form.resetFields();
            setShowModal(false);
            fetchData();
            message.success("Updated Employee");
          } else {
            message.error("Couldn't update employee");
          }
        }
      );
    }
  };

  return (
    <Modal
      title="Add Employee"
      footer={null}
      onCancel={() => {
        form.resetFields();
        setShowModal(false);
      }}
      visible={showModal}
    >
      <Form onFinish={onFinish} form={form}>
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Please input Name!" }]}
        >
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input Email!" }]}
        >
          <Input type="email" placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="age"
          rules={[{ required: true, message: "Please input Age!" }]}
        >
          <Input type="number" placeholder="Age" />
        </Form.Item>
        <Form.Item
          name="phoneNumber"
          rules={[{ required: true, message: "Please input Phone Number!" }]}
        >
          <Input type="number" placeholder="Phone Number" />
        </Form.Item>
        <Form.Item
          name="address"
          rules={[{ required: true, message: "Please input Adress!" }]}
        >
          <TextArea placeholder="Address" />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 21 }}>
          <Button htmlType="submit" type="primary">
            {isEdit ? "Edit" : "Add"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddEmployee;
