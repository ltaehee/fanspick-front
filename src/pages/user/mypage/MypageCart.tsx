import { useEffect, useState } from 'react';
import cartStyles from '@css/mypage/mypageCart.module.css';
import tableStyles from '@css/productTable/productTable.module.css';
import noticeImg from '/icons/alert-circle.png';
import ProductTableHeader from '@components/productTable/ProductTableHeader';
import ProductTableMenu from '@components/productTable/ProductTableMenu';
import { useNavigate } from 'react-router-dom';
import { Button } from 'ys-project-ui';
import MypageHeader from '@components/categories/MypageCategories';
import { useUserContext } from '@context/UserContext';
import { toast } from 'react-toastify';
import trash from '/icons/trash.png';
import api from '../../../utils/api';

interface Cart {
  _id: string;
  quantity: number;
} //quantity 추후 작업

interface Detail {
  _id: string;
  name: string;
  price: number;
  image: string;
}

const MypageCart = () => {
  const navigate = useNavigate();
  const [isSelected, setIsSelected] = useState<Cart[]>([]);
  const [cart, setCart] = useState<Cart[]>([]); //로컬에서 가져온 장바구니 내역
  const [isDetail, setIsDetail] = useState<Detail[]>([]);
  const { user } = useUserContext();

  const userId = user?.id;
  if (!userId) {
    toast.error('로그인이 필요합니다.');
    return;
  }

  //장바구니 내역 가져오기
  const localCart = JSON.parse(localStorage.getItem(`cart_${userId}`) || '[]');

  useEffect(() => {
    if (localCart) {
      setCart(localCart);
    }
  }, []);

  useEffect(() => {
    const getProductDetail = async () => {
      const ids = cart.map((item) => item._id); // 상품의 아이디만 담은 배열

      try {
        const response = await api.get('/manager/product-by-ids', {
          params: { ids },
        }); //장바구니에 담긴 상품의 id를 전달
        console.log(response.data);
        setIsDetail(response.data.products);
      } catch (err) {
        console.error('장바구니 상품 조회 실패', err);
      }
    };

    getProductDetail();
  }, [cart]);

  //장바구니 내역 전체 삭제하기
  const deleteCart = () => {
    setCart([]);
  };

  //수량 빼기
  const handleDown = (id: string) => {
    setCart((prevCart) =>
      prevCart.map(
        (product) =>
          product._id === id && product.quantity > 0
            ? { ...product, quantity: product.quantity - 1 } // 수량 감소
            : product, // 다른 상품은 변경하지 않음
      ),
    );
  };

  //수량 더하기
  const handleUp = (id: string) => {
    setCart((prevCart) =>
      prevCart.map(
        (product) =>
          product._id === id
            ? { ...product, quantity: product.quantity + 1 } // 수량 증가
            : product, // 다른 상품은 변경 하지 않음
      ),
    );
  };

  const isChecked = (id: string) =>
    isSelected.some((product) => product._id === id);

  //선택된 아이템 관리
  const handleChangeCheckBox = (id: string) => {
    setIsSelected((prev) => {
      // 이미 선택된 id가 있으면 해당 상품 객체를 배열에서 제거
      if (prev.some((product) => product._id === id)) {
        return prev.filter((product) => product._id !== id);
      }
      // id가 없으면 cart에서 해당 상품을 찾아서 추가 (undefined가 아닌 값만 추가)
      const product = cart.find((product) => product._id === id);
      return product ? [...prev, product] : prev; // 상품이 없으면 배열을 그대로 반환
    });
  };

  //장바구니 선택한 하나의 아이템 삭제 버튼
  const handleDeleteItem = (productId: string) => {
    setCart((prev) => prev.filter((product) => product._id !== productId));
  };

  return (
    <div className={cartStyles.content_wrap}>
      <MypageHeader />
      {cart.length !== 0 ? (
        <div>
          <div className={cartStyles.Table_wrap}>
            <Button
              onClick={deleteCart}
              className={cartStyles.total_delete}
              label="전체 삭제"
            />
            <ProductTableHeader className={tableStyles.Header_wrap}>
              <ProductTableHeader.Menu
                menu="상품정보"
                className={tableStyles.Header_menu_first}
              />
              <ProductTableHeader.Menu
                menu="판매 금액"
                className={tableStyles.Header_menu}
              />
              <ProductTableHeader.Menu
                menu="수량"
                className={tableStyles.Header_menu}
              />
              <ProductTableHeader.Menu
                menu=""
                className={tableStyles.Header_menu}
              />
            </ProductTableHeader>
            <ProductTableMenu>
              {cart.map((product) => (
                <div key={product._id} className={tableStyles.content}>
                  <ProductTableMenu.CheckBox
                    className={cartStyles.checkbox_box}
                    productId={product._id}
                    isChecked={isChecked(product._id)}
                    onChange={handleChangeCheckBox}
                  />
                  {isDetail.map((product) => (
                    <div>
                      <ProductTableMenu.Detail
                        onClick={() => navigate('/add-review')}
                        productName={product.name}
                      />
                      <ProductTableMenu.Content content={product.price} />
                    </div>
                  ))}

                  <div className={tableStyles.quantity_wrap}>
                    <ProductTableMenu.QuantityButton
                      label="-"
                      onClick={handleDown}
                      id={product._id}
                    />
                    <ProductTableMenu.Quantity quantity={product.quantity} />
                    <ProductTableMenu.QuantityButton
                      label="+"
                      onClick={handleUp}
                      id={product._id}
                    />
                  </div>
                  <ProductTableMenu.DeleteButton
                    productId={product._id}
                    onClick={handleDeleteItem}
                    image={trash}
                  />
                </div>
              ))}
            </ProductTableMenu>
          </div>
          <div className={cartStyles.button_box}>
            <Button
              className={cartStyles.button}
              label="구매하기"
              onClick={() => navigate('/')}
            />
          </div>
        </div>
      ) : (
        <div>
          <div className={cartStyles.none_wrap}>
            <img src={noticeImg} className={cartStyles.alertImg} />
            <p className={cartStyles.p1}>장바구니에 담긴 상품이 없습니다.</p>
            <p className={cartStyles.p2}>마음에 드는 상품을 담아보세요!</p>
            <Button label="상품 담으러 가기" onClick={() => navigate('/')} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MypageCart;
