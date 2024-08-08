import React from "react";
import { useWindowSize } from "../../../../packages/hooks/useWindowSize";
import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Select,
  Space,
  Table,
  TableProps,
  Tooltip,
  Typography,
  DatePicker,
} from "antd";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}
export default function TabAll() {
  const windowSize = useWindowSize();

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
  ];

  const data: DataType[] = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
  ];
  const options = [
    {
      value: "zhejiang",
      label: "Zhejiang",
    },
    {
      value: "jiangsu",
      label: "Jiangsu",
    },
  ];
  const layout = {
    wrapperCol: { span: 30 },
  };

  const onFinish = (values: any) => {
    console.log(values);
  };
  const { Option } = Select;
  const { RangePicker } = DatePicker;
  return (
    <div>
      <div>
        <h1 className="text-[20px] font-medium text-[#333] mb-4">
          Hiệu quả khuyến mại
        </h1>
        <div className="flex justify-between grid-cols-3 border-[1px] rounded-md px-4 py-3">
          <div className="flex-1 text-center">
            <h2 className="font-medium text-[#696969] text-[15px] ">
              Doanh Số
            </h2>
            <p className="text-[22px] text-[#333]">₫ 8000</p>
          </div>
          <div className="flex-1 border-l-[1px] px-6 border-[#e5e5e5] text-center">
            <h2 className="font-medium text-[#696969] text-[15px]">
              Số lượng bán
            </h2>
            <p className="text-[22px] text-[#333]">8000</p>
          </div>
          <div className="flex-1 border-l-[1px] px-6 border-[#e5e5e5] text-center">
            <h2 className="font-medium text-[#696969] text-[15px]">
              Người mua
            </h2>
            <p className="text-[22px] text-[#333]">8000</p>
          </div>
        </div>
      </div>
      <h1 className="text-[20px] font-medium text-[#333] my-4 mt-6 border-t-[1px] pt-3">
        Danh sách chương trình
      </h1>
      <div>
        <Form name="nest-messages" onFinish={onFinish}>
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item label="Tìm kiếm">
                <Space.Compact>
                  <Form.Item
                    name={["address", "province"]}
                    noStyle
                    rules={[
                      { required: true, message: "Province is required" },
                    ]}>
                    <Select
                      placeholder="Select province"
                      style={{
                        width: 140,
                      }}>
                      <Option value="Zhejiang">Tên chương trình</Option>
                      <Option value="Jiangsu">Tên sản phẩm</Option>
                      <Option value="Jiangsu">Mã sản phẩm</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name={["address", "street"]}
                    noStyle
                    rules={[{ required: true, message: "Street is required" }]}>
                    <Input
                      style={{ width: "50%" }}
                      placeholder="Input street"
                    />
                  </Form.Item>
                </Space.Compact>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Thời gian khuyến mãi">
                <Space>
                  <Form.Item
                    name="Thời gian khuyến mãi"
                    noStyle
                    rules={[
                      { required: true, message: "Username is required" },
                    ]}>
                    <RangePicker />
                  </Form.Item>
                </Space>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Space size={20} style={{ marginLeft: 10 }}>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Tìm
                  </Button>
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Nhập lại
                  </Button>
                </Form.Item>
              </Space>
            </Col>
          </Row>
        </Form>
      </div>
      <Table
        pagination={false}
        columns={columns}
        dataSource={data}
        scroll={{ y: windowSize.height - 400 }}
      />
    </div>
  );
}
