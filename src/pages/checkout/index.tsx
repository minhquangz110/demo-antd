import { Button, Col, Form, Input, Modal, Result, Row, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { useForm } from "rc-field-form";
import { useEffect, useMemo, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { CheckoutProgressBar } from "../../components/checkoutProgressBar";
import { clearCart, ICartItem } from "../../features/cart/cartSlice";
import { getProfile } from "../../persist/localstorage";
import { orderService } from "../../services/orderService";
import { formatDollar } from "../../utils/formatCurrency";

import "./styles.less";

const Footertable = (props: any) => {
  const { cart } = props;

  let total = 0;
  cart.forEach((p: { subtotal: number }) => {
    total += p.subtotal;
  });
  return (
    <>
      <div className="footer-table">
        <span className="title-footer">Total:</span>
        <span className="total-footer">{formatDollar(total)}</span>
      </div>
      <hr />
    </>
  );
};

export const Checkout = () => {
  const [form] = Form.useForm();
  const cart = useAppSelector((state) => state.cart);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const profile = useAppSelector((state) => state.auth.userProfile);
  useEffect(() => {
    form.setFieldsValue(profile);
  }, [form]);
  const [modal2Open, setModal2Open] = useState(false);

  const onFinish = async (value: any) => {
    if (!loading) {
      setLoading(true);
      const res = await orderService.createOrder(value, cart);
      console.log(res);
      if (res.success) {
        setModal2Open(true);
        dispatch(clearCart({}));
      }
      setLoading(false);
    }
  };

  const columns: ColumnsType<ICartItem> = useMemo(() => {
    return [
      {
        title: <span className="product-title">Product</span>,
        key: "id",
        render: (_, records) => (
          <span className="proudct-items">{`${records.name} * ${records.quantity}`}</span>
        ),
      },
      {
        title: <span className="product-title">Quantity</span>,
        key: "id",
        render: (_, { quantity }) => (
          <span className="quantity">{quantity}</span>
        ),
      },
      {
        title: "",
        key: "id",
        dataIndex: "subtotal",
        render: (subtotal) => <span>{formatDollar(subtotal)}</span>,
      },
    ];
  }, []);
  return (
    <div className="checkout-wrapper">
      <div className="container">
        <CheckoutProgressBar progress={1} />
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Row gutter={[40, 40]}>
            <Col md={14} xs={24}>
              <div className="billing-details">
                <Row>
                  <h2 className="title">Billing detials</h2>
                </Row>

                <Form.Item name="_id" label="User Name" required hidden>
                  <Input placeholder="input placeholder" disabled />
                </Form.Item>
                <Form.Item name="username" label="User Name" hidden required>
                  <Input placeholder="input placeholder" disabled />
                </Form.Item>
                <Form.Item
                  name="name"
                  label="Name"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Name..." />
                </Form.Item>

                <Form.Item
                  name="phone"
                  label="Phone"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Phone..." />
                </Form.Item>
                <Form.Item
                  name="address"
                  label="Address"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Address...." />
                </Form.Item>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Email..." />
                </Form.Item>
              </div>
            </Col>
            <Col className="your-order-container" md={10} xs={24}>
              <h3>Your Order</h3>
              <Table
                columns={columns}
                rowKey={"_id"}
                footer={() => {
                  return <Footertable cart={cart} />;
                }}
                dataSource={cart}
                pagination={false}
              />
              <Form.Item>
                <Button
                  size="large"
                  htmlType="submit"
                  className="btn-place-order"
                >
                  PLACE ORDER
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <Modal
          title={<h2 className="text-center"> Success </h2>}
          centered
          open={modal2Open}
          onOk={() => setModal2Open(false)}
          onCancel={() => setModal2Open(false)}
          okButtonProps={{ hidden: true }}
          cancelButtonProps={{ hidden: true }}
        >
          <Result
            status="success"
            title="Successfully Purchased s"
            extra={[
              <Button
                type="primary"
                onClick={() => {
                  navigate("/main");
                }}
                key="console"
              >
                Home
              </Button>,
              <Button
                key="buy"
                onClick={() => {
                  navigate("/main/myaccount");
                }}
              >
                Close
              </Button>,
            ]}
          />
        </Modal>
      </div>
    </div>
  );
};
