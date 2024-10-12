import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadProduct } from "./https/api";

const PublishProduct = () => {
  const queryClient = useQueryClient(); // Fix this: use useQueryClient hook
  const [product, setProduct] = useState({
    productImg: null,
    name: "",
    description: "",
    price: "",
    category: "",
  });

    const { mutate, isLoading } = useMutation({
       mutationFn: uploadProduct,
    onSuccess: (data) => {
      console.log(data); // Should now correctly log the response data
      queryClient.invalidateQueries('products');
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleChangeFile = (e) => {
    const file = e.target.files[0];
    setProduct((prevProduct) => ({
      ...prevProduct,
      productImg: file,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare the form data to be sent
    const formData = new FormData();
    formData.append("productImg", product.productImg);
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("category", product.category);
    formData.append("price", product.price);

    // Trigger the mutation function (upload the product)
    mutate(formData);
  };

  return (
    <div className="container max-w-full mx-auto py-16 flex align-middle justify-center">
      <div className="mx-auto p-6 ring-1 ring-gray-400 shadow-gray-800 shadow-xl rounded-md">
        <h1 className="text-center text-3xl mb-4 font-bold">Publish Product</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Image
            </label>
            <input
              type="file"
              className="file-input file-input-bordered file-input-secondary w-full max-w-xs"
              name="productImg"
              onChange={handleChangeFile}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Name
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Enter product name"
              name="name"
              value={product.name}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="Enter product description"
              name="description"
              value={product.description}
              onChange={handleInputChange}
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Enter category"
              name="category"
              value={product.category}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price
            </label>
            <input
              type="number"
              className="input input-bordered w-full"
              placeholder="Enter price"
              name="price"
              value={product.price}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isLoading}
            >
              {isLoading ? "Publishing..." : "Publish Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PublishProduct;
