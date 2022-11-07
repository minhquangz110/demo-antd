import { Button } from "antd";
import { useAppDispatch } from "../../app/hooks";
import { removeProduct } from "../../features/cart/cartSlice";
import "./styles.less";

export const CartItemImage = (props: any) => {
  const dispatch = useAppDispatch();
  const { id, img } = props;
  return (
    <div className="cart-item-img-wrapper">
      <img src={img} alt="" />
      <Button
        className="btn-remove"
        onClick={() => {
          dispatch(removeProduct({ id: id }));
        }}
      >
        <span>x</span>
      </Button>
    </div>
  );
};
