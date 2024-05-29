// Nhập thư viện
import { useNavigate } from "react-router-dom";

import Categorie from "../components/UI/Home/Category";
import Banner from "../components/UI/Home/Banner";
import TopTrending from "../components/UI/Home/TopTrending";

const HomePage = () => {
  const navigation = useNavigate();

  // Xử lý sự kiện onClick
  const onClickHandler = (event) => {
    event.preventDefault();

    // Điều hướng đến ShopPage
    navigation("shop");
  };

  return (
    <>
      <Banner onClick={onClickHandler} />
      <div className="mx-auto mb-10 w-1/4 uppercase italic tracking-widest">
        <p className="text-slate-400">carefully created collections</p>
        <p className="text-xl">browse our categories</p>
      </div>
      <Categorie onClick={onClickHandler} />
      <div className="mx-auto mb-10 w-4/5 uppercase italic tracking-widest">
        <p className="text-slate-400">made the hard way</p>
        <p className="text-xl">top trending products</p>
      </div>
      <TopTrending />
      <div className="mx-auto flex w-4/5 items-center justify-around bg-gray-100 py-16 italic">
        <div>
          <p className=" text-lg font-medium uppercase tracking-widest">
            free shipping
          </p>
          <p className="text-slate-400">Free shipping worlwide</p>
        </div>
        <div>
          <p className="text-lg font-medium uppercase tracking-widest">
            24 X 7 service
          </p>
          <p className="text-slate-400">Free shipping worlwide</p>
        </div>
        <div>
          <p className="text-lg font-medium uppercase tracking-widest">
            festival offer
          </p>
          <p className="text-slate-400">Free shipping worlwide</p>
        </div>
      </div>
      <div className="mx-auto flex w-4/5 items-center justify-between py-16">
        <div className="italic">
          <p className="text-xl font-medium uppercase tracking-widest">
            let's be friends!
          </p>
          <p className="text-lg text-slate-400">
            Nisi nisi tempor consequat laboris nisi
          </p>
        </div>
        <div className="flex items-center justify-center">
          <input
            type="text"
            placeholder="Enter your email address"
            className="h-12 w-96 border-2 px-6 py-3 focus:rounded-none"
          />
          <button className="bg-slate-900 px-6 py-3  text-slate-50">
            Subscribe
          </button>
        </div>
      </div>
    </>
  );
};

export default HomePage;
