import React from "react";
import AdminPageLayout from "../../../../packages/layouts/admin-page-layout/admin-page-layout";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Flex,
  DatePicker,
  Space,
  Table,
  TableProps,
} from "antd";
import { Breadcrumb } from "antd";
import "../Mst_Discount.scss";
import { useWindowSize } from "../../../../packages/hooks/useWindowSize";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}
export default function Discount_Create() {
  const nav = useNavigate();
  const { RangePicker } = DatePicker;

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  const data: DataType[] = [];

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Logo",
      dataIndex: "name",
      key: "name",
      align: "center",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Tên ngân hàng",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Số tài khoản",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Tên tài khoản",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Trạng thái",
      dataIndex: "name",
      key: "name",
      render: (text) => (
        <a>
          For long table，need to scroll to view the header and scroll bar，then
          you can now set the fixed header and scroll bar to follow the page.
        </a>
      ),
    },
    {
      title: "Action",
      key: "action",
      fixed: "right",
      render: (_, record) => (
        <Space size={10} wrap direction="vertical">
          <Button>Đặt làm mặc định</Button>
          <Button>Xóa</Button>
        </Space>
      ),
    },
  ];
  const windowSize = useWindowSize();
  return (
    <AdminPageLayout>
      <div className="px-4 pt-3 mb-[72px]">
        <div className="pb-3 ">
          <Breadcrumb
            style={{
              fontSize: "14px",
              lineHeight: "1.5",
              fontWeight: "500",
            }}
            separator=">"
            items={[
              {
                title: "Kênh Marketing",
              },
              {
                title: "Khuyến mãi của shop",
                onClick: () => {
                  nav("/admin/marketing/discount/list");
                },
                className: "cursor-pointer",
              },
              {
                title: "Tạo chương trình mới",
              },
            ]}
          />
        </div>
        <div className="bg-[#fff] border-[1px] px-6 pt-3 rounded-md">
          <h1 className="text-[20px]">Thông tin cơ bản</h1>
          <div>
            <Form
              name="login"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 18 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              style={{ maxWidth: 660, marginTop: 18, marginBottom: 0 }}>
              <Form.Item
                label="Tên chương trình khuyến mãi"
                name="username"
                extra="Tên chương trình khuyến mãi sẽ không hiển thị với người mua."
                rules={[
                  { required: true, message: "Please input your Username!" },
                ]}>
                <Input
                  style={{
                    width: 403,
                  }}
                  placeholder="Username"
                  count={{
                    max: 150,
                    show: true,
                  }}
                />
              </Form.Item>
              <Form.Item
                label="Thời gian khuyến mãi"
                name="username"
                extra="Thời gian của chương trình không được quá 180 ngày"
                rules={[
                  { required: true, message: "Please input your Username!" },
                ]}>
                <RangePicker
                  style={{
                    width: 403,
                  }}
                  showTime
                />
              </Form.Item>
            </Form>
          </div>
        </div>
        <div className="bg-[#fff] border-[1px] px-6 pt-5 rounded-md mt-4 flex-1 pb-6">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-[20px]">Sản phẩm khuyến mãi</h1>
            <Button>Thêm sản phẩm</Button>
          </div>
          <div className="pb-4 pt-3">
            <Table
              style={{
                height: windowSize.height - 350,
              }}
              pagination={false}
              columns={columns}
              dataSource={data}
              scroll={{ y: windowSize.height - 350 }}
            />
          </div>
        </div>
        <div className="bg-[#fff] px-3 py-3 right-[16px] fixed button_Save bottom-0 boxShadow-button">
          <div className="flex justify-end gap-4">
            <Button>Hủy</Button>
            <Button>Xác nhận</Button>
          </div>
        </div>
      </div>
    </AdminPageLayout>
  );
}
