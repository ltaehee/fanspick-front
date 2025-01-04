import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage.tsx";
import Layout from "./components/Layout.tsx";
import CategoryFirst from "./pages/categories/CategoryFirst.tsx";
import Test from "./pages/Test.tsx";
import Mypage from "./pages/mypage/Mypage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: '/mypage',
        element: <Mypage />,
      },
    ],
  },
  {
    path: "/test",
    element: <Test />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/categoryFirst",
    element: <CategoryFirst />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
