import { useNavigate } from "react-router-dom";
import { useConfigAPI } from "../../packages/api/config-api";
import "./Login.scss";
import {
  Button,
  Checkbox,
  Col,
  Form,
  type FormProps,
  Input,
  message,
  Row,
} from "antd";
import Icongoogle from "../../../src/assets/img/icongoogle.png"; // Import hình ảnh
import { useSetAtom } from "jotai";
import { showErrorAtom } from "../../packages/ui/Error/error-store";

type FieldType = {
  email: string;
  password: string;
  remember?: string;
};

export default function Login() {
  const api = useConfigAPI();
  const navigate = useNavigate();
  const setShowError = useSetAtom(showErrorAtom);
  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Đăng nhập thành công",
      onClose: () => {
        navigate("/");
      },
      duration: 1,
    });
  };
  const onFinish: FormProps<FieldType>["onFinish"] = async (
    values: FieldType
  ) => {
    const response = await api.login(values.email, values.password);
    if (response.isSuccess) {
      success();
    } else {
      setShowError({
        isSuccess: false,
        message: response.data.message,
        data: {
          message: response.message,
        },
      });
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
          className="right"></Col>
        <Col xs={24} md={12} className="formLogin">
          <h4>Đăng nhập</h4>
          <div className="groupButton">
            <Button
              className="buttonLogin"
              style={{
                backgroundColor: "white",
                color: "#bb0000",
              }}
              onClick={handleClickLogin}>
              Đăng nhập
            </Button>
            <Button className="buttonLogin" onClick={handleClickRegister}>
              Đăng ký
            </Button>
          </div>
          <Form
            className="formLoginItem"
            name="basic"
            style={{ maxWidth: "100%" }}
            initialValues={{
              remember: true,
              email: "chat.tq050902@gmail.com",
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
              <Input defaultValue={"chat.tq050902@gmail.com"} />
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
              <Form.Item<FieldType> name="remember" valuePropName="checked">
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
                Đăng nhập
              </Button>
            </Form.Item>
          </Form>

          <Button
            className="btngg"
            icon={<img src={Icongoogle} alt="Google icon" />} // Sử dụng <img /> cho biểu tượng Google
          >
            Đăng nhập với Google
          </Button>
        </Col>
      </Row>
      {contextHolder}
    </>
  );
}
