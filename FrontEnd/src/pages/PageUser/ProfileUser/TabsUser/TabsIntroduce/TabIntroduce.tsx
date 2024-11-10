import { Tabs } from "antd";
import React, { forwardRef, useState } from "react";
import Overview from "./componentItem/Overview";
import { ButtonEdit } from "./componentItem/styleComponentItem/overViewStyle";
import ModalEditInfo from "./componentItem/ModalEditInfo";
import { useConfigAPI } from "../../../../../packages/api/config-api";
import { useQuery } from "@tanstack/react-query";

export const TabIntroduce = forwardRef(() => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  return (
    <>
      <div
        className="bg-[#fff] box-shadow-card rounded-[6px] mb-4"
        style={{ paddingTop: "30px" }}
      >
        {/* <Tabs
          className="tab_Introduce"
          defaultActiveKey="1"
          tabPosition={"left"}
          style={{ height: 300 }}
          items={listTab}
        /> */}
        <Overview />
        <ButtonEdit onClick={showModal}>Sửa</ButtonEdit>
        <ModalEditInfo
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      </div>
    </>
  );
});
