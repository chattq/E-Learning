import { Layout } from "antd";
import React from "react";
import LogoLayout from "./Logo-layout";
import HeaderLayout from "../../ui/header-layout/HeaderLayout";

export default function HeaderPage() {
  const { Header } = Layout;
  return (
    <Header
      style={{
        height: "65px",
        position: "fixed",
        display: "flex",
        justifyContent: "space-between",
        left: 0,
        top: 0,
        right: 0,
        zIndex: 100,
        backgroundColor: "#fff",
        lineHeight: "65px",
      }}
      className="box-shadow-header header-wrapper">
      <div>
        <LogoLayout />
      </div>
      <HeaderLayout />
    </Header>
  );
}
