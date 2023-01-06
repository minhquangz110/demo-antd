import {
  CarOutlined,
  CreditCardOutlined,
  MoneyCollectOutlined,
  PhoneOutlined,
  StarOutlined,
  UndoOutlined,
} from "@ant-design/icons";
import { Col, Row } from "antd";
import { useCallback, useEffect, useState } from "react";
import Slider from "react-slick";
import { ProductSlider } from "../../components/prodcutSlider";
import { ProductWidget } from "../../components/productWidget";
import "./styles.less";
import { IProduct } from "../../models/product";
import { productService } from "../../services/products";
import { Link } from "react-router-dom";
import { CategoriesSlider } from "../../components/categoriesSlider";
import { url } from "inspector";
export const Home = () => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <></>,
    prevArrow: <></>,
  };

  const settingInfoBox = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <></>,
    prevArrow: <></>,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const [data, setData] = useState<IProduct[]>([]);
  const fetch = useCallback(async () => {
    const res = await productService.getProducts();
    setData(res.data.data);
  }, []);
  useEffect(() => {
    fetch();
  }, [fetch]);
  const categories = [
    {
      _id: "1",
      name: "Accessories",
      imgs: [
        "https://www.portotheme.com/magento2/porto/pub/media/wysiwyg/smartwave/porto/homepage/04/shop4_cat1.jpg",
      ],
    },
    {
      _id: "2",
      name: "Caps",
      imgs: [
        "https://www.portotheme.com/magento2/porto/pub/media/wysiwyg/smartwave/porto/homepage/04/shop4_cat2.jpg",
      ],
    },
    {
      _id: "3",
      name: "Clothing",
      imgs: [
        "https://www.portotheme.com/magento2/porto/pub/media/wysiwyg/smartwave/porto/homepage/04/shop4_cat3.jpg",
      ],
    },
    {
      _id: "4",
      name: "Clothing",
      imgs: [
        "https://www.portotheme.com/magento2/porto/pub/media/wysiwyg/smartwave/porto/homepage/04/shop4_cat4.jpg",
      ],
    },

    {
      _id: "5",
      name: "Fashion",
      imgs: [
        "https://www.portotheme.com/magento2/porto/pub/media/wysiwyg/smartwave/porto/homepage/04/shop4_cat5.jpg",
      ],
    },
  ];
  return (
    <div className="home-wrapper">
      <div className="home-slick">
        <Slider {...settings}>
          <div className="slider-content-box slider1" style={{}}></div>
          <div className="slider-content-box slider2" style={{}}></div>
          <img
            src=""
            alt=""
          />
        </Slider>
      </div>
      <div className="container">
        <Slider className="info-boxs" {...settingInfoBox}>
          <div className="info-box">
            <CarOutlined className="icon-support" />
            <div className="info-box-content">
              <h4>FREE SHIPPING & RETURN</h4>
              <p>Free shipping on all orders over $99.</p>
            </div>
          </div>
          <div className="info-box">
            <MoneyCollectOutlined className="icon-support" />
            <div className="info-box-content">
              <h4>MONEY BACK GUARANTEE</h4>
              <p>100% money back guarantee</p>
            </div>
          </div>
          <div className="info-box">
            <UndoOutlined className="icon-support" />
            <div className="info-box-content">
              <h4>ONLINE SUPPORT 24/7</h4>
              <p>100% money back guarantee</p>
            </div>
          </div>
        </Slider>

        <Row gutter={[0, 20]}>
          <Col md={8} xs={24} sm={24} className="banner-1"></Col>
          <Col md={8} xs={24} sm={24} className="banner-2"></Col>{" "}
          <Col md={8} xs={24} sm={24} className="banner-3"></Col>
        </Row>

        <div className="section-product">
          <h2 className="title-h2">FEATURED PRODUCTS</h2>
          <ProductSlider products={data} slidesToShow={4} />
        </div>
        <div className="section-product">
          <h2 className="title-h2">NEW ARRIVALS</h2>
          <ProductSlider products={data} slidesToShow={5} />
        </div>

        <div className="banner-4">
          <h2
            style={{
              flex: 1,
              fontSize: " 1.275rem",
              lineHeight: 1.5,
              textAlign: "left",
              color: "#fff",
              margin: "0 24px",
            }}
          >
            <strong
              style={{
                padding: "8px 16px",
                position: "relative",
                zIndex: 1,
                marginRight: "8px",
              }}
            >
              BIG SALE
            </strong>
            ALL NEW FASHION BRANDS ITEMS UP TO 70% OFF
            <small style={{ marginLeft: "7px" }}>Online Purchases Only</small>
          </h2>

          <Link
            style={{
              color: "#222529",
              fontWeight: 800,
              fontSize: "14px",
              padding: "16px 44px",
              margin: "0 20px",
              background: "#fff",
            }}
            to=""
          >
            VIEW SALE{" "}
          </Link>
        </div>

        <div className="section-product">
          <h2 className="title-h2">BROWSE OUR CATEGORIES </h2>
          <CategoriesSlider categories={categories} slidesToShow={5} />
        </div>

        <Row gutter={[0, 0]} className="section-product service-container">
          <Col md={8} xs={24} sm={24}>
            <div className="service-wrapper">
              <PhoneOutlined className="service-icon" />
              <h3>CUSTOMER SUPPORT</h3>
              <p>You Won't Be Alone</p>
              <div>
                We really care about you and your website as much as you do.
                Purchasing Porto or any other theme from us you get 100% free
                support.
              </div>
            </div>
          </Col>
          <Col md={8} xs={24} sm={24}>
            <div className="service-wrapper">
              <CreditCardOutlined className="service-icon" />
              <h3>FULLY CUSTOMIZABLE</h3>
              <p>Tons Of Options</p>
              <div>
                With Porto you can customize the layout, colors and styles
                within only a few minutes. Start creating an amazing website
                right now!
              </div>
            </div>
          </Col>
          <Col md={8} xs={24} sm={24}>
            <div className="service-wrapper">
              <StarOutlined className="service-icon" />
              <h3>POWERFUL ADMIN</h3>
              <p>Made To Help You</p>
              <div>
                Porto has very powerful admin features to help customer to build
                their own shop in minutes without any special skills in web
                development.
              </div>
            </div>
          </Col>
        </Row>
        <Row gutter={[0, 24]} className="product-widgets">
          <Col md={6} xs={24} sm={24} className="widget-container">
            <h4>Featured Products</h4>
            {data.slice(0, 3).map((p, index) => (
              <ProductWidget {...p} key={index} />
            ))}
          </Col>
          <Col md={6} xs={24} sm={24} className="widget-container">
            <h4>BEST SELLING PRODUCTS</h4>
            {data.slice(0, 3).map((p, index) => (
              <ProductWidget {...p} key={index} />
            ))}
          </Col>
          <Col md={6} xs={24} sm={24} className="widget-container">
            <h4>LATESET PRODUCTS</h4>
            {data.slice(0, 3).map((p, index) => (
              <ProductWidget {...p} key={index} />
            ))}
          </Col>
          <Col md={6} xs={24} sm={24} className="widget-container">
            <h4>TOP RATED PRODUCTS</h4>
            {data.slice(0, 3).map((p, index) => (
              <ProductWidget {...p} key={index} />
            ))}
          </Col>
        </Row>
      </div>
    </div>
  );
};
