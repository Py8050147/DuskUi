// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/_auth/Login.jsx";
import Signup from "./components/_auth/Signup.jsx";
import Home from "./components/page/Home.jsx";
// import CurrentUser from "./components/_auth/CurrentUser.jsx";
import PasswordChange from "./components/_auth/PasswordChange.jsx";
import ProfilePage from "./components/ProfilePage.jsx";
import PublishProduct from "./components/PublishProduct.jsx";
import UpdateProduct from "./components/UpdateProduct.jsx";
import GetProduct from "./components/GetProduct.jsx";

const queryClient = new QueryClient();

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
      // {
      //   path: "/currentUser",
      //   element: <CurrentUser />,
      // },
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
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    </QueryClientProvider>
  // </StrictMode>
);
