import { Layout, Menu, MenuProps } from "antd";
import "./user-page-layout.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { siderbarRouters } from "../../../routes/siderbar-routers";
import HeaderLayout from "../../ui/header-layout/HeaderLayout";
import LogoLayout from "../admin-page-layout/Logo-layout";

type MenuItem = Required<MenuProps>["items"][number];
export default function UserPageLayout({ children }: any) {
  const { Header, Content, Sider } = Layout;
  const { pathname: currentPath } = useLocation();

  const itemsSideBar: MenuItem[] = siderbarRouters.map((item, index: any) => {
    return {
      key: `/${item.key}`,
      icon: item.icon,
      label: item.mainMenuTitle,
      className: "menu-items-nav h-[50px]",
      onClick: () => handleNavigationSidebarClick(item),
    };
  });
  const navigate = useNavigate();

  const handleNavigationSidebarClick = (val: any) => {
    navigate(`${val.path}`);
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
        className="box-shadow-header header-wrapper ">
        <LogoLayout />
        <HeaderLayout />
      </Header>
      <Layout
        style={{
          marginTop: "65px",
        }}>
        <Sider
          collapsed={true}
          style={{
            overflowY: "auto",
            position: "fixed",
            left: 0,
            top: 65,
            bottom: 0,
            background: "#fff",
            paddingTop: "5px",
          }}
          className="scrollable-wrapper sider_bar_user_page border-r-[0.5px] ">
          <Menu
            className=""
            mode="inline"
            defaultOpenKeys={siderbarRouters.map((item: any) => {
              return `/${item.key}`;
            })}
            style={{ height: "100%", borderRight: 0 }}
            items={itemsSideBar}
            selectedKeys={[currentPath]}
          />
        </Sider>
      </Layout>
      <Layout
        className="Layout_content"
        style={{
          marginLeft: "80px",
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
  );
}
