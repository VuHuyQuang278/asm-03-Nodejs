import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useCallback, useEffect } from "react";
import { request } from "../api/request";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import openSocket from "socket.io-client";

import { faUser, faPaperPlane } from "@fortawesome/free-solid-svg-icons";

import useGetAdmin from "../hooks/use-getAdmin";

const MessageDetail = () => {
  const [message, setMessage] = useState("");
  const [listMessage, setListMessage] = useState([]);

  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const params = useParams();
  const admin = useGetAdmin();

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(
        request + "message/admin/" + params.receiverId,
        {
          headers: { Authorization: "Bearer " + token },
        },
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const messages = await response.json();

      setListMessage(messages);
    } catch (error) {
      console.log(error.message);
    }
  }, [request]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (user) {
      const socket = openSocket("http://localhost:5000", {
        query: {
          userId: user._id,
        },
        transports: ["websocket"],
      });

      socket?.on("newMessage", (message) => {
        console.log(message);
        console.log(listMessage);
        setListMessage((msgs) => [...msgs, message]);
      });
    }
  }, [user]);

  const sendMessageHandle = async (event) => {
    event.preventDefault();
    if (message === "") return;
    console.log(message);

    try {
      const response = await fetch(
        request + "message/send/admin/" + params.receiverId,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({ message }),
          mode: "cors",
        },
      );

      setMessage("");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="mx-auto w-11/12 border-2">
        <div className="h-[32rem]">
          <div className="p-4">
            {listMessage &&
              admin &&
              listMessage.map((mess) =>
                mess.senderId === admin._id ? (
                  <div key={mess._id} className="mb-4 mr-6 flex justify-end">
                    <p className="rounded bg-teal-400 px-4 py-2 italic text-slate-100">
                      {mess.message}
                    </p>
                  </div>
                ) : (
                  <div
                    key={mess._id}
                    className="mb-4 mr-6 flex items-center justify-start gap-4"
                  >
                    <FontAwesomeIcon icon={faUser} size="lg" />
                    <p className="rounded bg-slate-100 px-4 py-2 italic text-slate-400">
                      CLIENT: {mess.message}
                    </p>
                  </div>
                ),
              )}
          </div>
        </div>
        <form className="flex items-center justify-around gap-4 pb-4">
          <input
            type="text"
            className="w-4/5 border-2 p-2 focus:outline-none"
            placeholder="Type and enter"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
          <button
            type="submit"
            className="h-9 w-9 rounded-full bg-teal-400 p-1"
            onClick={sendMessageHandle}
          >
            <FontAwesomeIcon icon={faPaperPlane} style={{ color: "#ffffff" }} />
          </button>
        </form>
      </div>
    </>
  );
};

export default MessageDetail;
