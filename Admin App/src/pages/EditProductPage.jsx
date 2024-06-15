import { request } from "../api/request";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useCallback, useEffect } from "react";

const EditProductPage = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [category, setCategory] = useState("selectCategory");
  const [quantity, setQuantity] = useState();
  const [shortDesc, setShortDesc] = useState();
  const [longDesc, setLongDesc] = useState();

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

    const body = {
      name,
      price,
      category,
      quantity,
      shortDesc,
      longDesc,
    };

    try {
      const res = await fetch(
        request + "admin/product/edit/" + params.productId,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
          mode: "cors",
        },
      );

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
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Edit product
        </h2>
        <form action="#">
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="sm:col-span-2">
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Product Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                placeholder="Product name"
                required=""
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
                placeholder="$2999"
                required=""
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
                className="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
              >
                <option>Select category</option>
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
                htmlFor="item-weight"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Item Quantity
              </label>
              <input
                type="number"
                name="item-weight"
                id="item-weight"
                className="focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                placeholder="12"
                required=""
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Short Description
              </label>
              <textarea
                id="description"
                rows="4"
                className="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                placeholder="Enter short description"
              ></textarea>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Long Description
              </label>
              <textarea
                id="description"
                rows="8"
                className="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                placeholder="Enter long description"
              ></textarea>
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 inline-flex items-center rounded-lg bg-sky-600 px-5 py-2.5 text-center text-sm font-medium text-white focus:ring-4 sm:mt-6"
          >
            Update product
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditProductPage;
