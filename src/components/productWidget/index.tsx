import { Rate } from "antd";
import { Link } from "react-router-dom";
import { IProduct } from "../../models/product";
import { formatDollar } from "../../utils/formatCurrency";
import "./styles.less";

export const ProductWidget = (props: IProduct) => {
  const { _id, imgs, name, price } = props;
  return (
    <div className="product-widget-wrapper">
      <div>
        <Link to={`/main/products/${_id}`}>
          <img className="h-full w-full" src={imgs[0]} alt="" />
        </Link>
      </div>

      <div className="product-details">
        <Link to={`/main/products/${_id}`}>
          <h3 className="product-title">{name}</h3>
        </Link>

        <Rate disabled className="product-rate" value={4} />
        <div className="price">{formatDollar(price)}</div>
      </div>
    </div>
  );
};
