import { useState } from "react";
import { request } from "../api/request";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AddProductPage = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [category, setCategory] = useState("selectCategory");
  const [quantity, setQuantity] = useState();
  const [shortDesc, setShortDesc] = useState("");
  const [longDesc, setLongDesc] = useState("");
  const [img1, setImg1] = useState();
  const [img2, setImg2] = useState();
  const [img3, setImg3] = useState();
  const [img4, setImg4] = useState();

  const nameChangeHandle = (event) => {
    setName(event.target.value);
  };

  const priceChangeHandle = (event) => {
    setPrice(event.target.value);
  };

  const categoryChangeHandle = (event) => {
    setCategory(event.target.value);
  };

  const quantityChangeHandle = (event) => {
    setQuantity(event.target.value);
  };

  const shortdescChangeHandle = (event) => {
    setShortDesc(event.target.value);
  };

  const longdescChangeHandle = (event) => {
    setLongDesc(event.target.value);
  };

  const img1ChangeHandle = (event) => {
    setImg1(event.target.files[0]);
  };

  const img2ChangeHandle = (event) => {
    setImg2(event.target.files[0]);
  };

  const img3ChangeHandle = (event) => {
    setImg3(event.target.files[0]);
  };

  const img4ChangeHandle = (event) => {
    setImg4(event.target.files[0]);
  };

  const formSubmitHandle = async (event) => {
    event.preventDefault();

    if (name === "") {
      alert("Please fill in product name");
      return;
    }

    if (price && price < 0) {
      alert("Price must be a positive number");
      return;
    }

    if (category === "selectCategory") {
      alert("Please choose category");
      return;
    }

    if (quantity && quantity < 0) {
      alert("Quantity must be a positive number");
      return;
    }

    if (shortDesc === "") {
      alert("Please fill in short description");
      return;
    }

    if (longDesc === "") {
      alert("Please fill in long description");
      return;
    }

    if (!img1) {
      alert("Please choose image");
      return;
    }

    if (!img2) {
      alert("Please choose image");
      return;
    }

    if (!img3) {
      alert("Please choose image");
      return;
    }

    if (!img4) {
      alert("Please choose image");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("quantity", quantity);
    formData.append("shortDesc", shortDesc);
    formData.append("longDesc", longDesc);
    formData.append("img1", img1);
    formData.append("img2", img2);
    formData.append("img3", img3);
    formData.append("img4", img4);

    try {
      const res = await fetch(request + "admin/product", {
        method: "POST",
        headers: { Authorization: "Bearer " + token },
        body: formData,
        mode: "cors",
      });

      if (!res.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await res.json();
      console.log(data);

      alert(data.message);
      navigate("/products");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-2xl px-4 py-8 lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900">
          Add a new product
        </h2>
        <form onSubmit={formSubmitHandle} encType="multipart/form-data">
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="sm:col-span-2">
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                Product Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                placeholder="Product name"
                onChange={nameChangeHandle}
                value={name}
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="price"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Price
              </label>
              <input
                type="number"
                name="price"
                id="price"
                className="focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                placeholder="1.000.000"
                onChange={priceChangeHandle}
                value={price}
              />
            </div>
            <div>
              <label
                htmlFor="category"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Category
              </label>
              <select
                id="category"
                className="focus:ring-primary-500 focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                onChange={categoryChangeHandle}
              >
                <option value="selectCategory">Select category</option>
                <option value="iphone">iPhone</option>
                <option value="ipad">iPad</option>
                <option value="macbook">Macbook</option>
                <option value="airpod">Airpod</option>
                <option value="watch">Watch</option>
                <option value="mouse">Mouse</option>
                <option value="keyboard">Keyboard</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="item-quantity"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Item Quantity
              </label>
              <input
                type="number"
                name="item-quantity"
                id="item-quantity"
                className="focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                placeholder="12"
                onChange={quantityChangeHandle}
                value={quantity}
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="short-description"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Short Description
              </label>
              <textarea
                id="short-description"
                rows="4"
                className="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                placeholder="Enter short description"
                onChange={shortdescChangeHandle}
                value={shortDesc}
              ></textarea>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="long-description"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Long Description
              </label>
              <textarea
                id="long-description"
                rows="8"
                className="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                placeholder="Enter long description"
                onChange={longdescChangeHandle}
                value={longDesc}
              ></textarea>
            </div>
            <div>
              <label
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="img1"
              >
                Upload Image 1
              </label>
              <input
                className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none"
                type="file"
                id="img1"
                name="img1"
                onChange={img1ChangeHandle}
              />
            </div>
            <div>
              <label
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="img2"
              >
                Upload Image 2
              </label>
              <input
                className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none"
                type="file"
                id="img2"
                name="img2"
                onChange={img2ChangeHandle}
              />
            </div>
            <div>
              <label
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="img3"
              >
                Upload Image 3
              </label>
              <input
                className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none"
                type="file"
                id="img3"
                name="img3"
                onChange={img3ChangeHandle}
              />
            </div>
            <div>
              <label
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="img4"
              >
                Upload Image 4
              </label>
              <input
                className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none"
                type="file"
                id="img4"
                name="img4"
                onChange={img4ChangeHandle}
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 inline-flex items-center rounded-lg bg-sky-600 px-5 py-2.5 text-center text-sm font-medium text-white focus:ring-4 sm:mt-6"
          >
            Add product
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddProductPage;
