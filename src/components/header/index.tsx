import { Badge, Button, Col, Divider, Drawer, Row } from "antd";
import "./styles.less";
import { Input, Space } from "antd";
import {
  AppstoreOutlined,
  BarsOutlined,
  HeartOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { memo, useContext, useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { CartItemImage } from "../cartItemImage";
import { formatDollar } from "../../utils/formatCurrency";

const { Search } = Input;

const DrawerContent = memo((props: any) => {
  const navigate = useNavigate();
  const { handleClose } = props;
  const products = useAppSelector((state) => state.cart);
  let total = 0;
  products.forEach((p: { subtotal: number }) => {
    total += p.subtotal;
  });

  return (
    <Row className="cart-products-container">
      <Col>
        <Row className="cart-products">
          {products.map((product, index) => {
            return (
              <Row className="product" key={index}>
                <Col span={16} className="align-item-center">
                  <div className="flex-column">
                    <div className="product-title">{product.name}</div>
                    <div className="product-price">
                      {formatDollar(product.price)} × {product.quantity}
                    </div>
                  </div>
                </Col>
                <Col span={8} className="product-img">
                  <CartItemImage id={product._id} img={product.imgs[0]} />
                </Col>
              </Row>
            );
          })}
        </Row>

        <Row justify="space-between">
          <Col>
            <span className="cart-total">SUBTOTAL :</span>
          </Col>
          <Col>
            <span className="cart-total total-price">
              {formatDollar(total)}
            </span>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <div className="cart-action">
              <Button
                icon={<ShoppingCartOutlined />}
                onClick={() => {
                  handleClose();
                  navigate("shoppingcart");
                }}
                className="btn view-cart"
              >
                View cart
              </Button>
              <Button
                onClick={() => {
                  handleClose();
                  navigate("checkout");
                }}
                className="btn checkout "
              >
                Checkout
              </Button>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
});

export const Header2 = () => {
  const onSearch = () => {};
  const [open, setOpen] = useState(false);
  const profile = useAppSelector((state) => state.auth.userProfile);
  const cart = useAppSelector((state) => state.cart);
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  return (
    <div className="header-wrapper">
      <Drawer
        title={<b>Shopping Cart</b>}
        placement="right"
        className="shopping-cart-drawer"
        onClose={onClose}
        open={open}
      >
        <DrawerContent handleClose={onClose} />
      </Drawer>
      <div className="container">
        <div className=" header-top flex-center">
          <Link to="">About Us</Link>
          <Link to="">My Whitelist</Link>
          <Link to="shoppingcart">Cart</Link>
          <Link to="myaccount">My Account</Link>

          {profile && profile.name ? (
            <Link className="profile-name" to="myaccount">
              {profile.name}
            </Link>
          ) : (
            <Link to="/auth/login">Login</Link>
          )}
        </div>
        <div className="header-middle">
          <div className="header-logo">
        
            <BarsOutlined className="bars-icon" />
            <img src="/images/logo.png" alt="" />
          </div>
          <Search
            size="middle"
            className="search-input"
            bordered
            placeholder="Search..."
            onSearch={onSearch}
          />
          <div className="header-right">
            <Space size={4}>
              <Link to="myaccount">
                <UserOutlined style={{ fontSize: 32 }} />
              </Link>
              <Link to="">
                <HeartOutlined style={{ fontSize: 32 }} />
              </Link>
              <Link to="#">
                <Badge count={cart.length}>
                  <ShoppingCartOutlined
                    onClick={showDrawer}
                    style={{ fontSize: 32 }}
                  />
                </Badge>
              </Link>
            </Space>
          </div>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left h-full">
            <Link to="">Home</Link>
            <Link to="shop">Shop</Link>
            <Link to="">Contact Us</Link>
            <Link to="shoppingcart">Cart</Link>
            <Link to="checkout">Check Out</Link>
          </div>
          <div className="header-bottom-right"></div>
        </div>
      </div>
    </div>
  );
};
