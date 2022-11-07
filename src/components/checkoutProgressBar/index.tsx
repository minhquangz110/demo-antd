import { Link } from "react-router-dom";
import "./styles.less";
export const CheckoutProgressBar = (props: any) => {
  const { progress } = props;
  return (
    <div className="checkoutProgressBar-Wrapper">
      <ul className="checkout-progress-bar">
        <li className={progress === 1 ? "active" : ""}>
          <Link to="/main/shoppingcart">Shopping Cart</Link>
        </li>
        <li className={progress === 2 ? "active" : ""}>
          <Link to="/main/checkout">Checkout</Link>
        </li>
        <li className={progress === 3 ? "active" : ""}>
          <Link to="/main/odercomplete">Order Complete</Link>
        </li>
      </ul>
    </div>
  );
};
