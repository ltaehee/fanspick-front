import { useEffect, useMemo, useState } from 'react';
import api from '@utils/api';
import styles from '@css/manager/selectProductPage.module.css';
import { useUserContext } from '@context/UserContext';
import { useNavigate } from 'react-router-dom';
import { addCommas } from '@utils/util';

/* 상품이미지 클릭하면 상품상세페이지로 네비 넣기 */
interface ProductProps {
  userId: string;
  _id: string;
  name: string;
  price: string;
  introduce: string;
  image: string;
  detailImage: string[];
  category: {
    name: string[];
  };
}

const SelectProductPage = () => {
  const [getProduct, setGetProduct] = useState<ProductProps[]>([]);
  const [userId, setUserId] = useState('');
  const { user } = useUserContext();
  const navigator = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const productsPerPage = 2;
  // console.log('userId ', userId);

  useMemo(() => {
    if (user) {
      setUserId(user.id);
    }
  }, [user]);

  const handleClickCard = (product: ProductProps) => {
    localStorage.setItem('productId', product._id);
    navigator('/fix-product');
  };

  const getAllProduct = async () => {
    try {
      const response = await api.get('/manager/products');
      if (response.status === 200) {
        console.log('전체 상품 가져오기 성공', response.data.product);
        setGetProduct(response.data.product);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getAllProductByUserId = async () => {
    try {
      const response = await api.get(`/manager/product/`);
    } catch (err) {
      console.log('전체 상품 불러오기 에러', err);
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  return (
    <div className={styles.container}>
      <h1>상품 조회</h1>
      <div className={styles.productList}>
        {getProduct
          .filter((product) => product.userId === userId)
          .map((product, index) => (
            <div
              key={index}
              onClick={() => handleClickCard(product)}
              className={styles.productCard}
            >
              <img
                src={product.image}
                alt="상품이미지"
                className={styles.productImage}
              />
              <h3>{product.name}</h3>
              <p>{addCommas(Number(product.price))}원</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SelectProductPage;
