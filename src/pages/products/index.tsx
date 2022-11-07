import { ShoppingCartOutlined } from "@ant-design/icons";
import { Button, Col, Input, Modal, Rate, Row } from "antd";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Slider from "react-slick";
import { useAppDispatch } from "../../app/hooks";
import { ProductSlider } from "../../components/prodcutSlider";
import { addToCart } from "../../features/cart/cartSlice";
import { IProduct } from "../../models/product";
import { productService } from "../../services/products";
import { formatDollar } from "../../utils/formatCurrency";
import "./styles.less";

export const Products = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useAppDispatch();
  const sliderRef = useRef<any>(null);
  const slider2Ref = useRef<any>(null);
  const [slider, setSlider] = useState<any>({
    slider1: null,
    slider2: null,
  });
  const fetch = useCallback(async () => {
    if (params && params.id) {
      const result = await productService.getProductById(params.id);

      if (result.success) {
        setData(result.data);
      }
    }
  }, [params]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const [data, setData] = useState<Partial<IProduct>>({});

  const [quantity, setQuantity] = useState<number>(1);

  const handleUpdateQuantity = (value: number) => {
    if (quantity + value > 0) {
      setQuantity(quantity + value);
    }
  };


  useEffect(() => {
    setSlider({
      slider1: sliderRef.current,
      slider2: slider2Ref.current,
    });
  }, []);

  const addToCartHandle = () => {
    if (data.price) {
      const subtotal = data.price * quantity;
      dispatch(addToCart({ ...data, quantity: quantity, subtotal: subtotal }));
    }
  };
  const productGallerySettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const productsthumbnailSettings = {
    className: "slider-thunb",
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    swipeToSlide: true,
    focusOnSelect: true,
    // beforeChange: handle,
  };
  return (
    <div className="products-wrapper">
      <div className="container">
        <Row gutter={40}>
          <Col span={10}>
            <div className="product-gallery">
              <Slider
                className="product-gallery-slider"
                {...productGallerySettings}
                asNavFor={slider.slider2}
                ref={sliderRef}
              >
                {data.imgs?.map((p, index) => (
                  <div key={index}>
                    <img src={p} alt="" />
                  </div>
                ))}
              </Slider>
              <Slider
                ref={slider2Ref}
                asNavFor={slider.slider1}
                {...productsthumbnailSettings}
                className="product-thumbnail-slider"
              >
                {data.imgs?.map((p, index) => (
                  <div key={index} className="item-thumbnail">
                    <img src={p} alt="" />
                  </div>
                ))}
              </Slider>
            </div>
          </Col>
          <Col span={14}>
            <div className="product-details">
              <h1 className="product-title">{data.name}</h1>
              <Rate disabled allowHalf value={4} className="rating" />
              <hr />
              <div className="price-box">
                <del className="old-price">{formatDollar(data.oldPrice)}</del>
                <span className="new-price">{formatDollar(data.price)}</span>
              </div>
              <div className="product-description">
                <p>{data.description}</p>
              </div>
              <div className="product-action">
                <Row>
                  <div className="quantity-title">Số lượng: </div>
                  <div className="quantity-container">
                    <Button
                      className="quantity-btn"
                      onClick={() => {
                        handleUpdateQuantity(-1);
                      }}
                    >
                      -
                    </Button>
                    <Input value={quantity} className="quantity-input" />
                    <Button
                      className="quantity-btn"
                      onClick={() => {
                        handleUpdateQuantity(1);
                      }}
                    >
                      +
                    </Button>
                  </div>
                </Row>
                <Row className="action">
                  <Button
                    icon={<ShoppingCartOutlined />}
                    className="btn-add-to-cart"
                    onClick={addToCartHandle}
                  >
                    Add to cart
                  </Button>
                  <Button
                    className="btn-buy-now"
                    onClick={() => {
                      addToCartHandle();
                      navigate("/main/checkout");
                    }}
                  >
                    Buy now
                  </Button>
                </Row>
              </div>
            </div>
          </Col>
        </Row>
       
      </div>
    </div>
  );
};
