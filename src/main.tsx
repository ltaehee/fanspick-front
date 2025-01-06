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
import MypageBookmark from "./pages/mypage/MypageBookmark.tsx";
import StationeryCategory from "./pages/categories/StationeryCategory.tsx";
import ProductDetail from "./pages/categories/ProductDetail.tsx";
import GriptokCategory from "./pages/categories/GriptokCategory.tsx";
import ClothingCategory from "./pages/categories/ClothingCategory.tsx";
import CaseCategory from "./pages/categories/CaseCategory.tsx";

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
        path: "/bookmark",
        element: <MypageBookmark />,
      },
      {
        path: "/griptok-category",
        element: <GriptokCategory />,
      },
      {
        path: "/clothing-category",
        element: <ClothingCategory />,
      },
      {
        path: "/stationery-category",
        element: <StationeryCategory />,
      },
      {
        path: "/case-category",
        element: <CaseCategory />,
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
