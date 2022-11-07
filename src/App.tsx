import { useCallback, useEffect } from "react";
import "./App.less";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { authenticate } from "./features/auth/authSlice";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuthenticate = useAppSelector((state) => state.auth.isAuthenticate);
  const isLoading = useAppSelector((state) => state.auth.loading);
  const _authenticate = useCallback(async () => {
    await dispatch(authenticate());
  }, [dispatch]);

  useEffect(() => {
    _authenticate();
  }, [_authenticate]);

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticate) {
        console.log(1)
        navigate("/main");
        return;
      }
      navigate("/auth/login");
    }
  }, [isAuthenticate, navigate, isLoading]);
  return isLoading ? <>loading...</> : <Outlet />;
}

export default App;
