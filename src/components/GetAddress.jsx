import { useQuery } from "@tanstack/react-query";
import { getAddressId } from "./https/api"; // Import the API function
import { useParams } from "react-router-dom";

const GetAddress = () => {
  const { addressId } = useParams(); // Get addressId from the route parameters

  // Use useQuery to fetch the address data
  const { data, error, isLoading } = useQuery({
    queryKey: ['address', addressId], // Include the addressId in the query key for caching
    queryFn: () => getAddressId(addressId), // Pass the addressId to getAddress function
    refetchOnWindowFocus: true, // Refetch when the window is refocused
    staleTime: 1000, // Data is considered fresh for 1 second
  });

  console.log(data)

  // Loading state
  if (isLoading) {
    return <div className="text-center text-lg">Loading...</div>;
  }

  // Error handling
  if (error) {
    return (
      <div className="text-center">
        <h2 className="text-red-500">Error fetching address</h2>
        <p>{error.message}</p>
      </div>
    );
  }

  // If no data is returned
  if (!data) {
    return <div className="text-center">No address found.</div>;
  }

  // Assuming the API returns a single address object
  const address = data;
  console.log(address.data);

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="md:flex">
          <div className="p-8">
            <h1 className="text-2xl font-bold">{address.data.street || 'N/A'}</h1>
            <p className="mt-2 text-gray-600 text-sm">{address.data.city || 'N/A'}</p>
            <p className="mt-4 text-lg font-semibold">State: {address.data.state || 'N/A'}</p>
            <p className="mt-4 text-lg font-semibold">Postal Code: {address.data.postalCode || 'N/A'}</p>
            <p className="mt-4 text-lg font-semibold">Phone: {address.data.phone || 'N/A'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetAddress;
