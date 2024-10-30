import { useNavigate } from "react-router-dom";
import { useConfigAPI } from "../../packages/api/config-api";
import "./Login.scss";

import {
  Button,
  Col,
  Form,
  type FormProps,
  Input,
  message,
  Row,
  Tabs,
  TabsProps,
} from "antd";
import { useState } from "react";
import useQueryParams from "../../packages/hooks/useQueryParams";
import { showErrorAtom } from "../../packages/ui/Error/error-store";
import { useSetAtom } from "jotai";
import { LoadingAtom } from "../../packages/store/loading.store";

type FieldType = {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
};

export default function Register() {
  const api = useConfigAPI();
  const navigate = useNavigate();
  const queryParams = useQueryParams();
  const setShowError = useSetAtom(showErrorAtom);
  const setLoad = useSetAtom(LoadingAtom);
  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: "success",
      content: "Đăng ký thành công",
      onClose: () => {
        navigate("/verify-email");
      },
      duration: 1,
    });
  };
  const onFinish: FormProps<FieldType>["onFinish"] = async (
    values: FieldType
  ) => {
    setLoad(true);
    const response = await api.User_register(
      values.email,
      values.password,
      values.confirmPassword,
      values.username,
      (queryParams as any).user_click
    );
    if (response.isSuccess) {
      setLoad(false);
      success();
    } else {
      setLoad(false);
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

  const handleClickStudent = () => {
    navigate("/register?user_click=0");
  };
  const handleClickTeacher = () => {
    navigate("/register?user_click=1");
  };
  const handleClickBack = () => {
    navigate("/register");
  };

  return (
    <>
      <Row>
        <Col
          xs={0} // Ẩn phần này trên màn hình nhỏ
          md={12} // Chỉ hiển thị từ màn hình medium trở lên
          className="right"></Col>
        <Col xs={24} md={12} className="formRegister">
          <h4>{`Đăng ký ${
            queryParams === null
              ? ""
              : queryParams.user_click === "1"
              ? "với tài khoản giáo viên"
              : "với tài khoản học sinh"
          }`}</h4>
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
              onClick={handleClickRegister}>
              Đăng ký
            </Button>
          </div>
          {queryParams === null && (
            <div className="flex items-center gap-6 justify-center">
              <div
                className="border-[1px] rounded-md cursor-pointer shadow p-2 w-[220px] zoom"
                onClick={handleClickStudent}>
                <div className="flex justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="128"
                    height="128"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-graduation-cap">
                    <path
                      d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"
                      key="j76jl0"></path>
                    <path d="M22 10v6" key="1lu8f3"></path>
                    <path
                      d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"
                      key="1r8lef"></path>
                  </svg>
                </div>
                <div className="font-medium text-[16px]">Tôi là học sinh</div>
              </div>
              <div
                className="border-[1px] rounded-md cursor-pointer shadow p-2 w-[220px] zoom"
                onClick={handleClickTeacher}>
                <div className="flex justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.0"
                    viewBox="0 0 2600.000000 2600.000000"
                    preserveAspectRatio="xMidYMid meet"
                    className="ng-star-inserted"
                    style={{
                      height: 128,
                      width: 128,
                    }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      version="1.0"
                      viewBox="0 0 2600.000000 2600.000000"
                      preserveAspectRatio="xMidYMid meet"
                      style={{ height: 128, width: 128 }}>
                      {/* SVG paths */}
                    </svg>
                    <g
                      transform="translate(0.000000,2600.000000) scale(0.100000,-0.100000)"
                      fill="currentColor"
                      stroke="currentColor">
                      <path d="M5087 20663 c-4 -3 -7 -145 -7 -315 l0 -308 5525 0 5525 0 0 315 0 315 -5518 0 c-3035 0 -5522 -3 -5525 -7z"></path>
                      <path d="M5507 19763 c-4 -3 -7 -1365 -7 -3025 l0 -3018 4196 0 c3353 0 4194 3 4188 13 -23 37 -372 551 -447 657 -100 140 -196 327 -227 440 -27 102 -38 229 -29 327 31 315 280 593 589 659 102 22 269 14 365 -16 194 -62 387 -198 546 -387 40 -48 164 -185 273 -303 110 -118 202 -219 206 -223 4 -4 129 183 279 418 l271 425 0 2020 0 2020 -5098 0 c-2804 0 -5102 -3 -5105 -7z m9243 -1328 l0 -235 -4140 0 -4140 0 0 235 0 235 4140 0 4140 0 0 -235z m-3080 -1130 l0 -235 -2600 0 -2600 0 0 235 0 235 2600 0 2600 0 0 -235z m0 -1125 l0 -230 -2600 0 -2600 0 0 230 0 230 2600 0 2600 0 0 -230z m-2480 -1130 l0 -230 -1360 0 -1360 0 0 230 0 230 1360 0 1360 0 0 -230z"></path>
                      <path d="M17409 19294 c-249 -45 -459 -156 -636 -336 -149 -153 -242 -316 -301 -528 -24 -87 -26 -111 -26 -285 0 -174 2 -198 27 -288 142 -527 593 -877 1130 -877 187 0 344 35 502 110 530 255 786 850 609 1412 -110 347 -390 630 -740 747 -176 59 -393 77 -565 45z"></path>
                      <path d="M17370 16650 c-246 -34 -488 -116 -645 -218 -138 -89 -120 -65 -820 -1165 -362 -567 -663 -1037 -669 -1044 -8 -9 -107 92 -408 415 -218 236 -414 450 -435 477 -82 103 -209 212 -300 257 -80 40 -92 43 -167 43 -105 0 -171 -30 -248 -114 -64 -69 -88 -132 -88 -231 0 -129 56 -262 190 -450 45 -63 300 -439 568 -835 522 -773 526 -778 671 -866 98 -59 158 -74 301 -74 122 0 127 1 193 33 42 21 90 56 130 96 39 40 199 257 437 596 l375 534 3 -573 2 -573 -125 -1196 c-69 -658 -125 -1208 -125 -1221 0 -20 3 -23 28 -17 15 3 90 9 167 12 117 5 161 3 264 -15 209 -36 426 -122 574 -227 26 -19 51 -34 55 -34 5 0 71 287 147 638 76 350 142 656 148 680 5 24 10 42 12 40 2 -2 222 -1013 489 -2248 267 -1235 492 -2274 501 -2310 28 -117 123 -228 233 -271 79 -32 195 -32 275 0 120 47 226 182 244 312 6 41 -61 717 -294 2944 l-302 2890 2 582 2 583 625 -1018 c343 -559 644 -1038 667 -1063 80 -86 213 -137 325 -125 129 13 249 101 304 221 37 80 45 207 19 286 -10 30 -483 919 -1051 1976 -1154 2146 -1044 1960 -1225 2075 -127 80 -301 144 -499 184 -98 19 -445 28 -550 14z"></path>
                      <path d="M5087 13443 c-4 -3 -7 -145 -7 -315 l0 -308 4711 0 4710 0 -212 315 -213 315 -4491 0 c-2471 0 -4495 -3 -4498 -7z"></path>
                      <path d="M7306 10119 c-148 -22 -312 -85 -437 -169 -82 -55 -213 -187 -268 -268 -63 -94 -118 -215 -148 -327 -23 -88 -26 -118 -26 -255 0 -167 12 -234 69 -377 88 -224 279 -429 501 -539 l84 -41 -78 -28 c-312 -110 -580 -343 -731 -634 -96 -184 -139 -342 -149 -543 l-6 -128 1332 0 1333 0 -7 98 c-22 331 -117 577 -316 819 -137 166 -371 325 -582 394 l-66 21 97 49 c281 141 480 400 544 709 16 78 19 121 15 240 -6 178 -26 261 -102 415 -121 248 -331 432 -592 518 -163 54 -313 68 -467 46z"></path>
                      <path d="M11775 10115 c-209 -40 -384 -128 -532 -269 -221 -209 -336 -496 -320 -795 14 -253 110 -473 286 -655 91 -94 177 -157 289 -212 l83 -41 -78 -28 c-312 -110 -584 -346 -732 -635 -95 -186 -138 -342 -148 -542 l-6 -128 1332 0 1331 0 -6 98 c-22 371 -142 643 -393 893 -158 158 -319 259 -505 319 l-69 23 73 33 c256 119 455 346 544 619 34 105 46 187 46 311 0 474 -316 872 -790 996 -102 26 -299 33 -405 13z"></path>
                      <path d="M16275 10114 c-228 -41 -418 -144 -579 -315 -277 -295 -352 -718 -193 -1098 88 -213 276 -409 495 -517 l83 -41 -78 -28 c-507 -179 -857 -646 -880 -1172 l-6 -133 1328 0 1328 0 -6 138 c-15 337 -150 629 -405 873 -145 140 -318 246 -485 299 l-67 22 92 46 c304 153 504 428 558 764 17 105 8 300 -18 400 -52 195 -146 352 -295 494 -110 105 -216 171 -351 219 -173 62 -353 79 -521 49z"></path>
                      <path d="M5002 5933 l3 -408 6940 0 6940 0 3 408 2 407 -6945 0 -6945 0 2 -407z"></path>
                    </g>
                  </svg>
                </div>
                <div className="font-medium text-[16px]">Tôi là giáo viên</div>
              </div>
            </div>
          )}
          {queryParams !== null && (
            <Form
              className="formRegisterItem"
              name="basic"
              layout="vertical"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              initialValues={{
                username: "Quang",
                email: "chat.tq050902@gmail.com",
                password: "123456@tQ",
                confirmPassword: "123456@tQ",
              }}
              autoComplete="off">
              <Form.Item<FieldType>
                label="Họ và tên"
                name="username"
                rules={[{ required: true, message: "Vui lòng nhập dữ liệu" }]}>
                <Input placeholder="Họ và tên" />
              </Form.Item>
              <Form.Item<FieldType>
                label="Tài Khoản"
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                  { type: "email", message: "Email không đúng định dạng!" },
                ]}>
                <Input placeholder="Email" />
              </Form.Item>

              <Form.Item<FieldType>
                label="Mật Khẩu"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}>
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
                ]}>
                <Input.Password placeholder="Nhập Lại Mật Khẩu" />
              </Form.Item>

              <div className="flex justify-between">
                <div>
                  <span
                    onClick={handleClickBack}
                    style={{
                      color: "#bb0000",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}>
                    Quay lại chọn tài khoản
                  </span>
                </div>
                <div>
                  Bạn đã có tài khoản?{" "}
                  <span
                    onClick={handleClickLogin}
                    style={{
                      color: "#bb0000",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}>
                    Đăng nhập
                  </span>
                </div>
              </div>

              <Form.Item>
                <Button htmlType="submit" className="btnLogin">
                  Đăng ký
                </Button>
              </Form.Item>
            </Form>
          )}
        </Col>
      </Row>
      {contextHolder}
    </>
  );
}
