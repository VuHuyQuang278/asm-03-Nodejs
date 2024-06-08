import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "./pages/RootLayout";
import AdminPage from "./pages/AdminPage";
import LoginPage from "./pages/LoginPage";

const router = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },
  {
    path: "/",
    element: <RootLayout />,
    children: [{ index: true, element: <AdminPage /> }],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
