import { useNavigate } from "react-router-dom";
import { useConfigAPI } from "../../packages/api/config-api";
import "./Login.scss";

import { Button, Checkbox, Col, Form, type FormProps, Input, Row } from "antd";
import { setAccessTokenToLS } from "../../utils/localStorageHandler";

type FieldType = {
  email: string;
  password: string;
  remember?: string;
};

export default function Login() {
  const api = useConfigAPI();
  const navigate = useNavigate();
  const onFinish: FormProps<FieldType>["onFinish"] = async (
    values: FieldType
  ) => {
    const response = await api.login(values.email, values.password);
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
        <Col span={12} className="right"></Col>
        <Col span={12} className="formLogin">
          <h4>Đăng nhập</h4>
          <div className="groupButton">
            <Button
              className="buttonLogin"
              style={{
                backgroundColor: "white",
                color: "#bb0000 ",
              }}
              onClick={handleClickLogin}>
              Đăng nhập
            </Button>
            <Button className="buttonLogin " onClick={handleClickRegister}>
              Đăng ký
            </Button>
          </div>
          <Form
            className="formLoginItem"
            name="basic"
            // labelCol={{ span: 8 }}
            // wrapperCol={{ span: 16 }}
            style={{ maxWidth: "100%" }}
            initialValues={{
              remember: true,
              email: "quang@gmail.com",
              password: "123456@tQ",
            }}
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off">
            <Form.Item<FieldType>
              label="Tài Khoản"
              name="email"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}>
              <Input defaultValue={"quang@gmail.com"} />
            </Form.Item>

            <Form.Item<FieldType>
              label="Mật Khẩu"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}>
              <Input.Password defaultValue={"123456@tQ"} />
            </Form.Item>
            <div className="remember">
              <Form.Item<FieldType>
                name="remember"
                valuePropName="checked"
                // wrapperCol={{ offset: 8, span: 12 }}
              >
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <div style={{ top: "1px" }}>Quên mất khẩu?</div>
            </div>
            <div>
              Bạn chưa có tài khoản?{" "}
              <span
                onClick={handleClickRegister}
                style={{
                  color: "#bb0000",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}>
                Đăng ký
              </span>
            </div>
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
