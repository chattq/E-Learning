import React from "react";
import {
  Button,
  Cascader,
  CascaderProps,
  Form,
  Input,
  Radio,
  Select,
  Space,
} from "antd";
import UploadFileCustom from "../../../../packages/ui/UploadFile/UploadFile";
import TextArea from "antd/es/input/TextArea";

export default function InforBaseProduct() {
  const { Option } = Select;

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };
  interface DataNodeType {
    value: string;
    label: string;
    children?: DataNodeType[];
  }

  const residences: CascaderProps<DataNodeType>["options"] = [
    {
      value: "zhejiang",
      label: "Zhejiang",
      children: [
        {
          value: "hangzhou",
          label: "Hangzhou",
          children: [
            {
              value: "xihu",
              label: "West Lake",
            },
          ],
        },
      ],
    },
    {
      value: "jiangsu",
      label: "Jiangsu",
      children: [
        {
          value: "nanjing",
          label: "Nanjing",
          children: [
            {
              value: "zhonghuamen",
              label: "Zhong Hua Men",
            },
          ],
        },
      ],
    },
  ];

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };
  return (
    <>
      <Form
        name="validate_other"
        {...formItemLayout}
        onFinish={onFinish}
        style={{ width: "100%" }}>
        <Form.Item label="Plain Text">
          <Form.Item
            name={["address", "province"]}
            noStyle
            rules={[{ required: true, message: "Province is required" }]}>
            <div className="translate-y-7">
              <UploadFileCustom />
            </div>
          </Form.Item>
        </Form.Item>
        <Form.Item label="Plain Text">
          <Space.Compact>
            <Form.Item
              name={["address", "province"]}
              noStyle
              rules={[{ required: true, message: "Province is required" }]}>
              <UploadFileCustom />
            </Form.Item>
            <Form.Item
              name={["address", "street"]}
              noStyle
              rules={[{ required: true, message: "Street is required" }]}>
              <span className="ant-form-text">China</span>
            </Form.Item>
          </Space.Compact>
        </Form.Item>
        <Form.Item
          name="ProductName"
          label="Tên sản phẩm"
          rules={[{ required: true, message: "Không được để trống ô" }]}>
          <Input showCount maxLength={120} placeholder="Nhập vào" />
        </Form.Item>

        <Form.Item
          name="ProductCategory"
          label="Ngành hàng"
          rules={[
            {
              required: true,
              message: "Please select your favourite colors!",
            },
          ]}>
          <Cascader options={residences} placeholder={"Chọn ngành hàng"} />
        </Form.Item>
        <Form.Item
          name="ProductDes"
          label="Mô tả sản phẩm"
          rules={[
            {
              type: "array",
              required: true,
              message: "Mô tả sản phẩm không được để trống",
            },
          ]}>
          <TextArea
            showCount
            maxLength={3000}
            // onChange={onChange}
            style={{ height: 200, resize: "none" }}
          />
        </Form.Item>
      </Form>
    </>
  );
}
