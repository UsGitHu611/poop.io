import "./index.css";
import { lazy } from "react";
import App from "./pages/App.jsx";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Layout from "./layout.jsx";

const DetailNote = lazy(() => import("@pages/DetailNote"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        element: <App />,
        index: true,
      },
      {
        path: "/:noteId",
        element: <DetailNote />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
