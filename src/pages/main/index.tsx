import { Layout, Modal } from "antd";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Header2 } from "../../components/header";
import { Home } from "../home";
import "./styles.less";
import { FooterComponent } from "../../components/footer";
import { ScrollToTop } from "../../hooks/scrollToTop";
const { Header, Footer, Sider, Content } = Layout;

export const Main = () => {
  const [open, setOpen] = useState(true);
  return (
    <Layout className="layout">
      <Modal
        title="Note"
        style={{ top: 20 }}
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
      >
        <p>Tài khoản admin: admin / 12345678</p>
        <p> Tài khoản user: user / 12345678</p>
      </Modal>
      <Header className="main-header">
        <Header2 />
      </Header>
      <Content className="main-content">
        <Outlet />
      </Content>
      <Footer
        style={{ background: "#222529", marginTop: "64px" }}
        className="main-footer"
      >
        <FooterComponent />
      </Footer>
      <ScrollToTop />
    </Layout>
  );
};
