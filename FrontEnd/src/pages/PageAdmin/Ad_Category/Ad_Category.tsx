import { useRef, useState } from "react";
import AdminPageLayout from "../../../packages/layouts/admin-page-layout/admin-page-layout";

import { Button, Space, Switch, Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { PopupAddCategory } from "./use-popup/popup-add-category";

type TableRowSelection<T> = TableProps<T>["rowSelection"];

interface DataType {
  key: React.ReactNode;
  name: string;
  age: number;
  address: string;
  children?: DataType[];
}
export default function Ad_Category() {
  const [checkStrictly, setCheckStrictly] = useState(false);

  const popupPopupRef = useRef<any>(null);
  const columns: TableColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      width: "12%",
    },
    {
      title: "Address",
      dataIndex: "address",
      width: "30%",
      key: "address",
    },
  ];

  const data: DataType[] = [
    {
      key: 1,
      name: "John Brown sr.",
      age: 60,
      address: "New York No. 1 Lake Park",
      children: [
        {
          key: 11,
          name: "John Brown",
          age: 42,
          address: "New York No. 2 Lake Park",
        },
        {
          key: 12,
          name: "John Brown jr.",
          age: 30,
          address: "New York No. 3 Lake Park",
          children: [
            {
              key: 121,
              name: "Jimmy Brown",
              age: 16,
              address: "New York No. 3 Lake Park",
            },
          ],
        },
        {
          key: 13,
          name: "Jim Green sr.",
          age: 72,
          address: "London No. 1 Lake Park",
          children: [
            {
              key: 131,
              name: "Jim Green",
              age: 42,
              address: "London No. 2 Lake Park",
              children: [
                {
                  key: 1311,
                  name: "Jim Green jr.",
                  age: 25,
                  address: "London No. 3 Lake Park",
                },
                {
                  key: 1312,
                  name: "Jimmy Green sr.",
                  age: 18,
                  address: "London No. 4 Lake Park",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      key: 2,
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
    },
  ];

  // rowSelection objects indicates the need for row selection
  const rowSelection: TableRowSelection<DataType> = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    onSelect: (record, selected, selectedRows) => {
      console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows);
    },
    checkStrictly: true,
  };

  const handleShowPopupAdd = () => {
    popupPopupRef.current.showPopup();
    console.log(123, "a", popupPopupRef);
  };
  return (
    <AdminPageLayout>
      <div className="px-4 pt-3">
        <div className="p-[24px] mb-[16px] rounded-[6px] box-shadow-card bg-[#fff]">
          <Space align="center" style={{ marginBottom: 16 }}>
            <Button onClick={handleShowPopupAdd}>Thêm mới</Button>
          </Space>
          <Table
            expandable={{ defaultExpandedRowKeys: [1] }}
            columns={columns}
            rowSelection={rowSelection}
            dataSource={data}
            pagination={false}
            bordered
          />
        </div>
      </div>
      <PopupAddCategory ref={popupPopupRef} />
    </AdminPageLayout>
  );
}
