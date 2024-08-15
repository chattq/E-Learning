import React, { useRef } from "react";
import AdminPageLayout from "../../../packages/layouts/admin-page-layout/admin-page-layout";
import { Button, Space, Table, TableProps } from "antd";
import { useWindowSize } from "../../../packages/hooks/useWindowSize";
import "./AcountBank.scss";
import {
  IPopupAddAccountRef,
  PopupAddAccount,
} from "./use-popup/PopupAddAccount";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}
export default function AcountBank() {
  const popupAddAccountRef = useRef<IPopupAddAccountRef>();

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

  const showModal = () => {
    popupAddAccountRef.current?.showPopup();
  };

  return (
    <AdminPageLayout>
      <div className="px-4 py-4 table-container">
        <div className="table-toolbar py-[10px] text-right px-4 bg-white border-b-[1px]">
          <Button onClick={showModal}>Thêm tài khoản</Button>
        </div>
        <Table
          pagination={false}
          columns={columns}
          dataSource={data}
          scroll={{ y: windowSize.height - 200 }}
        />
      </div>
      <PopupAddAccount ref={popupAddAccountRef} />
    </AdminPageLayout>
  );
}
