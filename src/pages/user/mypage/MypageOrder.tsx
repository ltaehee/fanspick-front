import orderStyles from '@css/mypage/mypageOrder.module.css';
import MypageHeader from '@components/categories/MypageCategories';
import tableStyles from '@css/productTable/productTable.module.css';
import cartStyles from '@css/mypage/mypageCart.module.css';
import ProductTableMenu from '@components/productTable/ProductTableMenu';
import { useNavigate } from 'react-router-dom';
import { Button } from 'ys-project-ui';
import axios from 'axios';
import { useEffect, useState } from 'react';
import noticeImg from '/icons/alert-circle.png';
import { useUserContext } from '@context/UserContext';
import api from '../../../utils/api';

interface Product {
  productId: {
    _id: string;
    name: string;
  };
  quantity: number;
  price: number;
}

interface Order {
  _id: string;
  createdAt: string;
  products: Product[];
}

const MypageOrder = () => {
  const { user } = useUserContext();
  const token = localStorage.getItem('token');

  const navigate = useNavigate();

  const [orderList, setOrderList] = useState<Order[]>([]);

  const handleOrderList = async () => {
    try {
      if (user) {
        const response = await api.get<{ orderList: Order[] }>(
          '/purchase/order/list',
          {
            headers: {
              Authorization: `Bearer ${token}`, // 헤더에 토큰을 포함
            },
          },
        );

        console.log('주문 목록', response.data.orderList);
        setOrderList(response.data.orderList);
      }
    } catch (err) {
      console.error('주문 내역 조회 실패', err);
    }
  };

  useEffect(() => {
    handleOrderList();
  }, []);

  const handleReview = (order: Order) => {
    navigate('/add-review', { state: { order } });
  };

  return (
    <div className={cartStyles.content_wrap}>
      <MypageHeader />
      {orderList.length !== 0 ? (
        <div>
          <div className={orderStyles.Table_wrap}>
            <ProductTableMenu>
              {orderList.map((order) => (
                <div key={order._id} className={orderStyles.order_wrap}>
                  <div className={orderStyles.day}>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </div>
                  {order.products.map((product) => (
                    <div
                      key={product.productId._id}
                      className={orderStyles.content}
                    >
                      <div className={orderStyles.table_wrap}>
                        <ProductTableMenu.Detail
                          onClick={() => navigate('/')}
                          productName={product.productId.name}
                        />
                        <ProductTableMenu.Content content={product.price} />
                        <div className={tableStyles.quantity_wrap}>
                          <ProductTableMenu.Quantity
                            quantity={product.quantity}
                          />
                        </div>
                        <Button
                          label="리뷰 등록하기"
                          onClick={() => handleReview(order)}
                          className={orderStyles.review_button}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </ProductTableMenu>
          </div>
        </div>
      ) : (
        <div>
          <div className={cartStyles.none_wrap}>
            <img src={noticeImg} className={cartStyles.alertImg} />
            <p className={cartStyles.p1}>주문 내역이 없습니다.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MypageOrder;
