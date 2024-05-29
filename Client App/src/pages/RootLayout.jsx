import { Outlet } from "react-router-dom";

import Navbar from "../components/Layout/Navbar";
import Footer from "../components/Layout/Footer";
import LiveChat from "../components/LiveChat";

function RootLayout() {
  return (
    <>
      <LiveChat />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default RootLayout;
