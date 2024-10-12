import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getProductById, updateProduct } from './https/api';
import { useParams } from 'react-router-dom';

const UpdateProduct = () => {
    const { productId } = useParams();
  const queryClient = useQueryClient();
  console.log(productId)
  
  // Initial product state with controlled values
  const [product, setProduct] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    productImg: null,
  });

  // Fetch the existing product data by productId
  const { data: existingProduct, isLoading: isFetching } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => getProductById(productId),
      onSuccess: (data) => {
        console.log(data)
      // When data is fetched, update the form state
      if (data) {
        setProduct({
          name: data.name || '',
          description: data.description || '',
          category: data.category || '',
          price: data.price || '',
          productImg: null, // Reset the image or leave it as null
        });
      }
    },
  });

  // Mutation to handle product update
  const { mutate, isLoading } = useMutation({
    mutationFn: updateProduct,
      onSuccess: (data) => {
        console.log(data)
      queryClient.invalidateQueries(['product', productId]);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      productImg: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('category', product.category);
    formData.append('price', product.price);
    if (product.productImg) {
      formData.append('productImg', product.productImg);
    }

    mutate({ productId, formData });
  };

  // Loading UI when fetching product data
  if (isFetching) {
    return <p>Loading product data...</p>;
  }

  // Ensure that the form is rendered only when product data is available
  if (!existingProduct) {
    return <p>No product data available</p>;
  }

  return (
    <div className="container mx-auto py-12 flex justify-center">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Update Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
            <input
              type="text"
              name="name"
              value={product.name} // Make sure value is never undefined
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="Enter product name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={product.description} // Make sure value is never undefined
              onChange={handleChange}
              className="textarea textarea-bordered w-full"
              placeholder="Enter product description"
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <input
              type="text"
              name="category"
              value={product.category} // Make sure value is never undefined
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="Enter product category"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
            <input
              type="number"
              name="price"
              value={product.price} // Make sure value is never undefined
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="Enter product price"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
            <input
              type="file"
              name="productImg"
              onChange={handleFileChange}
              className="file-input file-input-bordered w-full max-w-xs"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`btn btn-primary w-full ${isLoading ? 'loading' : ''}`}
          >
            {isLoading ? 'Updating...' : 'Update Product'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
