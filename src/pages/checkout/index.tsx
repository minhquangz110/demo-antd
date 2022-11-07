import { Button, Col, Form, Input, Modal, Result, Row, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { useForm } from "rc-field-form";
import { useEffect, useMemo, useState } from "react";

import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { CheckoutProgressBar } from "../../components/checkoutProgressBar";
import { ICartItem } from "../../features/cart/cartSlice";
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
      <Form.Item>
        <Button size="large" htmlType="submit" className="btn-place-order">
          PLACE ORDER
        </Button>
      </Form.Item>
    </>
  );
};

export const Checkout = () => {
  const [form] = Form.useForm();
  const cart = useAppSelector((state) => state.cart);
  useEffect(() => {
    const profile = getProfile();

    form.setFieldsValue(profile);
  }, [form]);
  const [modal2Open, setModal2Open] = useState(false);
  const onFinish = async (value: any) => {

    const res = await orderService.createOrder(value, cart);
    if (res.success) {
      setModal2Open(true);
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
        <CheckoutProgressBar progress={2} />
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Row gutter={40}>
            <Col span={14}>
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
            <Col className="your-order-container" span={10}>
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
            </Col>
          </Row>
        </Form>
        <Modal
          title="Vertically centered modal dialog"
          centered
          open={modal2Open}
          onOk={() => setModal2Open(false)}
          onCancel={() => setModal2Open(false)}
        ></Modal>
      </div>
    </div>
  );
};
