import { Button, Col, Input, Row } from "antd";
import Table, { ColumnsType } from "antd/lib/table";
import { memo, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { CartItemImage } from "../../components/cartItemImage";
import { CheckoutProgressBar } from "../../components/checkoutProgressBar";
import { ICartItem, updateQuantity } from "../../features/cart/cartSlice";
import { formatDollar } from "../../utils/formatCurrency";
import "./styles.less";

// const QuantityElement = (id: string , quantity: number)=>{
//   .
// }
const Footertable = (props: any) => {
  const { cart } = props;
  let total = 0;
  cart.forEach((p: { subtotal: number }) => {
    total += p.subtotal;
  });
  return (
    <div className="footer-table">
      <p className="lb-total">Total: </p>
      <span className="total">{formatDollar(total)}</span>
      <Link to={"/main/checkout"}>
        <Button className="btn-buy-now">Buy Now</Button>
      </Link>
    </div>
  );
};
const ShoppingCart = () => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);
  const updateQuantityHandle = useCallback(
    (id: string, quantity: number) => {
      dispatch(
        updateQuantity({
          id: id,
          quantity: quantity,
        })
      );
    },
    [dispatch]
  );

  const columns: ColumnsType<ICartItem> = useMemo(() => {
    return [
      {
        title: "",
        key: "id",
        width: 112,
        render: (_, { _id, imgs }) => {
          return <CartItemImage id={_id} img={imgs[0]} />;
        },
      },

      {
        title: "Product",
        key: "id",
        dataIndex: "name",
        render: (text) => <p>{text}</p>,
      },
      {
        title: "Price ",
        key: "id",
        dataIndex: "price",
        render: (text) => <p>{formatDollar(text)}</p>,
      },
      {
        title: "Quantity",
        key: "id",
        dataIndex: "quantity",
        render: (_, record) => (
          <div className="quantity-container">
            <Button
              className="quantity-btn"
              onClick={() => {
                updateQuantityHandle(record._id, -1);
              }}
            >
              -
            </Button>
            <Input value={record.quantity} className="quantity-input" />
            <Button
              className="quantity-btn"
              value={1}
              onClick={() => {
                updateQuantityHandle(record._id, 1);
              }}
            >
              +
            </Button>
          </div>
        ),
      },
      {
        title: "Subtotal",
        key: "id",
        dataIndex: "subtotal",
        render: (text) => {
          return <p className="item_subtotal">{formatDollar(text)}</p>;
        },
      },
    ];
  }, [updateQuantityHandle]);

  return (
    <div className="shoppingcart-wrapper">
      <div className="container">
        <CheckoutProgressBar progress={1} />
        <Row>
          <Col span={24}>
            <div className="cart-table-container">
              <Table
                scroll={{ y: 380 }}
                columns={columns}
                rowKey={"_id"}
                footer={() => {
                  return <Footertable cart={cart} />;
                }}
                dataSource={cart}
                pagination={false}
              />
            </div>
          </Col>
          {/* <Col span={8}></Col> */}
        </Row>
      </div>
    </div>
  );
};
export default memo(ShoppingCart);
