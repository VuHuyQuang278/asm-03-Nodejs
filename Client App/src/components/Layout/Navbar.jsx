import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { getFromStorage, saveToStorage } from "../../storage";
import { useState, useEffect } from "react";
import { authActions } from "../../store";

function Navbar() {
  // Khởi tạo state
  const [userName, setUserName] = useState();

  // Lấy state từ reduc store
  const isLogin = useSelector((state) => state.auth.isLogin);
  const user = useSelector((state) => state.auth.user);
  const listCart = useSelector((state) => state.cart.listCart);

  // Tính số lượng sản phẩm trong giỏ hàng
  const totalCartItems = listCart.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  }, 0);

  const dispatch = useDispatch();

  // Kiểm tra người dùng đã đăng nhập chưa
  useEffect(() => {
    if (isLogin) {
      // Nếu người dùng đã đăng nhập thì set state là tên người dùng
      setUserName(user.userName);
    }
  }, [isLogin]);

  // Hàm đăng xuất
  const loguotHandler = () => {
    if (confirm("Do you want to log out?")) {
      // Cập nhật dữ liệu người dùng tại localStorage
      saveToStorage("isLogin", false);
      localStorage.removeItem("token");
      // Gửi hành động đến redux store
      dispatch(authActions.ON_LOGOUT());

      // Xoá dữ liệu giỏ hàng của người dùng
      // localStorage.removeItem("cart");
    }
  };

  return (
    <>
      <header className="mx-auto w-4/5 pb-4 pt-4">
        <nav>
          <ul className="flex justify-between font-medium italic">
            <li className="ml-4 flex items-center justify-center gap-3 text-lg">
              <Link to="/" className="text-orange-400">
                Home
              </Link>
              <Link to="/shop">Shop</Link>
            </li>
            <li className="text-2xl">BOUTIQUE</li>
            <li className="mr-4 flex items-center justify-center gap-3 text-lg">
              <Link
                to="/cart"
                className="flex items-center justify-center gap-2"
              >
                <div className="relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
                  </svg>
                  <span className="absolute bottom-3 left-4 h-4 w-4 rounded-full bg-slate-300 text-center text-xs">
                    {totalCartItems}
                  </span>
                </div>
                <div>Cart</div>
              </Link>
              {isLogin && userName ? (
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center justify-center gap-1">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-5 w-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="flex items-center justify-center">
                      <p>{userName}</p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 320 512"
                        className="h-4 w-4"
                      >
                        <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" />
                      </svg>
                    </div>
                  </div>
                  <button className="italic" onClick={loguotHandler}>
                    (Logout)
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center justify-center gap-1"
                >
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>Login</div>
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Navbar;
