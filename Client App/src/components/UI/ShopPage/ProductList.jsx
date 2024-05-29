import { useState } from "react";

import Products from "./Products";

const ProductList = () => {
  // Khởi tạo state
  const [keySearch, setKeySearch] = useState("all");

  // Xử lý sự kiện click vào các danh mục
  const allHandler = () => {
    setKeySearch("all");
  };

  const iPhoneHandler = () => {
    setKeySearch("iphone");
  };

  const ipadHandler = () => {
    setKeySearch("ipad");
  };

  const macbookHandler = () => {
    setKeySearch("macbook");
  };

  const airpodHandler = () => {
    setKeySearch("airpod");
  };

  const watchHandler = () => {
    setKeySearch("watch");
  };

  const mouseHandler = () => {
    setKeySearch("mouse");
  };

  const keyboardHandler = () => {
    setKeySearch("keyboard");
  };

  const otherHandler = () => {
    setKeySearch("other");
  };

  return (
    <div className="mx-auto flex w-4/5 gap-12">
      <div className="mb-16 w-1/5">
        <h2 className="mb-8 text-xl font-semibold italic">CATEGORIES</h2>
        <div className="mb-2 bg-black py-2 pl-4 text-lg font-medium italic text-white">
          APPLE
        </div>
        <ul className="flex flex-col gap-2 italic text-slate-500">
          <li className="cursor-pointer pl-4" onClick={allHandler}>
            All
          </li>
          <li className="bg-gray-200 py-2 pl-4 text-lg font-medium text-slate-900">
            IPHONE & MAC
          </li>
          <li className="cursor-pointer pl-4" onClick={iPhoneHandler}>
            iPhone
          </li>
          <li className="cursor-pointer pl-4" onClick={ipadHandler}>
            ipad
          </li>
          <li className="cursor-pointer pl-4" onClick={macbookHandler}>
            Macbook
          </li>
          <li className="bg-gray-200 py-2 pl-4 text-lg font-medium text-slate-900">
            WIRELESS
          </li>
          <li className="cursor-pointer pl-4" onClick={airpodHandler}>
            Airpod
          </li>
          <li className="cursor-pointer pl-4" onClick={watchHandler}>
            Watch
          </li>
          <li className="bg-gray-200 py-2 pl-4 text-lg font-medium text-slate-900">
            OTHER
          </li>
          <li className="cursor-pointer pl-4" onClick={mouseHandler}>
            Mouse
          </li>
          <li className="cursor-pointer pl-4" onClick={keyboardHandler}>
            Keyboard
          </li>
          <li className="cursor-pointer pl-4" onClick={otherHandler}>
            Other
          </li>
        </ul>
      </div>
      <div className="w-4/5">
        <div className="mb-8 flex items-center justify-between">
          <input
            type="text"
            placeholder="Enter Search Here"
            className="w-60 border-2 py-2 pl-4"
          />
          <select className="w-40 border-2 border-slate-950">
            <option>Default sorting</option>
          </select>
        </div>
        <Products keySearch={keySearch} />
      </div>
    </div>
  );
};

export default ProductList;
