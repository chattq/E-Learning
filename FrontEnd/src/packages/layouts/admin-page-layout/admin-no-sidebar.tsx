import { Layout } from "antd";

import "./admin-page-layout.scss";
import HeaderLayout from "../../ui/header-layout/HeaderLayout";

export default function AdminPageLayoutNoSideBar({ children }: any) {
  const { Header, Content } = Layout;

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
