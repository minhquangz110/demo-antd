import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import { Header2 } from "../../components/header";
import { Home } from "../home";
import "./styles.less";
const { Header, Footer, Sider, Content } = Layout;
export const Main = () => {
  return (
    <Layout className="layout">
      <Header className="main-header">
        <Header2 />
      </Header>
      <Content className="main-content">
        <Outlet />
      </Content>
      <Footer className="main-footer">Footer</Footer>
    </Layout>
  );
};
