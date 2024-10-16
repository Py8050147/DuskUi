import { useQuery } from '@tanstack/react-query';
import { getProductById } from './https/api';
import { useParams, useNavigate } from 'react-router-dom'; // Use useNavigate instead of Link

const GetProduct = () => {
  const { productId } = useParams(); // Get the productId from the URL params
  const navigate = useNavigate(); // Use for navigation

  // Fetch product by ID using react-query
  const { data, isLoading, error } = useQuery({
    queryKey: ['products'], // Query key for caching purposes
    queryFn: getProductById, // Fetch product by ID
    enabled: !!productId, // Only run query if productId exists
  });

  // Handling loading state
  if (isLoading) {
    return <div className="text-center text-lg">Loading...</div>;
  }

  // Handling error state
  if (error) {
    return (
      <div className="text-center">
        <h2 className="text-red-500">Error fetching products</h2>
        <p>{error.message}</p>
      </div>
    );
  }

  // Check if the products data is available and is an array
  if (!data || !Array.isArray(data.product)) {
    return <div className="text-center">No products found.</div>;
  }

  // Find the specific product using the product ID
  const product = data.product.find((prod) => prod._id === productId);

  // Handle case when product is not found
  if (!product) {
    return <div className="text-center">No product found for ID: {productId}</div>;
  }

  // Function to handle order button click and navigate to the order page with product data
  const handleOrderClick = () => {
    navigate(`/orders/${productId}`, { state: { product } }); // Pass product data through state
  };

  // Rendering product details in a card layout
  return (
    <div className="container mx-auto p-6">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img
              className="h-64 w-full object-cover md:w-48"
              src={product.productImg} // Assuming productImg contains the image URL
              alt={product.name}
            />
          </div>
          <div className="p-8">
            <h1 className="text-2xl font-bold">{product.name || 'N/A'}</h1>
            <p className="mt-2 text-gray-600 text-sm">{product.description || 'N/A'}</p>
            <p className="mt-4 text-lg font-semibold">Price: ${product.price || 'N/A'}</p>
            <div className="mt-8 flex justify-center mx-auto">
              <button
                onClick={handleOrderClick} // Handle order button click
                className="font-bold text-lg text-blue-900 border border-blue-800 px-4 py-1"
              >
                Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetProduct;
