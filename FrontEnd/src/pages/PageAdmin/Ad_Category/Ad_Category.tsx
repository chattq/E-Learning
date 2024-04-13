import { useRef, useState } from "react";
import AdminPageLayout from "../../../packages/layouts/admin-page-layout/admin-page-layout";

import { Button, Space, Switch, Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { PopupAddCategory } from "./use-popup/popup-add-category";
import { useWindowSize } from "../../../packages/hooks/useWindowSize";
import { useConfigAPI } from "../../../packages/api/config-api";
import { useQuery } from "@tanstack/react-query";
import { formatDataCategories } from "./components/format-data-categories";

type TableRowSelection<T> = TableProps<T>["rowSelection"];

interface DataType {
  key: React.ReactNode;
  name: string;
  age: number;
  address: string;
  children?: DataType[];
}
export default function Ad_Category() {
  const api = useConfigAPI();

  const { data: Categories_GetAllActive } = useQuery({
    queryKey: ["Categories_GetAllActive"],
    queryFn: async () => {
      const response = await api.Categories_GetAllActive();
      if (response.isSuccess) {
        return response.data;
      } else {
        console.log(response);
      }
    },
  });
  console.log(34, formatDataCategories(Categories_GetAllActive));

  const popupPopupRef = useRef<any>(null);
  // const columns: TableColumnsType<DataType> = [
  //   {
  //     title: "CategoryName",
  //     dataIndex: "CategoryName",
  //     key: "CategoryName",
  //     render: (text) => <a>{text}</a>,
  //   },
  //   {
  //     title: "CategoryDesc",
  //     dataIndex: "CategoryDesc",
  //     key: "CategoryDesc",
  //     width: "12%",
  //   },
  // ];
  const columns: TableColumnsType<DataType> = [
    {
      title: "CategoryCode",
      dataIndex: "CategoryCode",
      key: "CategoryCode",
    },
    {
      title: "CategoryName",
      dataIndex: "CategoryName",
      key: "CategoryName",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "CategoryDesc",
      dataIndex: "CategoryDesc",
      key: "CategoryDesc",
      width: "12%",
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
  const windowSize = useWindowSize();
  return (
    <AdminPageLayout>
      <div className="px-4 pt-4">
        <div
          className="p-[24px] mb-[16px] rounded-[6px] box-shadow-card bg-[#fff]"
          style={{
            height: windowSize.height - 93,
          }}>
          <Space align="center" style={{ marginBottom: 16 }}>
            <Button onClick={handleShowPopupAdd}>Thêm mới</Button>
          </Space>
          <Table
            rowKey={"CategoryCode"}
            style={{ maxHeight: windowSize.height - 180, overflowY: "auto" }}
            expandable={{ defaultExpandedRowKeys: [1] }}
            columns={columns}
            rowSelection={rowSelection}
            dataSource={formatDataCategories(Categories_GetAllActive)}
            // dataSource={data}
            pagination={false}
            bordered
          />
        </div>
      </div>
      <PopupAddCategory ref={popupPopupRef} />
    </AdminPageLayout>
  );
}
