import { useState, useCallback, useEffect } from "react";
import { request } from "../api/request";
import { Link } from "react-router-dom";

const ProductPage = () => {
  // Khởi tạo state
  const [listData, setListData] = useState();
  const [enteredValue, setEnteredValue] = useState("");

  // Nạp dữ liệu
  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(request + "admin/product");
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

  // Đặt từ khoá để tìm kiếm
  const valueChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const submitFormHandle = (event) => {
    event.preventDefault();

    console.log(enteredValue);

    if (enteredValue === "") {
      fetchData();
    } else {
      const data = listData.filter((product) =>
        product.name
          .toLocaleLowerCase()
          .includes(enteredValue.toLocaleLowerCase()),
      );
      setListData(data);
    }
  };

  return (
    <>
      <div className="mx-auto mt-4 w-11/12">
        <h1 className="text-xl font-medium">Products</h1>
        <form
          className="bg-white pb-10 dark:bg-gray-900"
          onSubmit={submitFormHandle}
        >
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <div className="relative mt-4">
            <button
              type="submit"
              className="rtl:inset-r-0 absolute inset-y-0 start-0 flex items-center ps-3"
            >
              <svg
                className="h-4 w-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </button>
            <input
              type="text"
              id="table-search"
              className="block w-80 rounded-lg border border-gray-300 bg-gray-50 p-2 ps-10 pt-2 text-sm text-gray-900"
              placeholder="Search for items"
              onChange={valueChangeHandler}
              value={enteredValue}
            />
          </div>
        </form>
        {listData && (
          <div className="relative overflow-x-auto pb-12 shadow-md sm:rounded-lg">
            <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
              <thead className="bg-gray-300 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Image
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Edit
                  </th>
                </tr>
              </thead>
              <tbody>
                {listData.map((product, i) => (
                  <tr
                    className={`border-b ${i % 2 === 0 ? "" : "bg-gray-100"}`}
                    key={product._id}
                  >
                    <th
                      scope="row"
                      className="whitespace-nowrap px-6 py-4 font-normal"
                    >
                      {product._id}
                    </th>
                    <td className="px-6 py-4">{product.name}</td>
                    <td className="px-6 py-4">{`${product.price.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`}</td>
                    <td className="px-6 py-4">
                      <img
                        src={product.img1}
                        alt="product"
                        className="w-20 object-contain"
                      />
                    </td>
                    <td className="px-6 py-4 capitalize">{product.category}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-start gap-3">
                        <Link
                          to={``}
                          className="bg-green-400 p-2 font-medium text-slate-50"
                        >
                          Update
                        </Link>
                        <Link
                          to={``}
                          className="bg-red-500 p-2 font-medium text-slate-50"
                        >
                          Delete
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductPage;
