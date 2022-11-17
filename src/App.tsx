import { useCallback, useEffect } from "react";
import "./App.less";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { authenticate } from "./features/auth/authSlice";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const profile =  useAppSelector((state) => state.auth.userProfile);
  const isLoading = useAppSelector((state) => state.auth.loading);
  const _authenticate = useCallback(async () => {
    await dispatch(authenticate());
  }, [dispatch]);

  useEffect(() => {
    _authenticate();
  }, [_authenticate]);
  useEffect(()=>{
    if(isLoading === false){
      if(!profile){
        navigate('/main')
      }
     
    }
  },[isLoading, profile])

  return isLoading ? <>loading...</> : <Outlet />;
}

export default App;
