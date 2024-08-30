import { useRef, useState } from "react";
import AdminPageLayout from "../../../packages/layouts/admin-page-layout/admin-page-layout";

import { Button, Space, Switch, Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { PopupAddCategory } from "./use-popup/popup-add-category";
import { useWindowSize } from "../../../packages/hooks/useWindowSize";
import { useConfigAPI } from "../../../packages/api/config-api";
import { useQuery } from "@tanstack/react-query";
import { formatDataCategories } from "./components/format-data-categories";
import { CategoryResponse } from "../../../packages/types/api.types";

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
  const tableRef = useRef<any>(null);

  const { data: Categories_GetAllActive, isLoading } = useQuery({
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
      title: "CategoryName",
      dataIndex: "CategoryName",
      key: "CategoryName",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "CategoryDesc",
      dataIndex: "CategoryDesc",
      key: "CategoryDesc",
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
  };
  const windowSize = useWindowSize();
  return (
    <AdminPageLayout>
      <div className="px-4 pt-4 ">
        <div
          className="p-[24px] mb-[16px] rounded-[6px] box-shadow-card bg-[#fff]"
          style={{
            height: windowSize.height - 98,
          }}>
          <Space align="center" style={{ marginBottom: 16 }}>
            <Button onClick={handleShowPopupAdd}>Thêm mới</Button>
          </Space>
          <Table
            ref={tableRef}
            loading={isLoading}
            rowKey={"CategoryCode"}
            expandable={{
              expandedRowKeys: Categories_GetAllActive?.map(
                (item: any) => item.CategoryCode
              ),
            }}
            scroll={{ y: windowSize.height - 240 }}
            columns={columns}
            rowSelection={rowSelection}
            dataSource={formatDataCategories(Categories_GetAllActive)}
            pagination={false}
            bordered
          />
        </div>
      </div>
      <PopupAddCategory
        ref={popupPopupRef}
        tableRef={tableRef}
        dataCategory={Categories_GetAllActive as CategoryResponse[]}
      />
    </AdminPageLayout>
  );
}
