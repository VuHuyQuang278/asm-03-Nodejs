import { Outlet } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faHotel,
  faShop,
  faTruck,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import { authActions } from "../store/index";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveToStorage } from "../storage";

function RootLayout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Hàm đăng xuất
  const loguotHandler = () => {
    if (confirm("Do you want to log out?")) {
      // Cập nhật dữ liệu người dùng tại localStorage
      saveToStorage("isLogin", false);
      localStorage.removeItem("token");
      localStorage.removeItem("currentUser");
      // Gửi hành động đến redux store
      dispatch(authActions.ON_LOGOUT());

      navigate("/login");
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/6 border-collapse border-2">
        <h2 className="mx-auto py-3 text-center text-lg font-medium text-blue-800">
          Admin Page
        </h2>
        <hr className="mb-4 border-t-4" />
        <div className="ml-8 text-blue-800">
          <h3>MAIN</h3>
          <ul className="my-3 ml-4">
            <li>
              <Link to={""} className="flex items-center justify-start gap-3">
                <FontAwesomeIcon icon={faBars} />
                <p>Dashboard</p>
              </Link>
            </li>
          </ul>
        </div>
        <div className="ml-8 text-blue-800">
          <h3>LISTS</h3>
          <ul className="my-3 ml-4">
            <li>
              <Link
                to={""}
                className="flex items-center justify-start gap-3 pb-2"
              >
                <FontAwesomeIcon icon={faUser} />
                <p>Users</p>
              </Link>
            </li>
            <li>
              <Link
                to={""}
                className="flex items-center justify-start gap-3 pb-2"
              >
                <FontAwesomeIcon icon={faHotel} />
                <p>Hotels</p>
              </Link>
            </li>
            <li>
              <Link
                to={""}
                className="flex items-center justify-start gap-3 pb-2"
              >
                <FontAwesomeIcon icon={faShop} />
                <p>Rooms</p>
              </Link>
            </li>
            <li>
              <Link
                to={"/transaction"}
                className="flex items-center justify-start gap-3 pb-2"
              >
                <FontAwesomeIcon icon={faTruck} />
                <p>Transactions</p>
              </Link>
            </li>
          </ul>
        </div>
        <div className="ml-8 text-blue-800">
          <h3>NEW</h3>
          <ul className="my-3 ml-4">
            <li>
              <Link
                to={""}
                className="flex items-center justify-start gap-3 pb-2"
              >
                <FontAwesomeIcon icon={faHotel} />
                <p>New Hotel</p>
              </Link>
            </li>
            <li>
              <Link
                to={""}
                className="flex items-center justify-start gap-3 pb-2"
              >
                <FontAwesomeIcon icon={faShop} />
                <p>New Room</p>
              </Link>
            </li>
          </ul>
        </div>
        <div className="ml-8 text-blue-800">
          <h3>USER</h3>
          <ul className="my-3 ml-4">
            <li>
              <button
                className="flex items-center justify-start gap-3 pb-2"
                onClick={loguotHandler}
              >
                <FontAwesomeIcon icon={faRightFromBracket} />
                <p>Logout</p>
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="w-4/5">
        <div className="block h-14 border-b-2"></div>
        <Outlet />
      </div>
    </div>
  );
}

export default RootLayout;
