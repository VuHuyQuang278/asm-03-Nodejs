import { useState, useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

const LiveChat = () => {
  // Khởi tạo state
  const [showLiveChat, setShowLiveChat] = useState(false);

  // Xử lý sự kiện đóng/mở live chat
  const showLiveChatHandler = () => {
    setShowLiveChat((prevState) => !prevState);
  };

  useEffect(() => {
    Aos.init({ duration: 600 });
  }, []);

  return (
    <>
      <div
        className="fixed bottom-16 right-20 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-slate-900"
        onClick={showLiveChatHandler}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          className="h-7 w-7"
        >
          <path
            fill="#ffffff"
            d="M256.6 8C116.5 8 8 110.3 8 248.6c0 72.3 29.7 134.8 78.1 177.9 8.4 7.5 6.6 11.9 8.1 58.2A19.9 19.9 0 0 0 122 502.3c52.9-23.3 53.6-25.1 62.6-22.7C337.9 521.8 504 423.7 504 248.6 504 110.3 396.6 8 256.6 8zm149.2 185.1l-73 115.6a37.4 37.4 0 0 1 -53.9 9.9l-58.1-43.5a15 15 0 0 0 -18 0l-78.4 59.4c-10.5 7.9-24.2-4.6-17.1-15.7l73-115.6a37.4 37.4 0 0 1 53.9-9.9l58.1 43.5a15 15 0 0 0 18 0l78.4-59.4c10.4-8 24.1 4.5 17.1 15.6z"
          />
        </svg>
      </div>
      {showLiveChat && (
        <div
          data-aos="zoom-in-left"
          className="fixed bottom-28 right-36 z-10 w-1/3 rounded-lg border-2 bg-slate-50 px-8 py-6 shadow-[10px_35px_60px_-15px_rgba(0,0,0,0.3)]"
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-medium">Customer Support</h3>
            <div className="bg-slate-300 px-4 py-2 italic hover:bg-slate-500">
              Let's Chat App
            </div>
          </div>
          <hr className="mb-4 border border-slate-200" />
          <div className="mb-4 mr-6 flex justify-end ">
            <p className="rounded bg-teal-400 px-4 py-2 italic text-slate-100">
              Xin chào
            </p>
          </div>
          <div className="mb-4 mr-6 flex justify-end ">
            <p className="rounded bg-teal-400 px-4 py-2 italic text-slate-100">
              Làm thế nào để xem các sản phẩm
            </p>
          </div>
          <div className="mb-4 mr-6 flex items-center justify-start gap-4">
            <img
              src="src\assets\admin.png"
              alt="admin"
              className="h-9 w-9 object-contain"
            />
            <p className="rounded bg-slate-100 px-4 py-2 italic text-slate-400">
              ADMIN: Chào bạn
            </p>
          </div>
          <div className="mb-4 mr-6 flex w-3/4 items-center justify-start gap-4">
            <img
              src="src\assets\admin.png"
              alt="admin"
              className="h-9 w-9 object-contain"
            />
            <p className="rounded bg-slate-100 px-4 py-2 italic text-slate-400">
              ADMIN: Bạn có thể vào mục Shop để xem các sản phẩm
            </p>
          </div>
          <div className="block h-16"></div>
          <hr className="mb-4 border border-slate-200" />
          <div className="flex items-center justify-between">
            <div className="flex w-4/6 items-center gap-2">
              <img
                src="src\assets\admin.png"
                alt="admin"
                className="h-9 w-9 object-contain"
              />
              <input
                type="text"
                placeholder="Enter Message!"
                className="w-10/12 px-2 py-1 focus:outline-none"
              />
            </div>
            <div className="flex w-2/6 items-center justify-end gap-4">
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 512"
                  className="h-5 w-5"
                >
                  <path
                    fill="#B197FC"
                    d="M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5L217.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z"
                  />
                </svg>
              </button>
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="h-5 w-5"
                >
                  <path
                    fill="#B197FC"
                    d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM164.1 325.5C182 346.2 212.6 368 256 368s74-21.8 91.9-42.5c5.8-6.7 15.9-7.4 22.6-1.6s7.4 15.9 1.6 22.6C349.8 372.1 311.1 400 256 400s-93.8-27.9-116.1-53.5c-5.8-6.7-5.1-16.8 1.6-22.6s16.8-5.1 22.6 1.6zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"
                  />
                </svg>
              </button>
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="h-5 w-5"
                >
                  <path
                    fill="#74C0FC"
                    d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LiveChat;
