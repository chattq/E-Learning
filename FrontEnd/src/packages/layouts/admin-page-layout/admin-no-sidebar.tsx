import { Layout } from "antd";
import "./admin-page-layout.scss";
import HeaderPage from "./HeaderPage";

export default function AdminPageLayoutNoSideBar({ children }: any) {
  const { Content } = Layout;

  return (
    <Layout
      style={{
        height: "100vh",
      }}>
      <HeaderPage />
      <Layout
        style={{
          marginTop: "65px",
        }}>
        <Layout className="Layout_content">
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
