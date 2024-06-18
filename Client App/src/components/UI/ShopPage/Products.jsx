import { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";
import { request } from "../../../api/request";

const Products = (props) => {
  // Khởi tạo state
  const [productData, setProductData] = useState([]);
  const [filteredProduct, setFilteredProducts] = useState([]);

  // Nạp dữ liệu
  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(request + "shop/");
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const res = await response.json();
      const data = res.products;
      console.log(data);
      setProductData(data);
      setFilteredProducts(data);
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  let key = props.keySearch;

  // Lọc sản phẩm theo danh mục
  const getFillteredProduct = useCallback(
    (keySearch) => {
      if (keySearch === "all") {
        setFilteredProducts(productData);
      } else if (keySearch !== "all") {
        const filteredProduct = productData.filter(
          (item) => item.category === keySearch,
        );
        setFilteredProducts(filteredProduct);
      }
    },
    [productData],
  );

  useEffect(() => {
    getFillteredProduct(key);
  }, [key]);

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <>
      {filteredProduct && filteredProduct.length !== 0 ? (
        <div className="mb-16">
          <div className="relative mb-6 grid grid-cols-3 gap-x-4 gap-y-8">
            {filteredProduct.map((data) => (
              <Link to={`/detail/${data._id}`} key={data._id}>
                <div
                  className="flex flex-col items-center gap-1 font-normal italic"
                  data-aos="fade-up"
                >
                  <img
                    src={data.img1}
                    alt="trending product"
                    className="w-auto cursor-pointer object-cover hover:opacity-50"
                  />
                  <p className="text-center text-lg ">{data.name}</p>
                  {/* chuyển đổi price sang dạng tiền VND */}
                  <p className="text-slate-400">{`${data.price.replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND`}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="flex flex-col items-end gap-4">
            <div className="flex items-center justify-end gap-2 pr-8">
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="h-5 w-5"
                >
                  <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160zm352-160l-160 160c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L301.3 256 438.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0z" />
                </svg>
              </button>
              <div className="h-7 w-7 bg-slate-900 text-center text-slate-100">
                1
              </div>
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="h-5 w-5"
                >
                  <path d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z" />
                </svg>
              </button>
            </div>
            <p className="italic text-slate-400">Showing 1-9 of 9 results</p>
          </div>
        </div>
      ) : (
        <p className="relative left-1/3 top-20 text-xl" data-aos="fade-up">
          Không tìm thấy sản phẩm phù hợp!
        </p>
      )}
    </>
  );
};

export default Products;
