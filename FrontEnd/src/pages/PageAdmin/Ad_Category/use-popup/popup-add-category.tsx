import { forwardRef, useImperativeHandle, useState } from "react";
import {
  Button,
  Modal,
  Cascader,
  CascaderProps,
  Form,
  Input,
  Radio,
  Select,
  Space,
  Switch,
} from "antd";
import TextArea from "antd/es/input/TextArea";

export const PopupAddCategory = forwardRef(({}, ref) => {
  const [open, setOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    showPopup() {
      setOpen(true);
    },
  }));

  const handleCancel = () => {
    setOpen(false);
  };
  const onSave = () => {
    console.log(17, "A");
  };

  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 30 },
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
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  return (
    <Modal
      width={700}
      open={open}
      title="Thêm ngành hàng"
      centered
      className="popup-custom"
      onCancel={handleCancel}
      footer={(_, {}) => (
        <>
          <Space size={15}>
            <Button onClick={handleCancel}>Cancel</Button>
            <Button onClick={onSave}>Ok</Button>
          </Space>
        </>
      )}>
      <Form
        name="validate_other"
        {...formItemLayout}
        onFinish={onFinish}
        style={{ width: "100%" }}>
        <Form.Item
          name="ProductName"
          label="Tên ngành hàng"
          rules={[{ required: true, message: "Không được để trống ô" }]}>
          <Input showCount maxLength={120} placeholder="Nhập vào" />
        </Form.Item>
        <Form.Item name="CourseType" label="Ngành hàng cha">
          <Select
            defaultValue="online"
            onChange={handleChange}
            options={[
              { value: "video", label: "Video" },
              { value: "online", label: "Online" },
            ]}
          />
        </Form.Item>
        <Form.Item
          name="ProductDes"
          label="Ghi chú"
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
            style={{ height: 100, resize: "none" }}
          />
        </Form.Item>
        <Form.Item label="Trạng thái">
          <Switch defaultValue={true} />
        </Form.Item>
      </Form>
    </Modal>
  );
});
