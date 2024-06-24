import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "./pages/RootLayout";
import AdminPage from "./pages/AdminPage";
import LoginPage from "./pages/LoginPage";
import ProductPage from "./pages/ProductPage";
import DetailOrder from "./pages/DetailOrder";
import AddProductPage from "./pages/AddProductPage";
import EditProductPage, {
  loader as productDetailLoader,
} from "./pages/EditProductPage";
import MessageLayout from "./pages/MessageLayout";
import MessageDetail from "./pages/MessageDetail";
import { checkIsRole } from "./utils/role";

const router = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: checkIsRole() ? <AdminPage /> : <MessageLayout />,
      },
      {
        path: "order/:orderId",
        element: checkIsRole() ? <DetailOrder /> : <MessageLayout />,
      },
      {
        path: "products",
        children: [
          {
            index: true,
            element: checkIsRole() ? <ProductPage /> : <MessageLayout />,
          },
          {
            path: "add-product",
            element: checkIsRole() ? <AddProductPage /> : <MessageLayout />,
          },
          {
            path: "edit-product/:productId",
            element: checkIsRole ? <EditProductPage /> : <MessageLayout />,
            loader: productDetailLoader,
          },
        ],
      },
      {
        path: "chat",
        element: <MessageLayout />,
        children: [{ path: ":receiverId", element: <MessageDetail /> }],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
