import { useNavigate } from "react-router-dom";
import { useConfigAPI } from "../../packages/api/config-api";
import "./Login.scss";

import { Button, Col, Form, type FormProps, Input, Row } from "antd";

type FieldType = {
  code: any;
};

export default function VerifyEmail() {
  const api = useConfigAPI();
  const navigate = useNavigate();
  const onFinish: FormProps<FieldType>["onFinish"] = async (
    values: FieldType
  ) => {
    // const response = await api.User_register(
    //   values.email,
    //   values.password,
    //   values.confirmPassword
    // );
    // if (response.isSuccess) {
    //   navigate("/");
    // }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  const handleClickLogin = () => {
    navigate("/login");
  };

  const handleClickRegister = () => {
    navigate("/register");
  };

  return (
    <>
      <Row>
        <Col
          xs={0} // Ẩn phần này trên màn hình nhỏ
          md={12} // Chỉ hiển thị từ màn hình medium trở lên
          className="right"
        ></Col>
        <Col xs={24} md={12} className="formVerify">
          <h4>Xác nhận Email</h4>
          <Form
            className="formVerifyItem"
            name="basic"
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item<FieldType>
              label="Mã xác nhận đã được gửi về email của bạn. Hãy kiểm tra email và nhập mã xác nhận"
              name="code"
              rules={[{ required: true, message: "Please input your code!" }]}
            >
              <Input placeholder="Mã xác nhận" />
            </Form.Item>

            <Form.Item>
              <Button htmlType="submit" className="btnLogin">
                Xác nhận
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
}
