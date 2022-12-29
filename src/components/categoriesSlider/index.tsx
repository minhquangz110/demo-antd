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
        <div key={index} className="slider-item-padding">
          <div className="category-item">
            <img
              src="https://www.portotheme.com/magento2/porto/pub/media/wysiwyg/smartwave/porto/homepage/04/shop4_cat1.jpg"
              alt=""
            />
            <div className="thumb"></div>
            <div className="category-title">
              <h2>Name</h2>
              <span>3 Products </span>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
};
