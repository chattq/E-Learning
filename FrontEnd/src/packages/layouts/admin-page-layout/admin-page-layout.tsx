import { Avatar, Badge, Layout, Menu, MenuProps, Space } from "antd";
import { UserOutlined, BellFilled } from "@ant-design/icons";
import "./admin-page-layout.scss";
import { protectedRoutes } from "../../../app-routers";
import { useWindowSize } from "../../hooks/useWindowSize";
import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
type MenuItem = Required<MenuProps>["items"][number];
export default function AdminPageLayout({ children }: any) {
  const { Header, Content, Sider } = Layout;

  const itemsSideBar: MenuItem[] = protectedRoutes
    .filter((val: any) => val.mainMenuTitle !== "")
    .map((item, index) => {
      return {
        key: item.key,
        icon: item.icon,
        label: item.mainMenuTitle,
        className: "menu-items-nav",
        children: item?.children?.map((child, index) => {
          return {
            key: child.key,
            label: child.subMenuTitle,
            onClick: () => handleNavigationSidebarClick(child),
            className: "menu-items-nav",
          };
        }),
      };
    });
  const navigate = useNavigate();
  const windowSize = useWindowSize();

  const handleNavigationSidebarClick = (val: any) => {
    navigate(`/${val.path}`);
  };

  return (
    <Layout>
      <Header
        style={{
          height: "56px",
          position: "fixed",
          display: "flex",
          justifyContent: "space-between",
          left: 0,
          top: 0,
          right: 0,
          zIndex: 100,
          backgroundColor: "#fff",
          lineHeight: "56px",
        }}
        className="box-shadow-header">
        <div></div>
        <div></div>
        <Space size={20}>
          <Badge count={100} size="default" offset={[0, 0]}>
            <Avatar
              style={{
                backgroundColor: "#e4e6eb",
                color: "black",
                borderRadius: "50%",
              }}
              size={35}
              icon={<BellFilled />}
            />
          </Badge>
          <Avatar
            size={35}
            style={{
              backgroundColor: "#e4e6eb",
              color: "black",
              borderRadius: "50%",
            }}
            icon={<UserOutlined />}
          />
        </Space>
      </Header>
      <Layout
        style={{
          marginTop: "60px",
        }}>
        <Sider
          width="222px"
          style={{
            overflowY: "scroll",
            position: "fixed",
            left: 0,
            top: 56,
            bottom: 0,
            width: 222,
            background: "#fff",
          }}
          className="sider-bar">
          <Menu
            // onClick={hanldeClickItemSideBar}
            className="nav-menu-items"
            mode="inline"
            defaultOpenKeys={protectedRoutes.map((item: any) => item.key)}
            style={{ height: "100%", borderRight: 0 }}
            items={itemsSideBar}
          />
        </Sider>
        <Layout
          className="Layout_content"
          style={{
            marginLeft: 237,
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
