import { Layout, Menu, MenuProps } from "antd";
import "./admin-page-layout.scss";
import { useLocation, useNavigate } from "react-router-dom";
import HeaderPage from "./HeaderPage";
import { adminRoutes } from "../../../routes/admin-routes";
import { useEffect, useRef } from "react";
import { flattenChildren } from "./logic";

type MenuItem = Required<MenuProps>["items"][number];
export default function AdminPageLayout({ children }: any) {
  const { Content, Sider } = Layout;
  const { pathname: currentPath } = useLocation();
  const menuRef = useRef<any>(null);

  const itemsSideBar: MenuItem[] = adminRoutes
    .filter((val: any) => val.mainMenuTitle !== "")
    .map((item, index: any) => {
      return {
        key: item.key,
        icon: item.icon,
        label: item.mainMenuTitle,
        onClick: item.path !== "" ? () => handleClickSubMenu(item) : () => {},
        children: item?.children
          ?.filter((val: any) => val.subMenuTitle !== "")
          .map((child, index) => {
            return {
              key: `${child.key}`,
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
  const handleClickSubMenu = (val: any) => {
    navigate(`/${val.path}`);
  };
  useEffect(() => {
    const selectedMenuItem = menuRef.current.menu.list?.querySelector(
      ".ant-menu-item-selected"
    );
    if (selectedMenuItem) {
      selectedMenuItem.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [currentPath]);

  return (
    <Layout>
      <HeaderPage />
      <Layout
        style={{
          paddingTop: "65px",
        }}>
        <div className="fixed top-[60px] bg-[#ffff] left-0 bottom-0 scrollable-wrapper sider-bar">
          <Sider
            style={{
              background: "#fff",
              paddingTop: "5px",
            }}
            className="sider-bar-antd">
            <Menu
              ref={menuRef}
              className="nav-menu-items"
              mode="inline"
              defaultOpenKeys={adminRoutes.map((item: any) => item.key)} // để mở side-bar
              style={{
                borderRight: 0,
                height: "100%",
                width: 250,
              }}
              items={itemsSideBar}
              selectedKeys={currentPath.split("/").filter((item) =>
                flattenChildren(adminRoutes)
                  .map((dataRoute: any) => dataRoute.key)
                  .includes(item)
              )}
            />
          </Sider>
        </div>
        <Layout
          className="Layout_content"
          style={{
            marginLeft: 260,
          }}>
          <Content>
            <div
              style={{
                width: "100%",
                height: "100%",
              }}>
              {children}
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
