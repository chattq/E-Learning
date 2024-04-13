import { useNavigate } from "react-router-dom";
import { useConfigAPI } from "../../packages/api/config-api";
import "./Logon.scss";

import { Button, Checkbox, Form, type FormProps, Input } from "antd";

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
      navigate("/admin/category");
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{
        remember: true,
        email: "quang@gmail.com",
        password: "123456@tQ",
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off">
      <Form.Item<FieldType>
        label="Username"
        name="email"
        rules={[{ required: true, message: "Please input your username!" }]}>
        <Input defaultValue={"quang@gmail.com"} />
      </Form.Item>

      <Form.Item<FieldType>
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}>
        <Input.Password defaultValue={"123456@tQ"} />
      </Form.Item>

      <Form.Item<FieldType>
        name="remember"
        valuePropName="checked"
        wrapperCol={{ offset: 8, span: 16 }}>
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
