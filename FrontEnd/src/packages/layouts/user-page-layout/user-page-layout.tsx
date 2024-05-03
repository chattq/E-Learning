import { Avatar, Badge, Input, Layout, Menu, MenuProps, Space } from "antd";
import {
  UserOutlined,
  BellFilled,
  SnippetsOutlined,
  SolutionOutlined,
  ScheduleOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import "./user-page-layout.scss";
import { protectedRoutes } from "../../../app-routers";
import { useLocation, useNavigate } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];
export default function UserPageLayout({ children }: any) {
  const { Header, Content, Sider } = Layout;
  const { pathname: currentPath } = useLocation();
  const siderBar = [
    {
      key: "users_post",
      path: "",
      mainMenuTitle: "Trang chủ",
      permissionCode: "",
      icon: <HomeOutlined size={20} />,
    },
    {
      key: "users_post1",
      path: "/posts",
      mainMenuTitle: "Trang cá nhân",
      permissionCode: "",
      icon: <UserOutlined size={20} />,
    },
    {
      key: "users_post2",
      path: "/posts",
      mainMenuTitle: "bài viết",
      permissionCode: "",
      icon: <SnippetsOutlined size={20} />,
    },
    {
      key: "users_post3",
      path: "/posts",
      mainMenuTitle: "Khóa học của tôi",
      permissionCode: "",
      icon: <SolutionOutlined size={20} />,
    },
    {
      key: "users_post4",
      path: "/posts",
      mainMenuTitle: "Sự kiện",
      permissionCode: "",
      icon: <ScheduleOutlined size={20} />,
    },
  ];

  const itemsSideBar: MenuItem[] = siderBar.map((item, index: any) => {
    return {
      key: item.key,
      icon: item.icon,
      label: item.mainMenuTitle,
      className: "menu-items-nav h-[50px]",
      onClick: () => handleNavigationSidebarClick(item),
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
        <div className="w-[25%]">
          <Input placeholder="search" />
        </div>
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
          className="scrollable-wrapper sider_bar_user_page border-r-[0.5px]">
          <Menu
            className=""
            mode="inline"
            defaultOpenKeys={protectedRoutes.map((item: any) => item.key)}
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
            }}>
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
