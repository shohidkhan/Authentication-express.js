import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signin from "./pages/signin.jsx";
import Signup from "./pages/Signup.jsx";
import RootLayout from "./layout/RootLayout.jsx";
import AuthProvider from "./context/AuthContext/AuthProvider.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/signin",
        element: <Signin />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);
