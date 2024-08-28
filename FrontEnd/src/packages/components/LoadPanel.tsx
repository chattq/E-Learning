import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import React from "react";

const LoadPanel = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        zIndex: 1000,
      }}
    >
      <Spin
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        indicator={
          <LoadingOutlined style={{ fontSize: 50, color: "#bb0000" }} spin />
        }
      />
    </div>
  );
};

export default LoadPanel;
