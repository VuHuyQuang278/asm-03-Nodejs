import { useParams } from "react-router-dom";
import { useState, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { request } from "../api/request";

const DetailOrder = () => {
  const params = useParams();

  const token = useSelector((state) => state.auth.token);

  const [order, setOrder] = useState();

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(
        request + "admin/order-detail/" + params.orderId,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        },
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      console.log(data);
      setOrder(data);
    } catch (error) {
      console.log(error.message);
    }
  }, [request, token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <>
      {order && (
        <div className="mx-auto w-4/5">
          <h1 className="py-4 text-2xl italic">INFORMATION ORDER</h1>
          <p className="italic text-gray-500">ID User: {order.userId._id}</p>
          <p className="italic text-gray-500">
            Full Name: {order.userId.fullName}
          </p>
          <p className="italic text-gray-500">Phone: {order.userId.phone}</p>
          <p className="italic text-gray-500">Address: {order.address}</p>
          <p className="pb-16 italic text-gray-500">{`Total: ${order.totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND`}</p>
          <div className="relative mx-auto overflow-x-auto pb-12">
            <table className="w-full text-center text-lg text-gray-500 rtl:text-right dark:text-gray-400">
              <thead className="bg-gray-50 text-xs uppercase italic text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3 uppercase">
                    ID product
                  </th>
                  <th scope="col" className="w-1/5 px-6 py-3 uppercase">
                    image
                  </th>
                  <th scope="col" className="px-6 py-3 uppercase">
                    name
                  </th>
                  <th scope="col" className="px-6 py-3 uppercase">
                    price
                  </th>
                  <th scope="col" className="px-6 py-3 uppercase">
                    count
                  </th>
                </tr>
              </thead>
              <tbody>
                {order.listCart.map((item) => (
                  <tr
                    className="border-b bg-white text-center italic dark:border-gray-700 dark:bg-gray-800"
                    key={item._id}
                  >
                    <td scope="row" className="whitespace-nowrap px-6 py-4">
                      {item.productId._id}
                    </td>
                    <td className="flex items-center justify-center px-6 py-4">
                      <img
                        src={item.productId.img1}
                        alt="product"
                        className="object-contain"
                      />
                    </td>
                    <td className="px-6 py-4">{item.productId.name}</td>
                    <td className="px-6 py-4">{`${item.productId.price.replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND`}</td>
                    <td className="px-6 py-4">{item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailOrder;
