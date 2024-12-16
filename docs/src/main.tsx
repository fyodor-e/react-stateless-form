import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./prism.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./layout/ErrorPage";
import Layout from "./layout/Layout";
import routes from "./routes";
import { createTheme, ThemeProvider } from "@mui/material";

const router = createBrowserRouter([
  {
    element: <Layout />,
    path: "/react-flexible-form/",
    errorElement: <ErrorPage />,
    children: routes,
  },
]);

const theme = createTheme({});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
);
