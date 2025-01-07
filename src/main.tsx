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
import StationeryCategory from "./pages/user/categories/StationeryCategory.tsx";
import ProductDetail from "./pages/user/categories/ProductDetail.tsx";
import MainPage from "./pages/manager/MainPage.tsx";
import AddProductPage from "./pages/manager/AddProductPage.tsx";
import CaseCategory from "./pages/user/categories/CaseCategory.tsx";
import GriptokCategory from "./pages/user/categories/GriptokCategory.tsx";
import ClothingCategory from "./pages/user/categories/ClothingCategory.tsx";
import AddReviewPage from "./pages/user/review/AddReviewPage.tsx";
import EditReviewPage from "./pages/user/review/EditReviewPage.tsx";
import MypageBookmark from "./pages/user/mypage/MypageBookmark.tsx";
import MypageOrder from "./pages/user/mypage/MypageOrder.tsx";
import MypageReview from "./pages/user/mypage/MypageReview.tsx";
import UserProvider from "./context/UserContext.tsx";

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
        path: "/main",
        element: <MainPage />,
      },
      {
        path: "/add-product",
        element: <AddProductPage />,
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
      {
        path:'/add-review',
        element: <AddReviewPage />
      },
      {
        path: "/edit-review",
        element: <EditReviewPage />,
      },
      {
        path:'mypage-bookmark',
        element: <MypageBookmark />
      },
      {
        path:'mypage-order',
        element: <MypageOrder />
      },
      {
        path:'mypage-review',
        element: <MypageReview />
      }
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
  <UserProvider> 
    <RouterProvider router={router} />
  </UserProvider>
);
