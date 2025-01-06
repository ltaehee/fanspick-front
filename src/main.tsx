import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import Login from "./pages/Login";
import Singup from "./pages/Signup.tsx";
import HomePage from "./pages/HomePage.tsx";
import Layout from "./components/Layout.tsx";
import Test from "./pages/Test.tsx";
import Mypage from "./pages/mypage/Mypage.tsx";
import MypageCart from "./pages/mypage/MypageCart.tsx";
import DollCategory from "./pages/categories/DollCategory.tsx";
import DigitalCategory from "./pages/categories/DigitalCategory.tsx";
import StationeryCategory from "./pages/categories/StationeryCategory.tsx";
import LifestyleCategory from "./pages/categories/LifestyleCategory.tsx";
import Product from "./pages/categories/Product.tsx";

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
        path: "/mypage",
        element: <Mypage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Singup />,
      },
      {
        path: "/cart",
        element: <MypageCart />,
      },
      {
        path: "/doll-category",
        element: <DollCategory />,
      },
      {
        path: "/digital-category",
        element: <DigitalCategory />,
      },
      {
        path: "/stationery-category",
        element: <StationeryCategory />,
      },
      {
        path: "/lifestyle-category",
        element: <LifestyleCategory />,
      },
      {
        path: "/product",
        element: <Product />,
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
    path: "*",
    element: <ErrorPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
