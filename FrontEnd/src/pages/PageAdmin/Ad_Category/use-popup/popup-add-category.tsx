import { forwardRef, useImperativeHandle, useRef, useState } from "react";
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
  const [formData, setFormData] = useState<any>({
    CategoryName: "",
    CategoryParentCode: "",
    CategoryDesc: "",
    FlagActive: true,
  });

  useImperativeHandle(ref, () => ({
    showPopup() {
      setOpen(true);
    },
  }));

  const handleCancel = () => {
    setOpen(false);
    formRef.current?.resetFields();
  };
  const onSave = async () => {
    try {
      await formRef.current?.validateFields();
      const formValues = formRef.current?.getFieldsValue();
      const dataSave = {
        ...formValues,
        FlagActive: formValues.FlagActive ? "1" : "0",
      };
      console.log("Form values:", dataSave);
    } catch (errorInfo) {
      console.log("Validation failed:", errorInfo);
    }
  };

  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 30 },
  };

  const formRef = useRef<any>();

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
            <Button htmlType="submit" form="validate_other" onClick={onSave}>
              Ok
            </Button>
            <Button onClick={handleCancel}>Cancel</Button>
          </Space>
        </>
      )}>
      <Form
        ref={formRef}
        initialValues={formData}
        name="validate_other"
        {...formItemLayout}
        style={{ width: "100%" }}>
        <Form.Item
          name="CategoryName"
          label="Tên ngành hàng"
          rules={[{ required: true, message: "Không được để trống ô" }]}>
          <Input showCount maxLength={150} placeholder="Nhập vào" />
        </Form.Item>
        <Form.Item name="CategoryParentCode" label="Ngành hàng cha">
          <Select
            options={[
              { value: "video", label: "Video" },
              { value: "online", label: "Online" },
            ]}
          />
        </Form.Item>
        <Form.Item name="CategoryDesc" label="Ghi chú">
          <TextArea
            showCount
            maxLength={300}
            // onChange={onChange}
            style={{ height: 100, resize: "none" }}
          />
        </Form.Item>
        <Form.Item label="Trạng thái" name="FlagActive">
          <Switch defaultValue={true} />
        </Form.Item>
      </Form>
    </Modal>
  );
});
