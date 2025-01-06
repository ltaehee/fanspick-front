import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import Login from "./pages/Login";
import Singup from "./pages/Signup.tsx";
import HomePage from "./pages/HomePage.tsx";
import Layout from "./components/Layout.tsx";
import Test from "./pages/Test.tsx";
import Mypage from "./pages/user/mypage/Mypage.tsx";
import MypageCart from "./pages/user/mypage/MypageCart.tsx";
import DollCategory from "./pages/user/categories/DollCategory.tsx";
import DigitalCategory from "./pages/user/categories/DigitalCategory.tsx";
import StationeryCategory from "./pages/user/categories/StationeryCategory.tsx";
import LifestyleCategory from "./pages/user/categories/LifestyleCategory.tsx";
import ProductDetail from "./pages/user/categories/ProductDetail.tsx";

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
        element: <ProductDetail />,
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
