import { useNavigate } from "react-router-dom";
import { useConfigAPI } from "../../packages/api/config-api";
import "./Login.scss";

import { Button, Checkbox, Col, Form, type FormProps, Input, Row } from "antd";

type FieldType = {
  email: string;
  password: string;
  remember?: string;
};

export default function Register() {
  const api = useConfigAPI();
  const navigate = useNavigate();
  const onFinish: FormProps<FieldType>["onFinish"] = async (
    values: FieldType
  ) => {
    const response = await api.login(values.email, values.password);
    if (response.isSuccess) {
      navigate("/admin/category");
    }
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
        <Col span={12} className="right"></Col>
        <Col span={12} className="formRegister">
          <h4>Đăng ký</h4>
          <div className="groupButton">
            <Button className="buttonLogin" onClick={handleClickLogin}>
              Đăng nhập
            </Button>
            <Button
              className="buttonLogin "
              style={{
                backgroundColor: "white",
                color: "#bb0000 ",
              }}
              onClick={handleClickRegister}
            >
              Đăng ký
            </Button>
          </div>
          <Form
            className="formLoginItem"
            name="basic"
            // labelCol={{ span: 8 }}
            // wrapperCol={{ span: 16 }}
            style={{ maxWidth: "100%" }}
            // initialValues={{
            //   remember: true,
            //   email: "quang@gmail.com",
            //   password: "123456@tQ",
            // }}
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item<FieldType>
              label="Tài Khoản"
              name="email"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input placeholder="Email" />
            </Form.Item>

            <Form.Item<FieldType>
              label="Mật Khẩu"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password placeholder="Mật Khẩu" />
            </Form.Item>
            <Form.Item<FieldType>
              label="Nhập Lại Mật Khẩu"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password placeholder="Nhập Lại Mật Khẩu" />
            </Form.Item>

            <Form.Item>
              <Button htmlType="submit" className="btnLogin">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
}
