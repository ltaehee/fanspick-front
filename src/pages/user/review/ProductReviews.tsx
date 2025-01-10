import { useEffect, useState } from 'react';
import ReviewBox from '@components/review/ReviewBox';
import styles from '@css/product/productReviewPage.module.css';
import paginationStyles from '@/css/pagination.module.css'

import api from '@utils/api';
import { Pagination } from 'ys-project-ui';

interface Review {
  _id: string;
  userId: {
    name: string;
    profileImage: string;
  };
  title: string;
  content: string;
  image: string[];
  starpoint: number;
  createdAt: string;
}

const ProductReviewPage = ({ productId }: { productId: string }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalReviews, setTotalReviews] = useState(0);
  const reviewsPerPage = 2;

  const fetchReviews = async () => {
    try {
      const response = await api.get(`/review/product/${productId}`);
      if (response.status === 200) {
        setReviews(response.data.reviews);
        setTotalReviews(response.data.totalCount);
      }
    } catch (err) {
      console.error('리뷰 불러오기 오류:', err);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  return (
    <div className={styles.reviewListWrap}>
      {reviews.length > 0 ? (
        <>
          {reviews.map((review) => (
            <ReviewBox
              key={review._id}
              profileImg={review.userId.profileImage}
              username={review.userId.name}
              reviewTitle={review.title}
              productImgs={review.image}
              reviewContent={review.content}
              starpoint={review.starpoint}
              className={paginationStyles.paginationContainer}
            />
          ))}
          <Pagination
            itemLength={totalReviews}
            value={currentPage}
            itemCountPerPage={reviewsPerPage}
            onPageChange={handlePageChange}
          >
            <Pagination.PageButtons
              className={paginationStyles.pageButton}
            />
            <Pagination.Navigator
              className={paginationStyles.disabled}
            />
          </Pagination>
        </>
      ) : (
        <p>등록된 리뷰가 없습니다.</p>
      )}
    </div>
  );
};

export default ProductReviewPage;
