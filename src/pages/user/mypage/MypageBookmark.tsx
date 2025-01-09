import { Button } from 'ys-project-ui';
import MypageHeader from '../../../components/categories/MypageCategories';
import ProductTableHeader from '../../../components/productTable/ProductTableHeader';
import ProductTableHeaderMenu from '../../../components/productTable/ProductTableHeaderMenu';
import ProductTableMenu from '../../../components/productTable/ProductTableMenu';
import cartStyles from '../../../css/mypage/mypageCart.module.css';
import tableStyles from '../../../css/productTable/productTable.module.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import noticeImg from '/icons/alert-circle.png';
import { toast } from 'react-toastify';

interface bookmark {
  id: string;
  title: string;
  price: string;
  imageUrl: string;
}

const MypageBookmark = () => {
  const navigate = useNavigate();
  const [isSelected, setIsSelected] = useState<bookmark[]>([]);
  const [isFavorite, setIsFavorite] = useState<bookmark[]>([]);

  //유저 정보 가져오기
  const user = JSON.parse(localStorage.getItem('user') || '{}');
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
    isSelected.some((product) => product.id === id);

  //선택된 아이템 관리
  const handleChangeCheckBox = (id: string) => {
    setIsSelected((prev) => {
      // 이미 선택된 id가 있으면 해당 상품 객체를 배열에서 제거
      if (prev.some((product) => product.id === id)) {
        return prev.filter((product) => product.id !== id);
      } else {
        // id가 없으면 cart에서 해당 상품을 찾아서 추가 (undefined가 아닌 값만 추가)
        const product = isFavorite.find((product) => product.id === id);
        return product ? [...prev, product] : prev; // 상품이 없으면 배열을 그대로 반환
      }
    });
  };

  useEffect(() => {
    console.log('선택된 항목', isSelected);
  }, []);

  //아이템 삭제 버튼
  const handleDeleteItem = (productId: string) => {
    const handleRealDelete = () => {
      setIsFavorite((prev) => {
        const updatedFavorites = prev.filter(
          (product) => product.id !== productId,
        ); //삭제하려는 아이템의 아이디를 지움
        if (userId) {
          localStorage.setItem(
            `favorite_${userId}`,
            JSON.stringify(updatedFavorites),
          );
        }
        return updatedFavorites;
        toast.success('삭제가 완료 되었습니다.');
      });
    };

    const handleCancel = () => {
      toast.dismiss();
    };

    toast(
      <div>
        <p>즐겨찾기 목록에서 삭제하시겠습니까?</p>
        <div>
          <Button onClick={handleRealDelete} label="네" />
          <Button onClick={handleCancel} label="아니오" />
        </div>
      </div>,
    );
  };

  // 선택한 항목 장바구니에 추가
  const handleAddCart = () => {
    if (isSelected) {
      localStorage.setItem(`cart_${userId}`, JSON.stringify(isSelected));
    }
    toast.success('장바구니에 추가되었습니다.');
  };

  return (
    <div className={cartStyles.content_wrap}>
      {isFavorite.length !== 0 ? (
        <div>
          <MypageHeader />
          <div className={cartStyles.Table_wrap}>
            <ProductTableHeader className={tableStyles.Header_wrap}>
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
                <div key={product.id} className={tableStyles.content}>
                  <ProductTableMenu.CheckBox
                    className={cartStyles.checkbox_box}
                    productId={product.id}
                    isChecked={isChecked(product.id)}
                    onChange={handleChangeCheckBox}
                  />
                  <ProductTableMenu.Detail
                    onClick={() => navigate('/add-review')}
                    productName={product.title}
                  />
                  <ProductTableMenu.Content content={product.price} />
                  <div className={tableStyles.quantity_wrap}></div>
                  <ProductTableMenu.DeleteButton
                    productId={product.id}
                    onClick={handleDeleteItem}
                  />
                </div>
              ))}
            </ProductTableMenu>
          </div>
          <div className={cartStyles.button_box}>
            <Button
              className={cartStyles.bookmark_button}
              label="장바구니에 담기"
              onClick={handleAddCart}
            />
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
