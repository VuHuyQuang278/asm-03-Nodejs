// Nhập các thư viện cần thiết
import { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Nhập các thành phần
import { productActions } from "../../../store";
import Popup from "../../Popup";

function TopTrending() {
  // Khởi tạo state
  const [listData, setListData] = useState([]);

  const dispatch = useDispatch();
  // Lấy state từ Redux store
  const productData = useSelector((state) => state.product.data);
  const showPopup = useSelector((state) => state.product.showPopup);

  // Nạp dữ liệu
  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(
        "https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74",
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      setListData(data);
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Xử lý sự kiện show Popup
  const showPopupHandler = (product) => {
    // Gửi hành động đến Redux store
    dispatch(productActions.SHOW_POPUP(product));
  };

  return (
    <div className="mx-auto mb-16 grid w-4/5 grid-cols-4 gap-x-4 gap-y-16">
      {listData.length > 0 &&
        listData.map((data) => (
          <div
            key={data._id.$oid}
            className="flex cursor-pointer flex-col items-center gap-1 font-normal italic"
            onClick={() => showPopupHandler(data)}
          >
            <img
              src={data.img1}
              alt="trending product"
              className="w-auto  object-cover hover:opacity-50"
            />
            <p className="text-center text-lg ">{data.name}</p>
            {/* chuyển đổi price sang dạng tiền VND */}
            <p className="text-slate-400">{`${data.price.replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND`}</p>
          </div>
        ))}
      {showPopup && <Popup product={productData} />}
    </div>
  );
}

export default TopTrending;
