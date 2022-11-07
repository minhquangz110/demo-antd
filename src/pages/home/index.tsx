import {
  CarOutlined,
  MoneyCollectOutlined,
  UndoOutlined,
} from "@ant-design/icons";
import { Col, Row } from "antd";
import { useCallback, useEffect, useState } from "react";
import Slider from "react-slick";
import { ProductSlider } from "../../components/prodcutSlider";
import { ProductWidget } from "../../components/productWidget";
import "./styles.less";
import { v4 as uuidv4 } from "uuid";
import { IProduct } from "../../models/product";
import { productService } from "../../services/products";
export const Home = () => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const [data, setData] = useState<IProduct[]>([]);
  const fetch = useCallback(async () => {
    const res = await productService.getProducts();
    setData(res.data.data);
  }, []);
  useEffect(() => {
    fetch();
  }, [fetch]);

  // const featuredProducts = [
  //   {
  //     _id: uuidv4(),
  //     name: "Ultimate 3D Bluetooth Speaker",
  //     price: 49,
  //     oldPrice: 59,
  //     description: `Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.`,
  //     imgs: [
  //       "https://portotheme.com/html/porto_ecommerce/assets/images/products/product-1-2.jpg",
  //     ],
  //   },
  //   {
  //     _id: uuidv4(),
  //     name: "Ultimate 3D Bluetooth Speaker",
  //     price: 49,
  //     oldPrice: 59,
  //     description: `Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.`,
  //     imgs: [
  //       "https://portotheme.com/html/porto_ecommerce/assets/images/products/product-1-2.jpg",
  //     ],
  //   },
  //   {
  //     _id: uuidv4(),
  //     name: "Ultimate 3D Bluetooth Speaker",
  //     price: 49,
  //     oldPrice: 59,
  //     description: `Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.`,
  //     imgs: [
  //       "https://portotheme.com/html/porto_ecommerce/assets/images/products/product-1-2.jpg",
  //     ],
  //   },
  //   {
  //     _id: uuidv4(),
  //     name: "Ultimate 3D Bluetooth Speaker",
  //     price: 49,
  //     oldPrice: 59,
  //     description: `Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.`,
  //     imgs: [
  //       "https://portotheme.com/html/porto_ecommerce/assets/images/products/product-1-2.jpg",
  //     ],
  //   },
  //   {
  //     _id: uuidv4(),
  //     name: "Ultimate 3D Bluetooth Speaker",
  //     price: 49,
  //     oldPrice: 59,
  //     description: `Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.`,
  //     imgs: [
  //       "https://portotheme.com/html/porto_ecommerce/assets/images/products/product-1-2.jpg",
  //     ],
  //   },
  // ];
  // const arrivalProducts = [
  //   {
  //     _id: uuidv4(),
  //     name: "Ultimate 3D Bluetooth Speaker",
  //     price: 49,
  //     oldPrice: 59,
  //     description: `Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.`,
  //     imgs: [
  //       "https://portotheme.com/html/porto_ecommerce/assets/images/products/product-1-2.jpg",
  //     ],
  //   },
  //   {
  //     _id: uuidv4(),
  //     name: "Ultimate 3D Bluetooth Speaker",
  //     price: 49,
  //     oldPrice: 59,
  //     description: `Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.`,
  //     imgs: [
  //       "https://portotheme.com/html/porto_ecommerce/assets/images/products/product-1-2.jpg",
  //     ],
  //   },
  //   {
  //     _id: uuidv4(),
  //     name: "Ultimate 3D Bluetooth Speaker",
  //     price: 49,
  //     oldPrice: 59,
  //     description: `Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.`,
  //     imgs: [
  //       "https://portotheme.com/html/porto_ecommerce/assets/images/products/product-1-2.jpg",
  //     ],
  //   },
  //   {
  //     _id: uuidv4(),
  //     name: "Ultimate 3D Bluetooth Speaker",
  //     price: 49,
  //     oldPrice: 59,
  //     description: `Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.`,
  //     imgs: [
  //       "https://portotheme.com/html/porto_ecommerce/assets/images/products/product-1-2.jpg",
  //     ],
  //   },
  //   {
  //     _id: uuidv4(),
  //     name: "Ultimate 3D Bluetooth Speaker",
  //     price: 49,
  //     oldPrice: 59,
  //     description: `Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.`,
  //     imgs: [
  //       "https://portotheme.com/html/porto_ecommerce/assets/images/products/product-1-2.jpg",
  //     ],
  //   },
  // ];
  return (
    <div className="home-wrapper">
      <div className="home-slick">
        <Slider {...settings}>
          <img
            src="https://portotheme.com/html/porto_ecommerce/assets/images/demoes/demo4/slider/slide-2.jpg"
            alt=""
          />
          <img
            src="https://portotheme.com/html/porto_ecommerce/assets/images/demoes/demo4/slider/slide-1.jpg"
            alt=""
          />
        </Slider>
      </div>
      <div className="container">
        <Row className="info-boxs">
          <Col span={8}>
            <div className="info-box">
              <CarOutlined className="icon-support" />
              <div className="info-box-content">
                <h4>FREE SHIPPING & RETURN</h4>
                <p>Free shipping on all orders over $99.</p>
              </div>
            </div>
          </Col>
          <Col span={8}>
            <div className="info-box">
              <MoneyCollectOutlined className="icon-support" />
              <div className="info-box-content">
                <h4>MONEY BACK GUARANTEE</h4>
                <p>100% money back guarantee</p>
              </div>
            </div>
          </Col>
          <Col span={8}>
            <div className="info-box">
              <UndoOutlined className="icon-support" />
              <div className="info-box-content">
                <h4>ONLINE SUPPORT 24/7</h4>
                <p>100% money back guarantee</p>
              </div>
            </div>
          </Col>
        </Row>
        <Row gutter={20}>
          <Col span={8}>
            <img src="images/banner-1.jpg" alt="" />
          </Col>
          <Col span={8}>
            <img src="images/banner-2.jpg" alt="" />
          </Col>
          <Col span={8}>
            <img src="images/banner-3.jpg" alt="" />
          </Col>
        </Row>
        <div className="section-product">
          <h2>FEATURED PRODUCTS</h2>
          <ProductSlider products={data} slidesToShow={4} />
        </div>
        <div className="section-product">
          <h2>NEW ARRIVALS</h2>
          <ProductSlider products={data} slidesToShow={5} />
        </div>
        <div className="product-widgets">
          <div className="widget-container">
            <h4>Featured Products</h4>
            {data.slice(0, 3).map((p, index) => (
              <ProductWidget {...p} key={index} />
            ))}
          </div>
          <div className="widget-container">
            <h4>Featured Products</h4>
            {data.slice(0, 3).map((p, index) => (
              <ProductWidget {...p} key={index} />
            ))}
          </div>
          <div className="widget-container">
            <h4>Featured Products</h4>
            {data.slice(0, 3).map((p, index) => (
              <ProductWidget {...p} key={index} />
            ))}
          </div>
          <div className="widget-container">
            <h4>Featured Products</h4>
            {data.slice(0, 3).map((p, index) => (
              <ProductWidget {...p} key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
