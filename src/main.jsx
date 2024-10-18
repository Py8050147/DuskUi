import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";  // Stripe imports
import { Elements } from "@stripe/react-stripe-js"; // Stripe Elements provider
import Login from "./components/_auth/Login.jsx";
import Signup from "./components/_auth/Signup.jsx";
import Home from "./components/page/Home.jsx";
import PasswordChange from "./components/_auth/PasswordChange.jsx";
import ProfilePage from "./components/ProfilePage.jsx";
import PublishProduct from "./components/PublishProduct.jsx";
import UpdateProduct from "./components/UpdateProduct.jsx";
import GetProduct from "./components/GetProduct.jsx";
import Order from "./components/Order.jsx";
import Address from "./components/Address.jsx";

const queryClient = new QueryClient();

// Stripe setup
const stripePromise = loadStripe("pk_test_51QBA63KItYYILvpTMKNETaR6RTsVhbmDLGIID0kB7Kh8OM1YmtppcGpPyUf4sXRskHiBqIH0eaD1ddzTaWyvQ4VK00UrBxzj5m"); // Replace with your Stripe publishable key

// Define routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "changePassword",
        element: <PasswordChange />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "product",
        element: <PublishProduct />,
      },
      {
        path: "updateProduct",
        element: <UpdateProduct />,
      },
      {
        path: "products/:productId",
        element: <GetProduct />,
      },
      {
        path: "address",
        element: <Address />
      },
      {
        path: "orders/:productId",
        element: <Order />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <Elements stripe={stripePromise}>  {/* Wrap your app inside Elements for Stripe */}
      <RouterProvider router={router} />
    </Elements>
  </QueryClientProvider>
);
