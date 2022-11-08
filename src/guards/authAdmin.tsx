import { PropsWithChildren, useEffect, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile, getToken } from "../persist/localstorage";

interface IAuthGuardProps {}

export const AuthAdminGuard = (props: PropsWithChildren<IAuthGuardProps>) => {
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();
  const { children } = props;

  useEffect(() => {
    const token = getToken();
    if (token) {
      if ((getProfile().author === "admin")) {
        setIsAuth(true);
      } else {
        navigate("/main");
      }
    } else {
      navigate("/auth/login");
    }
  }, [navigate]);

  return isAuth ? <>{children}</> : <></>;
};
