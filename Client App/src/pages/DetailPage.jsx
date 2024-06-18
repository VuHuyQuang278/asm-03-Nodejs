import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../store";
import { request } from "../api/request";

const DetailPage = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLogin = useSelector((state) => state.auth.isLogin);

  // Khởi tạo state
  const [productData, setProductData] = useState();
  const [relatedProduct, setRelatedProduct] = useState();
  const [productQuantity, setProductQuantity] = useState(1);

  // Nạp dữ liệu
  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(request + "shop/");
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      console.log(data.products);

      // Tìm kiếm thông tin sản phẩm
      const product = data.products.find(
        (item) => item._id === params.productId,
      );
      console.log(product);
      setProductData(product);

      // Tìm kiếm thông tin của các sản phẩm cùng danh mục
      const relatedProduct = data.products.filter(
        (item) => item.category === product.category && item !== product,
      );
      setRelatedProduct(relatedProduct);
    } catch (error) {
      console.log(error.message);
    }
  }, [params]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Xử lý sự kiện thêm sản phẩm vào giỏ hàng
  const addCartHandler = (item, quantity) => {
    if (isLogin) {
      console.log(item);
      const itemUpdate = { ...item, quantity: quantity };
      dispatch(cartActions.ADD_CART(itemUpdate));
    } else {
      alert("Please login!");
      navigate("/login");
    }
  };

  // Xử lý sự kiện giảm số lượng sản phẩm
  const decsQuangtityHandler = () => {
    setProductQuantity((prevState) => prevState - 1);
  };

  // Xử lý sự kiện tăng số lượng sản phẩm
  const ascQuantityHandler = () => {
    setProductQuantity((prevState) => prevState + 1);
  };

  return (
    <>
      {productData && (
        <div className="mx-auto w-4/5">
          <div className=" my-16 flex  gap-10">
            <div className="flex w-1/2 items-center justify-around">
              <div className="flex flex-col items-center gap-2">
                <img
                  src={productData.img1}
                  alt="product"
                  className="w-24 object-contain"
                />
                <img
                  src={productData.img2}
                  alt="2th product"
                  className="w-24 object-contain"
                />
                <img
                  src={productData.img3}
                  alt="3th product"
                  className="w-24 object-contain"
                />
                <img
                  src={productData.img4}
                  alt="4th product"
                  className="w-24 object-contain"
                />
              </div>
              <img
                src={productData.img4}
                alt="4th product"
                className="w-2/3 object-contain"
              />
            </div>
            <div className="w-1/2 italic">
              <h2 className="pb-5 text-3xl font-medium text-slate-900">
                {productData.name}
              </h2>
              <p className="pb-5 text-lg text-slate-400">{`${productData.price.replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND`}</p>
              <p className="pb-4 leading-6 text-slate-400">
                {productData.short_desc}
              </p>
              <p className="pb-4 font-medium text-slate-900">
                CATEGORY :{" "}
                <span className="font-normal text-slate-400">
                  {productData.category}
                </span>
              </p>
              <p className="pb-4 font-medium uppercase text-slate-900">
                Quantity in stock:{" "}
                <span className="font-normal text-slate-400">
                  {productData.quantity}
                </span>
              </p>
              <div className="flex">
                <div className="flex w-48 border-collapse items-center justify-between border border-slate-700 px-4 py-2">
                  <p>QUANTITY</p>
                  <div className="flex">
                    <button
                      onClick={decsQuangtityHandler}
                      disabled={productQuantity === 1}
                      className="disabled:cursor-not-allowed"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 256 512"
                        className="h-5 w-5"
                      >
                        <path d="M9.4 278.6c-12.5-12.5-12.5-32.8 0-45.3l128-128c9.2-9.2 22.9-11.9 34.9-6.9s19.8 16.6 19.8 29.6l0 256c0 12.9-7.8 24.6-19.8 29.6s-25.7 2.2-34.9-6.9l-128-128z" />
                      </svg>
                    </button>
                    <p className="px-1 text-lg not-italic">{productQuantity}</p>
                    <button
                      onClick={ascQuantityHandler}
                      disabled={productData.quantity === "0"}
                      className="disabled:cursor-not-allowed"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 256 512"
                        className="h-5 w-5"
                      >
                        <path d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z" />
                      </svg>
                    </button>
                  </div>
                </div>
                <button
                  className="bg-slate-800 px-4 py-2 italic text-slate-100"
                  onClick={() => addCartHandler(productData, productQuantity)}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
          <div>
            <button className="my-8 bg-slate-800 px-6 py-3 italic text-slate-100">
              DESCRIPTION
            </button>
            <p className="mb-6 text-xl font-medium uppercase italic">
              product description
            </p>
            <p className="mb-16 whitespace-pre-line italic text-slate-400">
              {productData.long_desc}
            </p>
            <p className="mb-6 text-xl font-medium uppercase italic">
              related products
            </p>
            <div className="mb-16 flex items-center">
              {relatedProduct &&
                relatedProduct.map((data) => (
                  <Link to={`/detail/${data._id}`} key={data._id}>
                    <div className="flex w-60 flex-col items-center gap-1 font-normal italic">
                      <img
                        src={data.img1}
                        alt="trending product"
                        className="w-60 cursor-pointer object-cover hover:opacity-50"
                      />
                      <p className="text-center text-lg ">{data.name}</p>
                      {/* chuyển đổi price sang dạng tiền VND */}
                      <p className="text-slate-400">{`${data.price.replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND`}</p>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailPage;
