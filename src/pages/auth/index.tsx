import { SignIn } from "./SignIn";
import { Outlet } from "react-router-dom";
import "./styles.less";
const Auth = () => {
  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="form-container">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
export default Auth;
