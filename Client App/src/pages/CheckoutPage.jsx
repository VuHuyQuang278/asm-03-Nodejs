import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { request } from "../api/request";
import { cartActions } from "../store";

const CheckoutPage = () => {
  const dispatch = useDispatch();

  // Lấy state từ redux store
  const listCart = useSelector((state) => state.cart.listCart);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);

  const [enteredFullName, setEnteredFullName] = useState(user.fullName);
  const [enteredPhoneNumber, setEnteredPhoneNumber] = useState(user.phone);
  const [enteredEmail, setEnteredEmail] = useState(user.email);
  const [address, setAddress] = useState("");

  const fullNameChangeHandle = (event) => {
    setEnteredFullName(event.target.value);
  };

  const emailChangeHandle = (event) => {
    setEnteredEmail(event.target.value);
  };

  const phoneNumberChangeHandle = (event) => {
    setEnteredPhoneNumber(event.target.value);
  };

  const addressChangeHandle = (event) => {
    setAddress(event.target.value);
  };

  const formSubmitHandle = async (event) => {
    event.preventDefault();

    let newCart = listCart.map((product) => {
      return {
        productId: product._id,
        quantity: product.quantity,
      };
    });

    const body = {
      listCart: newCart,
      totalPrice,
      userId: user._id,
    };

    try {
      const response = await fetch(request + "shop/checkout", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(body),
        mode: "cors",
      });

      if (response.status !== 200 && response.status !== 201) {
        console.log("Error!");
        throw new Error("Creating a order failed!");
      }

      const data = await response.json();
      console.log(data);

      alert(data.message);

      // Xoá dữ liệu giỏ hàng của người dùng
      localStorage.removeItem("cart");
      dispatch(cartActions.clearCart());
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className=" mx-auto w-4/5">
      <div className=" mb-20 mt-10 flex h-40  items-center justify-between bg-gray-100">
        <p className="pl-16 text-3xl font-medium italic">CHECKOUT</p>
        <div className="pr-16 font-medium italic">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "text-slate-400" : "")}
          >
            HOME /{" "}
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) => (isActive ? "text-slate-400" : "")}
          >
            CART /{" "}
          </NavLink>
          <NavLink
            to="/checkout"
            className={({ isActive }) => (isActive ? "text-slate-400" : "")}
          >
            CHECKOUT{" "}
          </NavLink>
        </div>
      </div>
      <h2 className="mb-16 text-2xl italic">BILLING DETAILS</h2>
      <div className="mb-20 flex items-start justify-between">
        <form className="w-3/6" onSubmit={formSubmitHandle}>
          <div className="mb-5">
            <label
              htmlFor="fullName"
              className="mb-2 block uppercase italic text-slate-600"
            >
              full name:
            </label>
            <input
              type="text"
              id="fullName"
              placeholder="enter your full name here!"
              className="w-full border border-slate-500 px-4 py-2 capitalize focus:outline-none"
              required
              onChange={fullNameChangeHandle}
              value={enteredFullName}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="mb-2 block uppercase italic text-slate-600"
            >
              email:
            </label>
            <input
              type="email"
              id="email"
              placeholder="enter your email here!"
              className="w-full border border-slate-500 px-4 py-2 capitalize focus:outline-none"
              required
              onChange={emailChangeHandle}
              value={enteredEmail}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="phone"
              className="mb-2 block uppercase italic text-slate-600"
            >
              phone number:
            </label>
            <input
              type="text"
              id="phone"
              placeholder="enter your phone number here!"
              className="w-full border border-slate-500 px-4 py-2 capitalize focus:outline-none"
              required
              onChange={phoneNumberChangeHandle}
              value={enteredPhoneNumber}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="address"
              className="mb-2 block uppercase italic text-slate-600"
            >
              address:
            </label>
            <input
              type="text"
              id="address"
              placeholder="enter your address here!"
              className="w-full border border-slate-500 px-4 py-2 capitalize focus:outline-none"
              onChange={addressChangeHandle}
              value={address}
            />
          </div>
          <button
            className="bg-slate-800 px-6 py-2 text-lg italic text-slate-200"
            type="submit"
          >
            Place order
          </button>
        </form>
        <div className="w-2/5 bg-slate-100 px-8 py-10">
          <h2 className="mb-4 text-xl font-medium uppercase italic">
            your order
          </h2>
          {listCart.length > 0 &&
            listCart.map((item) => (
              <div key={item._id}>
                <div className="mb-4 flex items-start justify-between gap-2 font-medium italic">
                  <p>{item.name}</p>
                  <p className="text-slate-400">
                    {`${item.price.replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND`}{" "}
                    X {item.quantity}
                  </p>
                </div>
                <hr className="border-1 mb-4 border-slate-500" />
              </div>
            ))}

          <div className="flex items-start justify-between">
            <p className="mb-5 font-medium italic">TOTAL</p>
            <p className="text-lg italic">{`${totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND`}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
