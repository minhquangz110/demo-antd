import { Badge, Button, Col, Drawer, Row } from "antd";
import "./styles.less";
import { Space } from "antd";
import {
  BarsOutlined,
  CloseOutlined,
  HeartOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { memo, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { CartItemImage } from "../cartItemImage";
import { formatDollar } from "../../utils/formatCurrency";
import { SearchProduct } from "../searchProduct";

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
  const divFixed = useRef<HTMLDivElement>(null);
  const divRight = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const profile = useAppSelector((state) => state.auth.userProfile);
  const cart = useAppSelector((state) => state.cart);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsOpenMenu(false);
  }, [navigate]);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const toggleOpenMenu = () => {
    setIsOpenMenu(!isOpenMenu);
  };

  useLayoutEffect(() => {
    if (divFixed.current !== null) {
      const divAnimate = divFixed.current.getBoundingClientRect().top;

      const onScroll = () => {
        if (divFixed.current && divRight.current !== null)
          if (divAnimate < window.scrollY) {
            divRight.current.style.display = "flex";
            divFixed.current.style.position = "fixed";
            divFixed.current.style.top = "0";
            divFixed.current.style.left = "0";
            divFixed.current.style.borderBottom = "1px solid #d9d9d98f";
          } else {
            divFixed.current.style.position = "relative";
            divRight.current.style.display = "none";
            divFixed.current.style.borderBottom = "none";
          }
      };
      window.addEventListener("scroll", onScroll);
      return () => window.removeEventListener("scroll", onScroll);
    }
  }, []);

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

      {isOpenMenu && (
        <div className="menu">
          <SearchProduct />
          <div className="menu-list ">
            <Link onClick={toggleOpenMenu} to="">
              Home
            </Link>
            <Link onClick={toggleOpenMenu} to="shop">
              Shop
            </Link>
            <Link onClick={toggleOpenMenu} to="">
              Contact Us
            </Link>
            <Link onClick={toggleOpenMenu} to="shoppingcart">
              Cart
            </Link>
            <Link onClick={toggleOpenMenu} to="checkout">
              Check Out
            </Link>
          </div>
          <div className="authors">
            {profile && profile.name ? (
              <></>
            ) : (
              <>
                <Link to="/auth/login">Sign in </Link>
                <Link to="/auth/signup">Sign out</Link>
              </>
            )}
          </div>
        </div>
      )}

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
      </div>

      <div className="header-middle">
        <div className="header-middle-wrapper">
          <div className="container">
            <div className="header-logo">
              <div className="menu-icon" onClick={toggleOpenMenu}>
                {isOpenMenu ? (
                  <CloseOutlined className="bars-icon" />
                ) : (
                  <BarsOutlined className="bars-icon" />
                )}
              </div>

              <img src="/images/logo.png" alt="" />
            </div>
            <div className="search-container">
              <SearchProduct />
            </div>
            <div className="header-right">
              <Space size={12}>
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
        </div>
      </div>

      <div className="header-bottom">
        <div className="header-bottom-wrapper" ref={divFixed}>
          <div className="container">
            <div className="header-bottom-left h-full">
              <Link to="">Home</Link>
              <Link to="shop">Shop</Link>
              <Link to="">Contact Us</Link>
              <Link to="shoppingcart">Cart</Link>
              <Link to="checkout">Check Out</Link>
            </div>
            <div className="header-bottom-right" ref={divRight}>
              <Space size={12}>
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
        </div>
      </div>
    </div>
  );
};
