import AdminPageLayout from "../../../packages/layouts/admin-page-layout/admin-page-layout";
import { Form, Input, Select, Space, Row, Col, Tabs, TabsProps } from "antd";
import "./Product_Add.scss";

import { NumberRangField } from "../../../packages/ui/NumberRangeField/NumberRangField";
import InforBaseProduct from "./components/InforBase_Product";

export default function ProductAdd() {
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
      children: "Content of Tab Pane 1",
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
      <div className="px-4 pt-3">
        <div className="p-[24px] mb-[16px] rounded-[6px] box-shadow-card bg-[#fff]">
          <InforBaseProduct />
        </div>
        <div className="p-[24px] mb-[16px] rounded-[6px] box-shadow-card bg-[#fff]">
          <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </div>
      </div>
    </AdminPageLayout>
  );
}
