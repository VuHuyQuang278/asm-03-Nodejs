import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../store";

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Lấy state từ redux store
  const listCart = useSelector((state) => state.cart.listCart);
  const totalPrice = useSelector((state) => state.cart.totalPrice);

  // Xử lý sự kiện click vào button continue shopping
  const shoppingHandler = () => {
    navigate("/shop");
  };

  // Xử lý sự kiện click vào button checkout
  const checkoutHandler = () => {
    navigate("/checkout");
  };

  // Xử lý sự kiện bỏ 1 sản phẩm khỏi giỏ hàng
  const removeItemHandler = (id) => {
    dispatch(cartActions.REMOVE_ITEM(id));
  };

  // Xử lý sự kiện thêm sản phẩm vào giỏ hàng
  const addItemHandler = (item) => {
    dispatch(cartActions.ADD_CART(item));
  };

  // Xử lý sự kiện xoá sản phẩm khỏi giỏ hàng
  const deleteHandler = (id) => {
    dispatch(cartActions.DELETE_CART(id));
  };

  return (
    <div className=" mx-auto w-4/5">
      <h2 className="my-10 text-2xl uppercase italic">shopping cart</h2>
      <div className="flex items-start justify-between">
        <table className="w-[53rem] table-fixed bg-slate-50">
          <thead>
            <tr className="w-1/5 px-4 text-center text-lg  uppercase italic">
              <th className="w-32 p-2 font-medium">image</th>
              <th className="w-2/6 p-2 font-medium">product</th>
              <th className="p-2 font-medium">price</th>
              <th className="p-2 font-medium">quantity</th>
              <th className="p-2 font-medium">total</th>
              <th className="p-2 font-medium">remove</th>
            </tr>
          </thead>
          <tbody>
            {listCart.length > 0 &&
              listCart.map((item) => (
                <tr key={item._id} className="text-center">
                  <td className="px-6 py-3 text-center">
                    <img
                      src={item.img1}
                      alt="product"
                      className="w-36 object-contain"
                    />
                  </td>
                  <td className="px-4 py-2 text-center">
                    <p className="text-lg">{item.name}</p>
                  </td>
                  <td className="px-4 py-2">
                    <p className="text-slate-400">{`${item.price.replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND`}</p>
                  </td>
                  <td className="px-4 py-2">
                    <div className="ml-3 flex items-center">
                      <button
                        className="disabled:cursor-not-allowed"
                        disabled={item.quantity === 1}
                        onClick={() => removeItemHandler(item._id.$oid)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 256 512"
                          className="h-5 w-5"
                        >
                          <path d="M9.4 278.6c-12.5-12.5-12.5-32.8 0-45.3l128-128c9.2-9.2 22.9-11.9 34.9-6.9s19.8 16.6 19.8 29.6l0 256c0 12.9-7.8 24.6-19.8 29.6s-25.7 2.2-34.9-6.9l-128-128z" />
                        </svg>
                      </button>
                      <p>{item.quantity}</p>
                      <button onClick={() => addItemHandler(item)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 256 512"
                          className="h-5 w-5"
                        >
                          <path d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z" />
                        </svg>
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-2">
                    <p className="text-slate-400">
                      {`${(item.price * item.quantity).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND`}
                    </p>
                  </td>
                  <td className="px-4 py-2">
                    <button
                      className="ml-5 flex items-center"
                      onClick={() => deleteHandler(item._id.$oid)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                        className="h-5 w-5"
                      >
                        <path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="w-80 bg-slate-50 px-8 py-10">
          <h2 className="mb-4 text-xl font-medium uppercase italic">
            cart total
          </h2>
          <div className="mb-4 flex items-center justify-between">
            <p className="font-medium italic">SUBTOTAL</p>
            <p>{`${totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND`}</p>
          </div>
          <hr className="mb-4 border border-slate-500" />
          <div className="mb-5 flex items-center justify-between">
            <p className="font-medium italic">TOTAL</p>
            <p className="text-lg">{`${totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND`}</p>
          </div>
          <input
            type="text"
            className="w-full border-2  px-2 py-2 focus:outline-none"
            placeholder="Enter your coupon"
          />
          <button className="flex w-full items-center justify-center gap-2 bg-slate-950 py-2 text-gray-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="h-4 w-4"
            >
              <path
                fill="#ffffff"
                d="M190.5 68.8L225.3 128H224 152c-22.1 0-40-17.9-40-40s17.9-40 40-40h2.2c14.9 0 28.8 7.9 36.3 20.8zM64 88c0 14.4 3.5 28 9.6 40H32c-17.7 0-32 14.3-32 32v64c0 17.7 14.3 32 32 32H480c17.7 0 32-14.3 32-32V160c0-17.7-14.3-32-32-32H438.4c6.1-12 9.6-25.6 9.6-40c0-48.6-39.4-88-88-88h-2.2c-31.9 0-61.5 16.9-77.7 44.4L256 85.5l-24.1-41C215.7 16.9 186.1 0 154.2 0H152C103.4 0 64 39.4 64 88zm336 0c0 22.1-17.9 40-40 40H288h-1.3l34.8-59.2C329.1 55.9 342.9 48 357.8 48H360c22.1 0 40 17.9 40 40zM32 288V464c0 26.5 21.5 48 48 48H224V288H32zM288 512H432c26.5 0 48-21.5 48-48V288H288V512z"
              />
            </svg>
            Apply coupon
          </button>
        </div>
      </div>
      <div className="my-10 flex w-4/6 items-center justify-between">
        <button
          className="flex items-center gap-3 px-4 py-2 text-lg italic"
          onClick={shoppingHandler}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="h-4 w-4"
          >
            <path d="M177.5 414c-8.8 3.8-19 2-26-4.6l-144-136C2.7 268.9 0 262.6 0 256s2.7-12.9 7.5-17.4l144-136c7-6.6 17.2-8.4 26-4.6s14.5 12.5 14.5 22l0 72 288 0c17.7 0 32 14.3 32 32l0 64c0 17.7-14.3 32-32 32l-288 0 0 72c0 9.6-5.7 18.2-14.5 22z" />
          </svg>
          Continue shopping
        </button>
        <button
          className="flex items-center gap-3 border-2 border-gray-950 px-4 py-2 text-lg italic"
          onClick={checkoutHandler}
        >
          Proceed to checkout
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="h-4 w-4"
          >
            <path d="M334.5 414c8.8 3.8 19 2 26-4.6l144-136c4.8-4.5 7.5-10.8 7.5-17.4s-2.7-12.9-7.5-17.4l-144-136c-7-6.6-17.2-8.4-26-4.6s-14.5 12.5-14.5 22l0 72L32 192c-17.7 0-32 14.3-32 32l0 64c0 17.7 14.3 32 32 32l288 0 0 72c0 9.6 5.7 18.2 14.5 22z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CartPage;
