import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { checkIsAuth } from "./utils/auth";

import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import DetailPage from "./pages/DetailPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import RootLayout from "./pages/RootLayout";
import Order from "./pages/Order";
import DetailOrder from "./pages/DetailOrder";

// Tạo router
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "shop", element: <ShopPage /> },
      { path: "detail/:productId", element: <DetailPage /> },
      {
        path: "cart",
        element: checkIsAuth() ? (
          <CartPage />
        ) : (
          <Navigate to={"/login"} replace={true} />
        ),
      },
      {
        path: "checkout",
        element: checkIsAuth() ? (
          <CheckoutPage />
        ) : (
          <Navigate to={"/login"} replace={true} />
        ),
      },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      {
        path: "order",
        children: [
          {
            index: true,
            element: checkIsAuth() ? (
              <Order />
            ) : (
              <Navigate to={"/login"} replace={true} />
            ),
          },
          {
            path: "detail/:orderId",
            element: checkIsAuth() ? (
              <DetailOrder />
            ) : (
              <Navigate to={"/login"} replace={true} />
            ),
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
