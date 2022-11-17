import {
  BellFilled,
  DropboxOutlined,
  MailFilled,
  ShopOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Col, Collapse, Layout, Menu, Row, Space } from "antd";
import "./styles.less";
import CollapsePanel from "antd/lib/collapse/CollapsePanel";

import { Outlet, useNavigate } from "react-router-dom";
import Logo2 from "../../assets/images/avatar.jpg";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { logout } from "../../features/auth/authSlice";

const { Header, Sider, Content } = Layout;

export const Admin = () => {
  const navigate = useNavigate();
  const onChange = (value: any) => {
    navigate(value.key);
  };
  const dispatch = useAppDispatch();
  return (
    <Layout className="admin-wrapper">
      <Sider className="slider-left" trigger={null}>
        <div className="navbar-header header-left">
          <img
            src="https://themekita.com/demo-atlantis-lite-bootstrap/livepreview/examples/assets/img/logo.svg"
            alt=""
          />
        </div>
        <Collapse defaultActiveKey={["1"]} expandIconPosition="end">
          <CollapsePanel
            header={
              <div className="user">
                <div className="avatar">
                  <img src={Logo2} alt="" />
                </div>
                <div className="user-details">
                  <div className="name">
                    <span>Best Cocss</span>
                  </div>
                  <div className="author">
                    <span>Admin</span>
                  </div>
                </div>
              </div>
            }
            key="1"
          >
            <ul className="profile-menu">
              <li> My Profile</li>
              <li>Edit Profile</li>
              <li
                onClick={() => {
                  dispatch(logout());
                }}
              >
                Log out
              </li>
            </ul>
          </CollapsePanel>
        </Collapse>
        <Menu
          mode="inline"
          defaultSelectedKeys={["accounts"]}
          onSelect={(value) => {
            onChange(value);
          }}
          items={[
            {
              key: "accounts",
              icon: <UserOutlined />,
              label: "Accounts",
            },
            {
              key: "products",
              icon: <DropboxOutlined />,
              label: "Product",
            },
            {
              key: "orders",
              icon: <ShopOutlined />,
              label: "Orders",
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background">
          <div className="navbar-header flex-end">
            <div className="topbar-nav">
              <Space size={18}>
                <MailFilled />
                <BellFilled />

                <div className="avatar">
                  <img src={Logo2} alt="" />
                </div>
              </Space>
            </div>
          </div>
        </Header>
        <Content className="site-layout-background">
          <Row className="content-container">
            <Col span={24}>
              <Outlet />
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};
