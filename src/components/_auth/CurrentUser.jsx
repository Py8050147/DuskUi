import { useQuery } from "@tanstack/react-query";
import { getcurrentUser } from "../https/api"; // Assuming this is an API call function

const CurrentUser = () => {
  // Correct usage of useQuery in React Query v5
  const { data, error, isLoading } = useQuery({
    queryKey: ['getcurrentUser'], // Unique key to identify this query
    queryFn: getcurrentUser, // The function to fetch the data
  });

  // Log the API response to inspect its structure
//   console.log("API Response:", data);

  // Handle different states
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Check if user details are available and access them correctly
  if (!data?.data?.data) {
    return <div>User data not available</div>;
  }

  const { fullname, email } = data.data.data;

  return (
    <div>
      <h1>Welcome, {fullname}</h1>
      <p>Email: {email}</p>
    </div>
  );
};

export default CurrentUser;
