import Slider from "react-slick";
import { IProduct } from "../../models/product";
import { Product } from "../product";
import "./styles.less";
export const ProductSlider = (props: {
  products: IProduct[];
  slidesToShow: number;
}) => {
  const { products, slidesToShow } = props;
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      {products.map((p: IProduct, index) => (
        <div key={index} className="slider-item-padding">
          <Product key={index} {...p} />
        </div>
      ))}
    </Slider>
  );
};
