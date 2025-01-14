import styles from '../css/homepage.module.css';
import ProductCard from '../components/product/ProductCard';
import api from '../utils/api';
import { useEffect, useState } from 'react';

export interface ProductProps {
  _id: string;
  userId: string;
  name: string;
  price: number;
  introduce: string;
  image: string;
  detailImage: string[];
  category: {
    name: string[];
  };
}

const HomePage = () => {
  const [getProduct, setGetProduct] = useState<ProductProps[]>([]);
  const getAllProduct = async () => {
    try {
      const response = await api.get('/manager/products');
      if (response.status === 200) {
        setGetProduct(response.data.product);
      }
    } catch (err) {
      console.error('에러');
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  return (
    <div className={styles.container}>
      <h2>이달의 한정판 굿즈</h2>
      <h1>
        한정 수량으로 준비된 이달의 인기 굿즈!
        <br />
        이달만 만날 수 있는 특별한 굿즈를 확인하세요.
      </h1>
      <div className={styles.productListWrap}>
        {getProduct.map((product, index) => (
          <ProductCard
            key={index}
            _id={product._id}
            image={product.image}
            name={product.name}
            price={product.price}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
