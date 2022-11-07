import { PropsWithChildren, useEffect, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../persist/localstorage";

interface IAuthGuardProps {}

export const AuthGuard = (props: PropsWithChildren<IAuthGuardProps>) => {
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();
  const { children } = props;

  useEffect(() => {
    const token = getToken();
    if (token) {
      setIsAuth(true);
    } else {
      navigate("/auth/login");
    }
  }, [navigate]);

  return isAuth ? <>{children}</> : <></>;
};
