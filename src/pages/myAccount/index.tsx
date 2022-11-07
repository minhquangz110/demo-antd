import { UserAddOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, message, Row } from "antd";
import { useForm } from "antd/lib/form/Form";
import {
  ReactNode,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

import { OrderList } from "../../components/orderList";
import { ProfileContext } from "../../features/ProfileProvider/profileProvider";
import { getProfile, removeToken } from "../../persist/localstorage";
import { accountService } from "../../services/accounts";
import "./styles.less";
const AccountDetails = () => {
  const [form] = useForm();
  const profileContext = useContext(ProfileContext);
  const onFinish = async (value: any) => {
    const res = await accountService.update(value);
    profileContext.updateProfile(value);
    if (res.success) {
      message.success({ content: "Success" });
      console.log(res);
    } else {
      message.error({ content: res.message });
    }
    //profile = {};
  };

  useLayoutEffect(() => {
    form.setFieldsValue(profileContext.value);
  });
  return (
    <Form layout="vertical" form={form} onFinish={onFinish}>
      <Row gutter={30}>
        <Col span={24}>
          <div className="billing-details">
            <Row>
              <h2 className="title">Account detials</h2>
            </Row>
            <Form.Item name="_id" label="User Name" required hidden>
              <Input placeholder="input placeholder" disabled />
            </Form.Item>
            <Form.Item name="username" label="User Name" required>
              <Input placeholder="input placeholder" disabled />
            </Form.Item>
            <Form.Item name="name" label="Name" required>
              <Input placeholder="input placeholder" />
            </Form.Item>

            <Form.Item name="phone" label="Phone" required>
              <Input placeholder="input placeholder" />
            </Form.Item>
            <Form.Item name="address" label="Address" required>
              <Input placeholder="input placeholder" />
            </Form.Item>
            <Form.Item name="email" label="Email" required>
              <Input placeholder="input placeholder" />
            </Form.Item>
          </div>
        </Col>
        <Col span={24} className="flex-center">
          <Form.Item>
            <Button
              type="primary"
              className="btn-update"
              size="large"
              htmlType="submit"
            >
              Update
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

class ITabContent {
  myAccount: ReactNode;
  orders: ReactNode;
}
export const MyAccount = () => {
  const [tabName, setTabName] = useState<keyof ITabContent>("myAccount");
  const tabContent = {
    myAccount: <AccountDetails />,
    orders: <OrderList />,
  };
  const navigate = useNavigate();
  const onChange = (value: any) => {
    setTabName(value);
  };

  return (
    <div className="my-account-wrapper">
      <div className="container">
        <Row>
          <Col span={7}>
            <ul className="list">
              <li className="item">
                <Button
                  value="myAccount"
                  onClick={() => {
                    onChange("myAccount");
                  }}
                  type="text"
                  className="btn"
                >
                  My Account
                </Button>
              </li>
              <li className="item">
                <Button
                  value="myAccount"
                  onClick={() => {
                    onChange("orders");
                  }}
                  type="text"
                  className="btn"
                >
                  Orders
                </Button>
              </li>
              <li className="item">
                <Button
                  value="myAccount"
                  onClick={() => {
                    removeToken();
                    navigate("/auth/login");
                  }}
                  type="text"
                  className="btn"
                >
                  Log out
                </Button>
              </li>
            </ul>
          </Col>
          <Col span={17}>{tabContent[tabName]}</Col>
        </Row>
      </div>
    </div>
  );
};
