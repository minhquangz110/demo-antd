import Slider from "react-slick";
import { IProduct } from "../../models/product";
import { Product } from "../product";
import "./styles.less";
import { useRef, useState } from "react";
export const ProductSlider = (props: {
  products: IProduct[];
  slidesToShow: number;
}) => {
  const [dragging, setDragging] = useState<boolean>(false);

  const { products, slidesToShow } = props;
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: slidesToShow,
    initialSlide: 0,
    nextArrow: <></>,
    prevArrow: <></>,
    beforeChange: () => {
      setDragging(true);
    },
    afterChange: () => {
      setDragging(false);
    },
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      {products.map((p: IProduct, index) => (
        <div key={p._id} className="slider-item-padding">
          <Product key={p._id} {...p} dragging={dragging} />
        </div>
      ))}
    </Slider>
  );
};
