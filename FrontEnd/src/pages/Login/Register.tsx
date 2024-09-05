import { useNavigate } from "react-router-dom";
import { useConfigAPI } from "../../packages/api/config-api";
import "./Login.scss";

import { Button, Col, Form, type FormProps, Input, Row } from "antd";

type FieldType = {
  email: string;
  password: string;
  confirmPassword: string;
};

export default function Register() {
  const api = useConfigAPI();
  const navigate = useNavigate();
  const onFinish: FormProps<FieldType>["onFinish"] = async (
    values: FieldType
  ) => {
    const response = await api.User_register(
      values.email,
      values.password,
      values.confirmPassword
    );
    if (response.isSuccess) {
      navigate("/");
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
        <Col
          xs={0} // Ẩn phần này trên màn hình nhỏ
          md={12} // Chỉ hiển thị từ màn hình medium trở lên
          className="right"
        ></Col>
        <Col xs={24} md={12} className="formRegister">
          <h4>Đăng ký</h4>
          <div className="groupButton">
            <Button className="buttonLogin" onClick={handleClickLogin}>
              Đăng nhập
            </Button>
            <Button
              className="buttonLogin"
              style={{
                backgroundColor: "white",
                color: "#bb0000",
              }}
              onClick={handleClickRegister}
            >
              Đăng ký
            </Button>
          </div>
          <Form
            className="formRegisterItem"
            name="basic"
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item<FieldType>
              label="Tài Khoản"
              name="email"
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "Email không đúng định dạng!" },
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
              name="confirmPassword"
              rules={[
                { required: true, message: "Please confirm your password!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Mật khẩu không khớp!"));
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Nhập Lại Mật Khẩu" />
            </Form.Item>

            <div>
              Bạn đã có tài khoản?{" "}
              <span
                onClick={handleClickLogin}
                style={{
                  color: "#bb0000",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Đăng nhập
              </span>
            </div>

            <Form.Item>
              <Button htmlType="submit" className="btnLogin">
                Đăng ký
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
}
