import ProductList from "../components/UI/ShopPage/ProductList";

const ShopPage = () => {
  return (
    <>
      <div className="mx-auto mb-20 flex h-40 w-4/5 items-center justify-between bg-gray-100">
        <p className="pl-16 text-3xl font-medium italic">SHOP</p>
        <p className="pr-16 font-medium italic text-slate-400">SHOP</p>
      </div>
      <ProductList />
    </>
  );
};

export default ShopPage;
