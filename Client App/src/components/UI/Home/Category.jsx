const Categorie = (props) => {
  return (
    <div className="mx-auto  mb-16 w-4/5 ">
      <div className="mb-8 flex items-center justify-between">
        <img
          src="src\assets\product_1.png"
          alt="product"
          onClick={props.onClick}
          className="cursor-pointer hover:opacity-50"
        />
        <img
          src="src\assets\product_2.png"
          alt="product"
          onClick={props.onClick}
          className="cursor-pointer hover:opacity-50"
        />
      </div>
      <div className="flex items-center justify-between">
        <img
          src="src\assets\product_3.png"
          alt="product"
          onClick={props.onClick}
          className="cursor-pointer hover:opacity-50"
        />
        <img
          src="src\assets\product_4.png"
          alt="product"
          onClick={props.onClick}
          className="cursor-pointer hover:opacity-50"
        />
        <img
          src="src\assets\product_5.png"
          alt="product"
          onClick={props.onClick}
          className="cursor-pointer hover:opacity-50"
        />
      </div>
    </div>
  );
};

export default Categorie;
