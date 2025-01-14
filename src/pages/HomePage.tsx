import { useEffect, useState } from 'react';
import ProductCard from '../components/product/ProductCard';
import styles from '../css/homepage.module.css';
import api from '../utils/api';
import { useLocation } from 'react-router-dom';
import { Pagination } from 'ys-project-ui';
import paginationStyles from '@/css/pagination.module.css';
import userPaginationStyles from '@/css/userPagination.module.css';

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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProduct, setTotalProduct] = useState(0);
  const productPerPage = 8;

  const [products, setProducts] = useState<ProductProps[]>([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryFilter = queryParams.get('category');

  const getAllProducts = async (page: number) => {
    try {
      const response = await api.get(
        `/manager/products` /* /manager/products?page=${page}&itemsPerPage=${productPerPage} */,
      );
      console.log({ response });
      if (response.status === 200) {
        setProducts(response.data.product);
        setTotalProduct(response.data.totalCount);
      }
    } catch (err) {
      console.error('상품 가져오기 실패');
    }
  };

  // 카테고리 필터링
  const filteredProducts = categoryFilter
    ? products.filter((product) =>
        product.category?.name.includes(categoryFilter),
      )
    : products;

  useEffect(() => {
    getAllProducts(currentPage);
  }, [currentPage, categoryFilter]);

  /* 페이지네이션 */
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const categoryName = categoryFilter ? categoryFilter : '';
  return (
    <div className={styles.container}>
      <h2>{categoryName ? `` : '이달의 한정판 굿즈'}</h2>

      <h1>
        {categoryName ? (
          `${categoryName} 카테고리`
        ) : (
          <>
            한정 수량으로 준비된 이달의 인기 굿즈!
            <br /> 이달만 만날 수 있는 특별한 굿즈를 확인하세요.
          </>
        )}
      </h1>
      <div className={styles.productListWrap}>
        {filteredProducts.length === 0 ? (
          <p>해당 카테고리에 상품이 없습니다.</p>
        ) : (
          filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              _id={product._id}
              image={product.image}
              name={product.name}
              price={product.price}
            />
          ))
        )}
      </div>

      {/* <Pagination
        itemLength={totalProduct}
        value={currentPage}
        itemCountPerPage={productPerPage}
        onPageChange={handlePageChange}
        className={paginationStyles.pagination}
      >
        <div className={paginationStyles.pageContainer}>
          <Pagination.Navigator
            type="prev"
            className={`${paginationStyles.pageNavigate} ${userPaginationStyles.pageNavigate}`}
          />
          <Pagination.PageButtons
            className={`${paginationStyles.pageButton} ${userPaginationStyles.pageButton}`}
          />
          <Pagination.Navigator
            type="next"
            className={`${paginationStyles.pageNavigate} ${userPaginationStyles.pageNavigate}`}
          />
        </div>
      </Pagination> */}
    </div>
  );
};

export default HomePage;
