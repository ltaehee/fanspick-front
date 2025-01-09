import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import {
  MypageOrder,
  MypageReview,
  MypageBookmark,
  MypageCart,
  SelectProductPage,
  OrderPage,
  UserFaq,
  UserProvider,
  EditReviewPage,
  AddReviewPage,
  ClothingCategory,
  GriptokCategory,
  CaseCategory,
  AddProductPage,
  MainPage,
  ProductDetail,
  StationeryCategory,
  Mypage,
  Layout,
  HomePage,
  Singup,
  Login,
  ErrorPage,
} from './utils/index.ts';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <UserProvider>
        <Layout />
      </UserProvider>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/mypage',
        element: <Mypage />,
      },
      {
        path: '/main',
        element: <MainPage />,
      },
      {
        path: '/add-product',
        element: <AddProductPage />,
      },
      {
        path: '/select-product',
        element: <SelectProductPage />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <Singup />,
      },
      {
        path: '/user-faq',
        element: <UserFaq />,
      },
      {
        path: '/cart',
        element: <MypageCart />,
      },
      {
        path: '/griptok-category',
        element: <GriptokCategory />,
      },
      {
        path: '/clothing-category',
        element: <ClothingCategory />,
      },
      {
        path: '/stationery-category',
        element: <StationeryCategory />,
      },
      {
        path: '/case-category',
        element: <CaseCategory />,
      },
      {
        path: '/product',
        element: <ProductDetail />,
      },
      {
        path: '/add-review',
        element: <AddReviewPage />,
      },
      {
        path: '/edit-review',
        element: <EditReviewPage />,
      },
      {
        path: 'mypage-bookmark',
        element: <MypageBookmark />,
      },
      {
        path: 'mypage-order',
        element: <MypageOrder />,
      },
      {
        path: 'mypage-review',
        element: <MypageReview />,
      },
      {
        path: '/order',
        element: <OrderPage />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />,
);
