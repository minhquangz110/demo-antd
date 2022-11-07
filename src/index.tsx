import React, { createContext } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import Auth from "./pages/auth";
import { SignIn } from "./pages/auth/SignIn";
import { SignUp } from "./pages/auth/SignUp";
import { Main } from "./pages/main";
import { Products } from "./pages/products";
import { Home } from "./pages/home";

import { Checkout } from "./pages/checkout";
import Shoppingcart from "./pages/shoppingcart";
import { Shop } from "./pages/shop";
import { MyAccount } from "./pages/myAccount";
import { Admin } from "./pages/admin";
import { ProductContent } from "./pages/admin/productContent";
import { AccountContent } from "./pages/admin/accountContent";
import { OrderContent } from "./pages/admin/orderContent";
import { AuthGuard } from "./guards/auth";
import { getProfile } from "./persist/localstorage";
import { ProfileProvider } from "./features/ProfileProvider/profileProvider";
const router = createBrowserRouter([
  {
    path: "/auth",
    element: <Auth />,
    children: [
      {
        path: "/auth/login",
        element: <SignIn />,
      },
      {
        path: "/auth/signup",
        element: <SignUp />,
      },
    ],
  },

  {
    path: "/",
    element: <App />,
    children: [{}],
  },
  {
    path: "main",
    element: <Main />,
    children: [
      {
        path: "products/:id",
        element: <Products />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "checkout",
        element: (
          <AuthGuard>
            <Checkout />
          </AuthGuard>
        ),
      },
      { path: "shop", element: <Shop /> },
      { path: "shoppingcart", element: <Shoppingcart /> },
      { path: "myaccount", element: <MyAccount /> },
      {
        path: "",
        element: <Home />,
      },
    ],
  },
  {
    path: "/admin",
    element: <Admin />,
    children: [
      {
        path: "products",
        element: <ProductContent />,
      },
      {
        path: "accounts",
        element: <AccountContent />,
      },
      {
        path: "orders",
        element: <OrderContent />,
      },
    ],
  },
]); 

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <ProfileProvider>
      <RouterProvider router={router} />
    </ProfileProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
