import { useQuery } from '@tanstack/react-query';
import { getProductById } from './https/api';
import { useParams } from 'react-router-dom';

const GetProduct = () => {
  const { productId } = useParams(); // Get the productId from the URL params

  // Fetch all products using react-query
  const { data, isLoading, error } = useQuery({
    queryKey: ['products'],  // Change query key to fetch all products
    queryFn: getProductById, // Adjust this if getProductById only fetches a single product
    enabled: !!productId,  // Only run query if productId exists
  });

  // console.log('Fetched Products:', data);
  // console.log('Product ID:', productId);

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

  // Rendering product details in a card layout
  return (
    <div className="container mx-auto p-6">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img
              className="h-56 w-full object-cover md:w-48"
              src={product.productImg} // Assuming productImg contains the image URL
              alt={product.name}
            />
          </div>
          <div className="p-8">
            <h1 className="text-2xl font-bold">{product.name || 'N/A'}</h1>
            <p className="mt-2 text-gray-600 text-sm">{product.description || 'N/A'}</p>
            <p className="mt-4 text-lg font-semibold">Price: ${product.price || 'N/A'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetProduct;
