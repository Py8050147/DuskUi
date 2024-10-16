import { useQuery } from "@tanstack/react-query";
import { getAllProduct } from "./https/api"; // Assuming this is the correct path for your API function
import { Link, useNavigate } from "react-router-dom";

const GetAllProduct = () => {
  const navigate = useNavigate();

  // Fetch products using useQuery
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn:() =>  getAllProduct(),
  });

  // Ensure the products are correctly logged
//   console.log('product data', data?.data?.product);

  // Handle loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Handle error state
  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  // Handle undefined or empty data
  const products = data?.data?.product || [];

  // Render the product cards
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">All Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="card w-full bg-base-100 shadow-xl">
              <figure>
                <img
                loading="lazy"
                  src={product.productImg}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-lg font-bold">{product.name}</h2>
                <p className="text-sm text-gray-600">{product.description}</p>
                <p className="text-lg font-semibold mt-2">${product.price}</p>
                {/* <p className="text-sm text-gray-500">{product.category}</p> */}
                <div className="card-actions justify-end mt-4">
                  <button className="btn btn-primary">Add to Cart</button>
                  <Link
                    to={`/products/${product._id}`}
                    className="btn btn-secondary"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
      <div className="mt-6">
        <button
          onClick={() => navigate("/create-product")}
          className="btn btn-accent"
        >
          Create Product
        </button>
      </div>
    </div>
  );
};

export default GetAllProduct;
