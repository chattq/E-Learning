import { Avatar, Badge, Layout, Space } from "antd";
import { UserOutlined, BellFilled } from "@ant-design/icons";
import "./admin-page-layout.scss";

export default function AdminPageLayoutNoSideBar({ children }: any) {
  const { Header, Content } = Layout;

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
        className="box-shadow-header header-wrapper">
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
        <Layout
          className="Layout_content"
          style={{
            marginLeft: 240,
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
