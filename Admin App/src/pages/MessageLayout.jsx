import { Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useCallback, useEffect } from "react";
import { request } from "../api/request";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { faUser } from "@fortawesome/free-solid-svg-icons";

import useGetAdmin from "../hooks/use-getAdmin";

const MessageLayout = () => {
  // Khởi tạo state
  const [listData, setListData] = useState();

  const admin = useGetAdmin();

  const token = useSelector((state) => state.auth.token);

  // Nạp dữ liệu
  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(request + "message/", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
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
    <div className="mx-auto w-11/12 bg-slate-50 py-2">
      <h1 className="pl-4 text-lg font-medium">Chat</h1>
      <p className="pb-6 pl-4 text-slate-400">Apps / Chat</p>
      <div className="mx-auto flex w-11/12 border-collapse items-start bg-white">
        <div className="w-2/6 border-2">
          <div className="px-6 py-4">
            <input
              type="text"
              placeholder="Search Contact"
              className="mb-4 border-2 p-2"
            />
            <hr className="mb-4 border border-slate-200" />
            <div>
              {listData &&
                listData.map((item) => (
                  <Link
                    to={`/chat/${item.participants.filter((item) => item !== admin._id)}`}
                    className="flex items-center justify-evenly border-2 p-2"
                    key={item._id}
                  >
                    <FontAwesomeIcon icon={faUser} />
                    <p className="w-9/12 break-words">{item._id}</p>
                  </Link>
                ))}
            </div>
          </div>
        </div>
        <div className="w-4/6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MessageLayout;
