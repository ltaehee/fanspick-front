// routes.tsx
import { createBrowserRouter } from 'react-router-dom';
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
  AddProductPage,
  MainPage,
  ProductDetail,
  Mypage,
  Layout,
  HomePage,
  Singup,
  Login,
  ErrorPage,
  FixAndDeleteProductPage,
} from '@utils/index.ts';
import OauthCallback from './pages/OauthCallback';

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
        path: '/fix-product',
        element: <FixAndDeleteProductPage />,
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
        path: '/product/:id',
        element: <ProductDetail />,
      },
      {
        path: '/add-review',
        element: <AddReviewPage />,
      },
      {
        path: '/edit-review/:reviewId',
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
      {
        path: '/oauth/callback',
        element: <OauthCallback />,
      },
    ],
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
]);

export default router;
