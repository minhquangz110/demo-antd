import Slider from "react-slick";
import { ICategory } from "../../models/category";

import "./styles.less";
export const CategoriesSlider = (props: {
  categories: ICategory[];
  slidesToShow: number;
}) => {
  const { categories, slidesToShow } = props;
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    nextArrow: <></>,
    prevArrow: <></>,
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
      {categories.map((p: ICategory, index) => (
        <div key={index} className=" category-slider-wrapper">
          <div className="category-item blur-hover ">
            <img src={p.imgs[0]} alt="" />
              <div className=""></div>
            <div className="category-title">
              <h2>{p.name}</h2>
              <span>3 Products </span>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
};
