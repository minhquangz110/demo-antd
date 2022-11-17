import { Button, message, Rate } from "antd";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { IProduct } from "../../models/product";
import { formatDollar } from "../../utils/formatCurrency";
import { addToCart } from "../../features/cart/cartSlice";
import "./styles.less";

export const Product = (props: IProduct) => {
  const { _id, name, price, oldPrice, imgs } = props;
  const dispatch = useAppDispatch();

  const addToCartHandle = () => {
    if (price) {
      const subtotal = price * 1;
      dispatch(addToCart({ ...props, quantity: 1, subtotal: subtotal }));
      message.success("success");
    }
  };
  return (
    <div className="product-wrapper w-full">
      <div className="label-group">
        <div className="product-label label-hot">HOT</div>
        <div className="product-label label-sale">-40%</div>
      </div>
      <div className="product-img w-full ">
        <Link to={`/main/products/${_id}`}>
          <img className="w-full" src={imgs[0]} alt="" />
        </Link>
      </div>
      <div className="product-details">
        <Link to={`/main/products/${_id}`}>
          <h3 className="product-title ">{name}</h3>
        </Link>

        <Rate className="product-rate" disabled value={4} allowHalf />
        <div className="price-box flex-center">
          <del className="old-price">${formatDollar(oldPrice)}</del>
          <span className="price">${formatDollar(price)}</span>
        </div>
        <div className="product-action">
          <Button
            className="btn-add-to-cart uppercase"
            onClick={addToCartHandle}
            type="default"
          >
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  );
};
