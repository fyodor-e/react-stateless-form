import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./layout/ErrorPage";
import Layout from "./layout/Layout";
import routes from "./routes";
import { ChakraProvider } from "@chakra-ui/react";

const router = createBrowserRouter([
  {
    element: <Layout />,
    path: "/",
    errorElement: <ErrorPage />,
    children: routes,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>,
);
