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
    <Row gutter={[24, 24]} className="footer-table">
      <Col xs={24} sm={16}>
        <Row justify="end" align="middle">
          <span className="lb-total">Total: </span>
          <span className="total">{formatDollar(total)}</span>
        </Row>
      </Col>
      <Col xs={24} sm={8}>
        <Link to={"/main/checkout"}>
          <Button className="btn-buy-now">Buy Now</Button>
        </Link>
      </Col>
    </Row>
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
        title: <span>Product</span>,
        key: "id",
        dataIndex: "name",
        render: (text) => <span>{text}</span>,
      },
      {
        title: <span>Price</span>,
        key: "id",
        dataIndex: "price",
        render: (text) => <span>{formatDollar(text)}</span>,
      },
      {
        title: <span>Quantity</span>,
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
        title: <span>Subtotal</span>,
        key: "id",
        dataIndex: "subtotal",
        render: (text) => {
          return <span className="item_subtotal">{formatDollar(text)}</span>;
        },
      },
    ];
  }, [updateQuantityHandle]);

  return (
    <div className="shoppingcart-wrapper">
      <div className="container">
        <CheckoutProgressBar progress={0} />
        <Row gutter={[40, 40]}>
          <Col sm={24} xs={0}>
            <div className="cart-table-container">
              <Table
                scroll={{ y: 380 }}
                columns={columns}
                rowKey={"_id"}
                dataSource={cart}
                pagination={false}
              />
            </div>
          </Col>

          {cart.map((product) => {
            return (
              <Col xs={24} sm={0}>
                <Row gutter={40}>
                  <Col span={8}>
                    <CartItemImage id={product._id} img={product.imgs[0]} />
                  </Col>
                  <Col span={16}>
                    <Row className="product-details">
                      <h4>{product.name}</h4>
                      <span>
                        <del className="old-price">
                          {formatDollar(product.oldPrice)}
                        </del>
                        <span className="price">
                          {formatDollar(product.price)}
                        </span>
                      </span>
                      <div className="quantity-container">
                        <Button
                          className="quantity-btn"
                          onClick={() => {
                            updateQuantityHandle(product._id, -1);
                          }}
                        >
                          -
                        </Button>
                        <Input
                          value={product.quantity}
                          className="quantity-input"
                        />
                        <Button
                          className="quantity-btn"
                          value={1}
                          onClick={() => {
                            updateQuantityHandle(product._id, 1);
                          }}
                        >
                          +
                        </Button>
                      </div>
                    </Row>
                  </Col>
                </Row>
              </Col>
            );
          })}
          <Col span={24}>
            <Footertable cart={cart} />
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default memo(ShoppingCart);
