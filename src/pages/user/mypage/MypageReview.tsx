import MypageHeader from '@components/categories/MypageCategories';
import { useState } from 'react';
import noticeImg from '/icons/alert-circle.png';
import cartStyles from '@css/mypage/mypageCart.module.css';
import axios from 'axios';

interface Review {
  productId: string;
  title: string;
  image: [string];
  content: string;
  starpoint: string;
}

const MypageReview = () => {
  const [review, setReview] = useState<Review[]>([]);

  const requestReview = async () => {
    try {
      const response = await axios.get('/');
      setReview(response.data);
    } catch (err) {
      console.error('리뷰 가져오기 실패', err);
    }
  };

  return (
    <div className={cartStyles.content_wrap}>
      <MypageHeader />
      {review.length !== 0 ? (
        <div></div>
      ) : (
        <div>
          <div className={cartStyles.none_wrap}>
            <img src={noticeImg} className={cartStyles.alertImg} />
            <p className={cartStyles.p1}>리뷰 내역이 없습니다.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MypageReview;
