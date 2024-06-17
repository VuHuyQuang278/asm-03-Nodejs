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

const router = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <AdminPage /> },
      { path: "order/:orderId", element: <DetailOrder /> },
      {
        path: "products",
        children: [
          { index: true, element: <ProductPage /> },
          { path: "add-product", element: <AddProductPage /> },
          {
            path: "edit-product/:productId",
            element: <EditProductPage />,
            loader: productDetailLoader,
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
