import { useEffect, useState } from 'react';
import ReviewBox from '@components/review/ReviewBox';
import paginationStyles from '@/css/pagination.module.css';
import userPaginationStyles from '@/css/userPagination.module.css';
import styles from '@css/review.module.css';
import defaultProfile from '/icons/user_icon.png';
import api from '@utils/api';
import { Pagination } from 'ys-project-ui';
import { useUserContext } from '@context/UserContext';
import MypageHeader from '@components/categories/MypageCategories';
import cartStyles from '@css/mypage/mypageCart.module.css';
import { toast } from 'react-toastify';

interface Review {
  _id: string;
  productId: {
    name: string;
    image: string;
  };
  title: string;
  content: string;
  starpoint: number;
  createdAt: string;
  image: string[];
}

const MypageReviewPage = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalReviews, setTotalReviews] = useState(0);
  const reviewsPerPage = 2;
  const { user, token } = useUserContext();
  const userId = user?.id;

  const fetchReviews = async (page: number) => {
    try {
      const response = await api.get(
        `/review/user/${userId}?page=${page}&itemsPerPage=${reviewsPerPage}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(response.data);
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

  const handleEditReview = (reviewId: string) => {
    window.location.href = `/edit-review/${reviewId}`;
  };

  const handleDeleteReview = async (reviewId: string) => {
    const confirmDelete = window.confirm('정말로 이 리뷰를 삭제하시겠습니까?');
    if (confirmDelete) {
      try {
        await api.delete(`/review/${reviewId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success('리뷰가 성공적으로 삭제되었습니다.');
        fetchReviews(currentPage);
      } catch (err) {
        console.error('리뷰 삭제 중 오류가 발생했습니다.');
      }
    }
  };

  useEffect(() => {
    if (userId) {
      fetchReviews(currentPage);
    }
  }, [currentPage, userId]);

  return (
    <div className={cartStyles.content_wrap}>
      <MypageHeader />
      <div className={styles.reviewListWrap} style={{ marginTop: '30px' }}>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <ReviewBox
              key={review._id}
              profileImg={user.profileImage || defaultProfile}
              username={user?.name || '익명 사용자'}
              reviewTitle={review.title || '리뷰 제목 없음'}
              productName={review.productId?.name || '상품 정보 없음'}
              productImgs={[review.productId?.image || defaultProfile]}
              reviewContent={review.content}
              starpoint={review.starpoint}
              reviewImages={review.image || []}
              onEditClick={() => handleEditReview(review._id)}
              onDeleteClick={() => handleDeleteReview(review._id)}
            />
          ))
        ) : (
          <p>등록된 리뷰가 없습니다.</p>
        )}
      </div>

      {totalReviews > 0 && (
        <Pagination
          itemLength={totalReviews}
          value={currentPage}
          itemCountPerPage={reviewsPerPage}
          onPageChange={handlePageChange}
          className={paginationStyles.pagination}
        >
          <Pagination.PageButtons
            className={`${paginationStyles.pageButton} ${userPaginationStyles.pageButton}`}
          />
          <Pagination.Navigator
            className={`${paginationStyles.pageNavigate} ${userPaginationStyles.pageNavigate}`}
          />
        </Pagination>
      )}
    </div>
  );
};

export default MypageReviewPage;
