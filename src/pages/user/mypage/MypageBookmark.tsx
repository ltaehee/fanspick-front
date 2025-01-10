import { Button } from 'ys-project-ui';
import MypageHeader from '@components/categories/MypageCategories';
import ProductTableHeader from '@components/productTable/ProductTableHeader';
import ProductTableHeaderMenu from '@components/productTable/ProductTableHeaderMenu';
import ProductTableMenu from '@components/productTable/ProductTableMenu';
import cartStyles from '@css/mypage/mypageCart.module.css';
import tableStyles from '@css/productTable/productTable.module.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import noticeImg from '/icons/alert-circle.png';
import { toast } from 'react-toastify';
import { useUserContext } from '@context/UserContext';
import trash from '/icons/trash.png';
import cart from '/icons/cart_icon.png';

interface Bookmark {
  _id: string;
  name: string;
  price: string;
  image: string;
}

const MypageBookmark = () => {
  const navigate = useNavigate();
  const [isSelected, setIsSelected] = useState<Bookmark[]>([]);
  const [isFavorite, setIsFavorite] = useState<Bookmark[]>([]);

  //유저 정보 가져오기
  const { user } = useUserContext();
  const userId = user?.id;
  if (!userId) {
    toast.error('로그인이 필요합니다.');
    return;
  }

  //유저의 즐겨찾기 목록을 가져옴
  const inFavorites = JSON.parse(
    localStorage.getItem(`favorite_${userId}`) || '[]',
  );

  useEffect(() => {
    if (inFavorites) {
      setIsFavorite(inFavorites);
    }
  }, []);

  const isChecked = (id: string) =>
    isSelected.some((product) => product._id === id);

  //선택된 아이템 관리
  const handleChangeCheckBox = (id: string) => {
    setIsSelected((prev) => {
      // 이미 선택된 id가 있으면 해당 상품 객체를 배열에서 제거
      if (prev.some((product) => product._id === id)) {
        return prev.filter((product) => product._id !== id);
      } else {
        // id가 없으면 cart에서 해당 상품을 찾아서 추가 (undefined가 아닌 값만 추가)
        const product = isFavorite.find((product) => product._id === id);
        return product ? [...prev, product] : prev; // 상품이 없으면 배열을 그대로 반환
      }
    });
  };

  //아이템 삭제 버튼
  const handleDeleteItem = (productId: string) => {
    setIsFavorite((prev) => {
      const updatedFavorites = prev.filter(
        (product) => product._id !== productId,
      ); //삭제하려는 아이템의 아이디를 지움
      if (userId) {
        localStorage.setItem(
          `favorite_${userId}`,
          JSON.stringify(updatedFavorites),
        );
      }
      toast.success('삭제가 완료 되었습니다.');
      return updatedFavorites;
    });
  };

  // 선택한 항목 장바구니에 추가
  const handleAddCart = () => {
    if (isSelected) {
      localStorage.setItem(`cart_${userId}`, JSON.stringify(isSelected));
    }
    toast.success('장바구니에 추가되었습니다.');
  };

  //즐겨찾기 내역 전체 삭제하기
  const deleteCart = () => {
    setIsFavorite([]);
  };

  useEffect(() => {
    if (isFavorite) {
      localStorage.setItem(`favorite_${userId}`, JSON.stringify(isFavorite));
    }
  }, [isFavorite]);

  return (
    <div className={cartStyles.content_wrap}>
      {isFavorite.length !== 0 ? (
        <div>
          <MypageHeader />
          <div className={cartStyles.Table_wrap}>
            <Button
              onClick={deleteCart}
              className={cartStyles.total_delete}
              label="전체 삭제"
            />
            <ProductTableHeader className={tableStyles.bookmark_wrap}>
              <ProductTableHeaderMenu
                menu="상품정보"
                className={tableStyles.Header_menu_first}
              />
              <ProductTableHeaderMenu
                menu="판매 금액"
                className={tableStyles.Header_menu}
              />
              <ProductTableHeaderMenu
                menu=""
                className={tableStyles.Header_menu}
              />
            </ProductTableHeader>
            <ProductTableMenu>
              {isFavorite.map((product) => (
                <div key={product._id} className={tableStyles.bookmark_content}>
                  <ProductTableMenu.CheckBox
                    className={cartStyles.checkbox_box}
                    productId={product._id}
                    isChecked={isChecked(product._id)}
                    onChange={handleChangeCheckBox}
                  />
                  <ProductTableMenu.Detail
                    onClick={() => navigate('/add-review')}
                    productName={product.name}
                    image={product.image}
                  />
                  <ProductTableMenu.Content content={product.price} />
                  <div className={cartStyles.bookmark_buttons_wrap}>
                    <ProductTableMenu.DeleteButton
                      productId={product._id}
                      onClick={handleAddCart}
                      image={cart}
                    />
                    <ProductTableMenu.DeleteButton
                      productId={product._id}
                      onClick={() => handleDeleteItem(product._id)}
                      image={trash}
                    />
                  </div>
                </div>
              ))}
            </ProductTableMenu>
          </div>
        </div>
      ) : (
        <div>
          <MypageHeader />
          <div className={cartStyles.none_wrap}>
            <img src={noticeImg} className={cartStyles.alertImg} />
            <p className={cartStyles.p1}>즐겨찾기에 담긴 상품이 없습니다.</p>
            <p className={cartStyles.p2}>마음에 드는 상품을 담아보세요!</p>
            <Button label="계속 쇼핑하기" onClick={() => navigate('/')} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MypageBookmark;
