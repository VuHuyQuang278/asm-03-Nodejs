import { useState, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { request } from "../api/request";
import { Link } from "react-router-dom";

const Order = () => {
  const token = useSelector((state) => state.auth.token);

  const [orders, setOrders] = useState();

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(request + "shop/orders", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.log(error.message);
    }
  }, [request, token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <div className="mx-auto mb-20 flex h-40 w-4/5 items-center justify-between bg-gray-100">
        <p className="pl-16 text-3xl font-medium italic">HISTORY</p>
        <p className="pr-16 font-medium italic text-slate-400">HISTORY</p>
      </div>

      <div className="relative mx-auto w-10/12 overflow-x-auto pb-12">
        <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
          <thead className="bg-gray-50 text-xs uppercase italic text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 uppercase">
                ID order
              </th>
              <th scope="col" className="px-6 py-3 uppercase">
                id user
              </th>
              <th scope="col" className="px-6 py-3 uppercase">
                name
              </th>
              <th scope="col" className="px-6 py-3 uppercase">
                Phone
              </th>
              <th scope="col" className="px-6 py-3 uppercase">
                address
              </th>
              <th scope="col" className="px-6 py-3 uppercase">
                total
              </th>
              <th scope="col" className="px-6 py-3 uppercase">
                delivery
              </th>
              <th scope="col" className="px-6 py-3 uppercase">
                status
              </th>
              <th scope="col" className="px-6 py-3 uppercase">
                detail
              </th>
            </tr>
          </thead>
          <tbody>
            {orders &&
              orders.map((order) => (
                <tr
                  className="border-b bg-white italic dark:border-gray-700 dark:bg-gray-800"
                  key={order._id}
                >
                  <td scope="row" className="whitespace-nowrap px-6 py-4 ">
                    {order._id}
                  </td>
                  <td className="px-6 py-4">{order.userId._id}</td>
                  <td className="px-6 py-4">{order.userId.userName}</td>
                  <td className="px-6 py-4">{order.userId.phone}</td>
                  <td className="px-6 py-4">{order.address}</td>
                  <td className="px-6 py-4">{`${order.totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND`}</td>
                  <td className="px-6 py-4">Waiting for progressing</td>
                  <td className="px-6 py-4">Waiting for pay</td>
                  <td className="px-6 py-4">
                    <Link
                      to={`detail/${order._id}`}
                      className="flex items-center gap-2 border-2 border-gray-950 px-2 py-1 italic"
                    >
                      View
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        className="h-3 w-3"
                      >
                        <path d="M334.5 414c8.8 3.8 19 2 26-4.6l144-136c4.8-4.5 7.5-10.8 7.5-17.4s-2.7-12.9-7.5-17.4l-144-136c-7-6.6-17.2-8.4-26-4.6s-14.5 12.5-14.5 22l0 72L32 192c-17.7 0-32 14.3-32 32l0 64c0 17.7 14.3 32 32 32l288 0 0 72c0 9.6 5.7 18.2 14.5 22z" />
                      </svg>
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Order;
