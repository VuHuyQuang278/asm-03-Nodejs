import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faUserPlus,
  faDollarSign,
  faFileCirclePlus,
} from "@fortawesome/free-solid-svg-icons";

import { useState, useCallback, useEffect } from "react";
import { request } from "../api/request";
import { Link } from "react-router-dom";

const AdminPage = () => {
  // Khởi tạo state
  const [listData, setListData] = useState();

  // Nạp dữ liệu
  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(request + "admin/");
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

  return (
    <>
      {listData && (
        <div>
          <h1 className="py-6 pl-12 text-2xl font-medium">Dashboard</h1>
          <div className="flex items-center justify-evenly pb-16">
            <div className="flex w-3/12 items-center justify-between rounded-b-lg border-2 border-t-0 px-4 shadow-md">
              <div className="py-6">
                <h3 className="text-2xl font-medium">{listData.clients}</h3>
                <p className="text-gray-400">Clients</p>
              </div>
              <div className="flex justify-end">
                <FontAwesomeIcon
                  icon={faUserPlus}
                  style={{ color: "#c2c2d0" }}
                  size="lg"
                />
              </div>
            </div>
            <div className="flex w-3/12 items-center justify-between rounded-b-lg border-2 border-t-0 px-4 shadow-md">
              <div className="py-6">
                <h3 className="text-2xl font-medium">
                  <p className="relative">
                    {`${listData.earnings.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`}
                    <span className="absolute -right-6 -top-1 text-base">
                      VND
                    </span>
                  </p>
                </h3>
                <p className="text-gray-400">Earnings of Month</p>
              </div>
              <div className="flex justify-end">
                <FontAwesomeIcon
                  icon={faDollarSign}
                  style={{ color: "#c2c2d0" }}
                  size="lg"
                />
              </div>
            </div>
            <div className="flex w-3/12 items-center justify-between rounded-b-lg border-2 border-t-0 px-4 shadow-md">
              <div className="py-6">
                <h3 className="text-2xl font-medium">{listData.orderNum}</h3>
                <p className="text-gray-400">New Order</p>
              </div>
              <div className="flex justify-end">
                <FontAwesomeIcon
                  icon={faFileCirclePlus}
                  style={{ color: "#c2c2d0" }}
                  size="lg"
                />
              </div>
            </div>
          </div>
          <h3 className="py-6 pl-16 text-xl font-medium">History</h3>
          <div className="relative mx-auto w-11/12 overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
              <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    ID User
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Phone
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Address
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Total
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Delivery
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Detail
                  </th>
                </tr>
              </thead>
              <tbody>
                {listData.orders.map((order) => (
                  <tr
                    className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
                    key={order._id}
                  >
                    <th
                      scope="row"
                      className="whitespace-nowrap px-6 py-4 font-normal"
                    >
                      {order.userId._id}
                    </th>
                    <td className="px-6 py-4">{order.userId.fullName}</td>
                    <td className="px-6 py-4">{order.userId.phone}</td>
                    <td className="px-6 py-4">{order.address}</td>
                    <td className="px-6 py-4">{`${order.totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`}</td>
                    <td className="px-6 py-4">Chưa vận chuyển</td>
                    <td className="px-6 py-4">Chưa thanh toán</td>
                    <td className="px-6 py-4">
                      <Link
                        to={`/order/${order._id}`}
                        className="border-2 bg-green-600 px-3 py-2 font-medium text-gray-200"
                      >
                        View
                      </Link>
                    </td>
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

export default AdminPage;
