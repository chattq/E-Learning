import { Tabs } from "antd";
import React, { forwardRef } from "react";

export const TabIntroduce = forwardRef(() => {
  const listTab = [
    {
      label: `Tổng quan`,
      key: "1",
      children: `Content of tab `,
    },
    {
      label: `Công việc và học vấn`,
      key: "2",
      children: `Content of tab `,
    },
    {
      label: `Thông tin liên hệ`,
      key: "3",
      children: `Content of tab `,
    },
  ];
  return (
    <>
      <div className="bg-[#fff] box-shadow-card rounded-[6px] mb-4">
        <Tabs
          className="tab_Introduce"
          defaultActiveKey="1"
          tabPosition={"left"}
          style={{ height: 300 }}
          items={listTab}
        />
      </div>
    </>
  );
});
