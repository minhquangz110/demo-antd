import { Button, message, Rate } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { IProduct } from "../../models/product";
import { formatDollar } from "../../utils/formatCurrency";
import { addToCart } from "../../features/cart/cartSlice";
import "./styles.less";

export const Product = (props: IProduct & { dragging?: boolean }) => {
  const { _id, name, price, oldPrice, imgs, dragging = false } = props;
  const dispatch = useAppDispatch();
  const nagivate = useNavigate();
  const addToCartHandle = (e: any) => {
    if (price) {
      const subtotal = price * 1;
      dispatch(addToCart({ ...props, quantity: 1, subtotal: subtotal }));
      message.success("success");
    }
  };

  const handleLink = (e: any) => {
     e.preventDefault();
    if (!dragging) {
      nagivate(`/main/products/${_id}`);
    }
  };

  return (
    <div className="product-wrapper w-full">
      <div className="label-group">
        <div className="product-label label-hot">HOT</div>
        <div className="product-label label-sale">-40%</div>
      </div>
      <div className="product-img w-full">
        <Link
          preventScrollReset={true}
          to={`/main/products/${_id}`}
          className=""
          onClick={(e) => {
            handleLink(e);
          }}
          onDragStart={(e) => {
            e.preventDefault();
          }}
        >
          <img className="w-full " src={imgs[0]} alt="" />
        </Link>
      </div>
      <div className="product-details">
        <Link
          preventScrollReset={true}
          to={`/main/products/${_id}`}
          className=""
          onClick={(e) => {
            handleLink(e);
          }}
          onDragStart={(e) => {
            e.preventDefault();
          }}
        >
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
