import { PropsWithChildren, useEffect, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { getProfile, getToken } from "../persist/localstorage";

interface IAuthGuardProps {}

export const AuthAdminGuard = (props: PropsWithChildren<IAuthGuardProps>) => {
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();
  const { children } = props;
  const profile = useAppSelector((state) => state.auth.userProfile);
  useEffect(() => {
    if (profile) {
      if (profile.author === "admin") {
        setIsAuth(true);
      } else {
        navigate("/main");
      }
    } else {
      navigate("/auth/login");
    }
  }, [navigate, profile]);

  return isAuth ? <>{children}</> : <></>;
};
