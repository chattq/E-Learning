import { Avatar, Badge, Input, Layout, Menu, MenuProps, Space } from "antd";
import { UserOutlined, BellFilled } from "@ant-design/icons";
import "./admin-page-layout.scss";
import { protectedRoutes } from "../../../app-routers";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import HeaderLayout from "../../ui/header-layout/HeaderLayout";

type MenuItem = Required<MenuProps>["items"][number];
export default function AdminPageLayout({ children }: any) {
  const { Header, Content, Sider } = Layout;
  const { pathname: currentPath } = useLocation();

  const itemsSideBar: MenuItem[] = protectedRoutes
    .filter((val: any) => val.mainMenuTitle !== "")
    .map((item, index: any) => {
      return {
        key: item.key,
        icon: item.icon,
        label: item.mainMenuTitle,
        children: item?.children
          ?.filter((val: any) => val.subMenuTitle !== "")
          .map((child, index) => {
            return {
              key: `/${child.path}`,
              label: child.subMenuTitle,
              onClick: () => handleNavigationSidebarClick(child),
            };
          }),
      };
    });
  const navigate = useNavigate();

  const handleNavigationSidebarClick = (val: any) => {
    navigate(`/${val.path}`);
  };

  return (
    <Layout>
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
        <div></div>
        <HeaderLayout />
      </Header>
      <Layout
        style={{
          marginTop: "65px",
        }}>
        <Sider
          width="250px"
          style={{
            overflowY: "auto",
            position: "fixed",
            left: 0,
            top: 56,
            bottom: 0,
            width: 222,
            background: "#fff",
            paddingTop: "5px",
          }}
          className="sider-bar scrollable-wrapper">
          <Menu
            className="nav-menu-items"
            mode="inline"
            defaultOpenKeys={protectedRoutes.map((item: any) => item.key)}
            style={{ height: "100%", borderRight: 0 }}
            items={itemsSideBar}
            selectedKeys={[currentPath]}
          />
        </Sider>
        <Layout
          className="Layout_content"
          style={{
            marginLeft: 250,
          }}>
          <Content>
            <div
              style={{
                width: "100%",
              }}>
              {children}
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
