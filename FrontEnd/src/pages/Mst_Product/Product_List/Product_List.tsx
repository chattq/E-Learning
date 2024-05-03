import AdminPageLayout from "../../../packages/layouts/admin-page-layout/admin-page-layout";
import { Form, Input, Select, Space, Row, Col, Tabs, TabsProps } from "antd";
import "./Product_List.scss";

import { NumberRangField } from "../../../packages/ui/NumberRangeField/NumberRangField";

export default function ProductList() {
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };
  const { Option } = Select;
  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Tab 1",
      children: "Content of Tab Pane 1 hihi",
    },
    {
      key: "2",
      label: "Tab 2",
      children: "Content of Tab Pane 2",
    },
    {
      key: "3",
      label: "Tab 3",
      children: "Content of Tab Pane 3",
    },
  ];

  return (
    <AdminPageLayout>
      <div className="px-4 py-3">
        <div className="p-[24px] mb-[16px] rounded-[6px] box-shadow-card bg-[#fff]">
          <Form name="complex-form" onFinish={onFinish} labelCol={{ span: 4 }}>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  style={{
                    width: "100%",
                  }}>
                  <Space.Compact>
                    <Form.Item
                      name={["address", "province"]}
                      noStyle
                      rules={[
                        { required: true, message: "Province is required" },
                      ]}>
                      <Select
                        defaultValue={"ProductName"}
                        style={{ width: "40%" }}
                        placeholder="Select province"
                        className="w-[50px]">
                        <Option value="ProductName">Tên sản phẩm</Option>
                        <Option value="ProductCode">Mã sản phẩm</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      name={["address", "street"]}
                      noStyle
                      rules={[
                        { required: true, message: "Street is required" },
                      ]}>
                      <Input
                        style={{ width: "90%" }}
                        placeholder="Input street"
                      />
                    </Form.Item>
                  </Space.Compact>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Ngành hàng" name="code">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item label="Kho hàng" name="name">
                  <NumberRangField />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Doanh số" name="name">
                  <NumberRangField />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
        <div className="p-[24px] mb-[16px] rounded-[6px] box-shadow-card bg-[#fff]">
          <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </div>
      </div>
    </AdminPageLayout>
  );
}
