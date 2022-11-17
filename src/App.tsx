import { useCallback, useEffect } from "react";
import "./App.less";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { authenticate } from "./features/auth/authSlice";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.auth.loading);
  const _authenticate = useCallback(async () => {
    await dispatch(authenticate());
  }, [dispatch]);

  useEffect(() => {
    _authenticate();
  }, [_authenticate]);

  return isLoading ? <>loading...</> : <Outlet />;
}

export default App;
