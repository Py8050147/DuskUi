import { useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { changePassword } from "../https/api"; // Your API function

const PasswordChange = () => {
  // Create refs for old and new password inputs
  const oldPasswordRef = useRef();
  const newPasswordRef = useRef();

  // Mutation to handle the password change API request
  const {
    mutate: changePasswordMutate,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useMutation({
    mutationFn: changePassword,
    onSuccess: (response) => {
      // Handle success, maybe show a success message or redirect the user
      console.log("Password changed successfully", response);
    },
    onError: (err) => {
      // Handle error here
      console.error("Password change failed:", err.message);
    },
  });

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const oldPassword = oldPasswordRef.current.value;
    const newPassword = newPasswordRef.current.value;

    // Simple form validation
    if (!oldPassword || !newPassword) {
      alert("Both old and new passwords are required!");
      return;
    }

    // Trigger mutation with password data
    changePasswordMutate({ oldPassword, newPassword });
  };

  return (
    <div className="container max-w-full mx-auto py-28 flex align-middle justify-center">
      <div className="max-w-md mx-auto p-6 ring-1 ring-gray-400 shadow-gray-800 shadow-xl rounded-md">
        {/* Form */}
        <form onSubmit={handleSubmit}>
          <label className="input input-bordered flex items-center gap-2 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              name="oldPassword"
              placeholder="Old Password"
              ref={oldPasswordRef} // Use ref for input instead of state
              required
            />
          </label>

          <label className="input input-bordered flex items-center gap-2 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 1 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              ref={newPasswordRef} // Use ref for input instead of state
              required
            />
          </label>

          <button
            className="btn btn-primary w-full"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Changing..." : "Change Password"}
          </button>
        </form>

        {/* Error and Success messages */}
        {isError && <div className="text-red-600 mt-4">Error: {error.message}</div>}
        {isSuccess && (
          <div className="text-green-600 mt-4">
            Password changed successfully!
          </div>
        )}
      </div>
    </div>
  );
};

export default PasswordChange;
