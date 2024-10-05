import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getcurrentUser, updateAccount } from "./https/api"; // Ensure the correct import

// Fetch current user
const fetchCurrentUser = async () => {
  const response = await getcurrentUser();
  return response.data; // Assuming API returns user data inside a `data` field
};

const ProfilePage = () => {
  const queryClient = useQueryClient();

  // Fetch user data using React Query's useQuery
  const { data, isLoading, error } = useQuery({
    queryKey: ["currentUser"],
    queryFn: fetchCurrentUser,
    refetchOnWindowFocus: true, // Refetch on window focus
    staleTime: 0, // Data is considered stale immediately
  });

  // Local state for edit mode and form data
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });

  // Mutation for updating the user account
  const mutation = useMutation({
    mutationFn: updateAccount,
    onSuccess: () => {
      queryClient.invalidateQueries(["currentUser"]); // Refetch user data after successful update
      setEditMode(false); // Exit edit mode
    },
    onError: (error) => {
      console.error("Failed to update profile:", error);
    },
  });

  // Handle edit button click
  const handleEdit = () => {
    if (data) {
      // Assuming data follows this structure: { data: { data: { fullname, email } } }
      const { fullname, email } = data.data;
      setFormData({ name: fullname, email }); // Pre-fill form with current user data
      setEditMode(true); // Switch to edit mode
    }
  };

  // Handle save button click
  const handleSave = () => {
    mutation.mutate(formData); // Trigger mutation with form data
  };

  // Loading and error handling
  if (isLoading) return <div className="text-center">Loading...</div>;
  if (error) {
    console.error(error);
    return <div className="text-center text-red-500">Error: {error.message}</div>;
  }

  // Assuming the API response has the structure { data: { fullname, email } }
  const { fullname, email } = data?.data || {};

  return (
    <div className="max-w-full mx-auto  shadow-md rounded-md px-32 py-10">
      <h2 className="text-3xl font-semibold text-gray-500 mb-6">Profile</h2>

      {/* Render different UI based on editMode */}
      {!editMode ? (
        <div className="">
          <div className="mb-6 flex gap-5">
            <label className="block text-gray-700">Name : </label>
            <p className="text-gray-600">{fullname || "N/A"}</p> {/* Display user's full name */}
          </div>
          <div className="mb-6 flex gap-5">
            <label className="block text-gray-700">Email</label>
            <p className="text-gray-600">{email || "N/A"}</p> {/* Display user's email */}
          </div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={handleEdit}
          >
            Edit Profile
          </button>
        </div>
      ) : (
        <div>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-opacity-50"
              value={formData.name} // Input for name
              onChange={(e) => setFormData({ ...formData, name: e.target.value })} // Handle name change
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-opacity-50"
              value={formData.email} // Input for email
              onChange={(e) => setFormData({ ...formData, email: e.target.value })} // Handle email change
            />
          </div>
          <div className="flex space-x-4">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              onClick={() => setEditMode(false)} // Cancel edit mode
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
