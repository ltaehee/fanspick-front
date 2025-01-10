import { useEffect, useState } from 'react';
import ProductCard from '../../../components/product/ProductCard';
import styles from '../../../css/homepage.module.css';
import { ProductProps } from '../../HomePage';
import api from '../../../utils/api';
import { toast } from 'react-toastify';

const CaseCategory = () => {
  const [products, setProducts] = useState<ProductProps[]>([]);

  const getAllProducts = async () => {
    try {
      const response = await api.get('/manager/get-all-product');
      if (response.status === 201) {
        setProducts(response.data.product);
      }
    } catch (err) {
      toast.error('상품 가져오기 실패');
    }
  };

  // 카테고리 필터링 (필요한 카테고리만)
  const caseCategoryProducts = products.filter((product) =>
    product.category?.name.includes('케이스'),
  );

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div className={styles.container}>
      <h1>케이스 카테고리</h1>
      <div className={styles.productListWrap}>
        {caseCategoryProducts.map((product) => (
          <ProductCard
            key={product._id}
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

export default CaseCategory;
