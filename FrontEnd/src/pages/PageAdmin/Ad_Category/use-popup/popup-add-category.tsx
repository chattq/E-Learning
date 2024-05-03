import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { Button, Modal, Form, Input, Select, Space, Switch } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useConfigAPI } from "../../../../packages/api/config-api";
import { CategoryResponse } from "../../../../packages/types/api.types";
import { useQueryClient } from "@tanstack/react-query";

interface PopupCategoryProps {
  dataCategory: CategoryResponse[];
  tableRef: any;
}

export const PopupAddCategory = forwardRef(
  ({ dataCategory, tableRef }: PopupCategoryProps, ref) => {
    const [open, setOpen] = useState(false);
    const api = useConfigAPI();
    const queryClient = useQueryClient();

    useImperativeHandle(ref, () => ({
      showPopup() {
        setOpen(true);
      },
    }));

    const handleCancel = () => {
      setOpen(false);
      formRef.current?.resetFields();
    };
    const onSave = () => {
      formRef.current?.validateFields().then(async (val: any) => {
        const response = await api.Categories_Create({
          CategoryName: val.CategoryName,
          CategoryParentCode: val.CategoryParentCode,
          CategoryDesc: val.CategoryDesc,
          FlagActive: val.FlagActive ? "1" : "0",
        });
        if (response.isSuccess) {
          queryClient.refetchQueries({ queryKey: ["Categories_GetAllActive"] });
          handleCancel();
        }
      });
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
              <Button onClick={onSave}>Ok</Button>
              <Button onClick={handleCancel}>Cancel</Button>
            </Space>
          </>
        )}>
        <Form
          ref={formRef}
          initialValues={{
            CategoryName: "",
            CategoryParentCode: "",
            CategoryDesc: "",
            FlagActive: true,
          }}
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
              showSearch={true}
              filterOption={(input: string, option: any) =>
                option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              options={dataCategory?.map((item: any) => {
                return {
                  value: item.CategoryCode,
                  label: item.CategoryName,
                };
              })}
            />
          </Form.Item>
          <Form.Item name="CategoryDesc" label="Ghi chú">
            <TextArea
              showCount
              maxLength={300}
              style={{ height: 100, resize: "none" }}
            />
          </Form.Item>
          <Form.Item label="Trạng thái" name="FlagActive">
            <Switch defaultChecked={true} />
          </Form.Item>
        </Form>
      </Modal>
    );
  }
);
