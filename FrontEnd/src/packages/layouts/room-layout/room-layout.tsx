import { Avatar, Badge, Layout, Space } from "antd";
import "./room-layout.scss";
import { BellFilled, UserOutlined } from "@ant-design/icons";

export default function RoomLayout({ children }: any) {
  const { Content, Header } = Layout;

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
          marginTop: "65px",
        }}>
        <Layout className="Layout_content">
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
