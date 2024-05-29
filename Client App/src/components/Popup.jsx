import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { productActions } from "../store";

const Popup = (props) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  // Xử lý sự kiện đóng popup
  const closeHandler = () => {
    // Gửi action đến redux store
    dispatch(productActions.HIDE_POPUP());
  };

  // Xử lý sự kiện xem chi tiết sản phẩm
  const viewDetailHandler = () => {
    // Chuyển hướng đến trang chi tiết sản phẩm
    navigate(`/detail/${props.product._id.$oid}`);
    // Gửi action đóng popup
    dispatch(productActions.HIDE_POPUP());
  };
  return (
    <>
      <div className="fixed left-0 top-0 z-10 h-screen w-screen bg-black/60">
        <div className="relative left-1/2 top-20 w-2/3 -translate-x-2/4 bg-white pb-12">
          <div className="flex items-center justify-end pr-4 pt-4">
            <button onClick={closeHandler}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="h-6 w-6"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div className="flex items-start justify-center gap-16">
            <img
              src={props.product.img1}
              alt="product"
              className="w-5/12 object-cover pl-16"
            />
            <div className="pr-16 pt-7">
              <h2 className="pb-2 text-2xl italic">{props.product.name}</h2>
              <p className="pb-2 text-lg italic text-slate-400">{`${props.product.price.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}VND`}</p>
              <p className="max-h-56 overflow-y-auto text-slate-800">
                {props.product.short_desc}
              </p>
              <button
                className="mt-6 flex items-center justify-center gap-4 bg-slate-800 px-6 py-2 text-slate-100"
                onClick={viewDetailHandler}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
                </svg>
                View Detail
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Popup;
