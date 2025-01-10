import { useNavigate, useParams } from 'react-router-dom';
import styles from '../../../css/product/productDetail.module.css';
// import dummyImg2 from '/images/product/dog2.jpg';
import { Button, Tabs } from 'ys-project-ui';
import { useEffect, useState } from 'react';
import ProductCount from '../../../components/product/ProductCount';
// import ReviewBox from '../../../components/review/ReviewBox';
// import profileImg from '/icons/user_icon.png';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUserContext } from '../../../context/UserContext';
import api from '../../../utils/api';
import ProductReviewPage from '../review/ProductReviews';

interface PaymentData {
  pg: string;
  pay_method: string;
  merchant_uid: string;
  name: string;
  amount: number;
}

interface ProductDetailProps {
  _id: string;
  name: string;
  price: string;
  introduce: string;
  image: string;
  category: {
    name: string[];
  };
  detailImage: string[];
}

// const mockReviews = [
//   {
//     profileImg: profileImg,
//     username: '이 * 희',
//     productName: '강아지 그립톡',
//     productImg: dummyImg2,
//     reviewContent:
//       '그립톡 정말 좋아요! 그립톡 정말 좋아요!그립톡 정말 좋아요!그립톡 정말 좋아요!',
//   },
//   {
//     profileImg: profileImg,
//     username: '이 * 희',
//     productName: '고양이 그립톡',
//     productImg: dummyImg2,
//     reviewContent: '그립톡 정말 좋아요!그립톡 정말 좋아요!그립톡 정말 좋아요!',
//   },
// ];

const ProductDetail = () => {
  const [getProduct, setGetProduct] = useState<ProductDetailProps | null>(null);
  const { id } = useParams<{ id: string }>();

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState(0);
  const onChangeTab = (index: number) => {
    setActiveTab(index);
  };
  const navigate = useNavigate();
  const { user } = useUserContext();

  /* 장바구니 로컬 스토리지 저장 */
  const handleAddCart = () => {
    const userId = user?.id;
    if (!userId) {
      toast.error('로그인이 필요합니다.');
      return;
    }
    // 사용자별 장바구니 키 생성
    const cartKey = `cart_${userId}`;
    const cartItems = JSON.parse(localStorage.getItem(cartKey) || '[]');

    const isAlreadyCart = cartItems.some(
      (item: any) => item._id === getProduct?._id,
    );

    if (!isAlreadyCart) {
      const updatedFavorites = [...cartItems, getProduct];
      localStorage.setItem(cartKey, JSON.stringify(updatedFavorites));
      toast.success('장바구니에 추가되었습니다.');
    } else {
      toast.warning('이미 장바구니에 있는 상품입니다.');
    }
  };

  /* 즐겨찾기 로컬 스토리지 저장 */
  const handleAddFavorites = () => {
    const userId = user?.id;
    if (!userId) {
      toast.error('로그인이 필요합니다.');
      return;
    }

    // 사용자별 즐겨찾기 키 생성
    const favoritesKey = `favorite_${userId}`;
    const favoriteItems = JSON.parse(
      localStorage.getItem(favoritesKey) || '[]',
    );

    const isAlreadyFavorite = favoriteItems.some(
      (item: any) => item.id === getProduct?._id,
    );

    if (!isAlreadyFavorite) {
      const updatedFavorites = [...favoriteItems, getProduct];
      localStorage.setItem(favoritesKey, JSON.stringify(updatedFavorites));
      toast.success('즐겨찾기에 추가되었습니다.');
    } else {
      toast.warning('이미 즐겨찾기에 있는 상품입니다.');
    }
  };

  /* 상품 데이터 불러오기 */
  const getAllProduct = async () => {
    try {
      const response = await api.get(`/manager/product/${id}`);

      if (response.status === 200) {
        console.log('상세 데이터 가져오기 성공', response.data.product);
        setGetProduct(response.data.product);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  if (!getProduct) {
    return <div>상품 정보를 찾을 수 없습니다.</div>;
  }

  /* 상품 데이터 주문 페이지로 그대로 전달 */
  const handleBuyClick = () => {
    if (getProduct) {
      navigate('/order', { state: { product: getProduct, quantity } });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.productDetailWrapper}>
        {/* 상품 이미지 */}
        <div className={styles.productImageBox}>
          <img
            src={getProduct.image}
            alt="상품 이미지"
            className={styles.productImage}
          />
        </div>
        {/* 상품 정보 */}
        <div className={styles.productInfoBox}>
          <h1 className={styles.productTitle}>{getProduct.name}</h1>
          <p className={styles.productPrice}>{getProduct.price}원</p>
          <p className={styles.productDescription}>{getProduct.introduce}</p>
          <ProductCount onChange={setQuantity} />
          <Button
            label="구매하기"
            className={styles.buyButton}
            onClick={handleBuyClick}
          />
          <div className={styles.secondBtnWrap}>
            <Button label="장바구니" onClick={handleAddCart} />
            <Button label="즐겨찾기" onClick={handleAddFavorites} />
          </div>
        </div>
      </div>
      <Tabs
        onChangeTab={onChangeTab}
        defaultTabIndex={0}
        className={styles.tabs}
      >
        <Tabs.MenuList className={styles.tabsMenuList}>
          <Tabs.Menu
            className={`${styles.tabsMenu} ${
              activeTab === 0 ? styles.active : ''
            }`}
          >
            설명
          </Tabs.Menu>
          <Tabs.Menu
            className={`${styles.tabsMenu} ${
              activeTab === 1 ? styles.active : ''
            }`}
          >
            리뷰
          </Tabs.Menu>
        </Tabs.MenuList>
        <Tabs.Pannel className={styles.tabsPannel}>
          <div className={styles.detailImageWrap}>
            {getProduct.detailImage.map((image, index) => (
              <img
                key={index}
                src={image}
                className={styles.detailImage}
                alt="상품 상세 이미지"
              />
            ))}
          </div>
        </Tabs.Pannel>
        <Tabs.Pannel>
          <ProductReviewPage productId={getProduct._id} />
        </Tabs.Pannel>
      </Tabs>
    </div>
  );
};

export default ProductDetail;
