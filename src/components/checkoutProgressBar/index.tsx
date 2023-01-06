import { Link, useNavigate } from "react-router-dom";
import "./styles.less";
import { Steps } from "antd";

import {
  LoadingOutlined,
  SmileOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Step } = Steps;

export const CheckoutProgressBar = (props: any) => {
  const { progress } = props;

  const navigate = useNavigate();

  return (
    <div className="checkoutProgressBar-Wrapper">
      <Steps className="steps-container"  current={progress}>
        <Step
          onClick={() => {
            navigate("/main/shoppingcart");
          }}
          title="Shopping Cart"
        ></Step>
        <Step
          onClick={() => {
            navigate("/main/checkout");
          }}
          title="Checkout"
        ></Step>
        <Step
          onClick={() => {
            navigate("/main/odercomplete");
          }}
          title="Order Complete"
        ></Step>
      </Steps>

      {/* <ul className="checkout-progress-bar">
        <li className={progress === 1 ? "active" : ""}>
          <Link to="/main/shoppingcart">Shopping Cart</Link>
        </li>
        <li className={progress === 2 ? "active" : ""}>
          <Link to="/main/checkout">Checkout</Link>
        </li>
        <li className={progress === 3 ? "active" : ""}>
          <Link to="/main/odercomplete">Order Complete</Link>
        </li>
      </ul> */}
    </div>
  );
};
