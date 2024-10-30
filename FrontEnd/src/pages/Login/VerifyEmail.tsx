import { useNavigate } from "react-router-dom";
import { useConfigAPI } from "../../packages/api/config-api";
import "./Login.scss";

import { Button, Col, Form, type FormProps, Input, message, Row } from "antd";
import { OTPProps } from "antd/es/input/OTP";
import { useSetAtom } from "jotai";
import { showErrorAtom } from "../../packages/ui/Error/error-store";
import CountDownTimer from "../../packages/ui/count-down-time/Count_down_time";
import { useQuery } from "@tanstack/react-query";
import { setAccessTokenToLS } from "../../utils/localStorageHandler";

type FieldType = {
  code: any;
};

export default function VerifyEmail() {
  const api = useConfigAPI();
  const navigate = useNavigate();
  const setShowError = useSetAtom(showErrorAtom);
  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: "success",
      content: "Xác thực thành công",
      onClose: () => {
        navigate("/");
      },
      duration: 1,
    });
  };
  const onFinish: FormProps<FieldType>["onFinish"] = async (
    values: FieldType
  ) => {
    console.log(18, values);
    const response: any = await api.Verify_email(values.code);
    if (response.isSuccess) {
      setAccessTokenToLS(response?.data?.access_token);
      success();
    } else {
      setShowError({
        isSuccess: false,
        message: response.message,
        data: {
          message: response.message,
        },
      });
    }
  };

  const { data: getOTPtime } = useQuery({
    queryKey: ["Categories_GetAllActive"],
    queryFn: async () => {
      const response: any = await api.getOTPtime();
      if (response.isSuccess) {
        return response?.data;
      } else {
        setShowError({
          isSuccess: false,
          message: response.message,
          data: {
            message: response.message,
          },
        });
      }
    },
  });

  return (
    <>
      <Row>
        <Col
          xs={0} // Ẩn phần này trên màn hình nhỏ
          md={12} // Chỉ hiển thị từ màn hình medium trở lên
          className="right"></Col>
        <Col xs={24} md={12} className="formVerify">
          <h4>Xác nhận Email</h4>
          <Form
            className="formVerifyItem"
            name="basic"
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off">
            <Form.Item<FieldType>
              label="Mã xác nhận đã được gửi về email của bạn. Hãy kiểm tra email và nhập mã xác nhận"
              name="code"
              rules={[{ required: true, message: "Please input your code!" }]}>
              <Input.OTP length={6} />
            </Form.Item>
            {getOTPtime?.expires_at && (
              <CountDownTimer initialTime={getOTPtime?.expires_at} />
            )}
            <Form.Item>
              <Button htmlType="submit" className="btnLogin">
                Xác nhận
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
      {contextHolder}
    </>
  );
}
