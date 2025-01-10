import styles from '@css/review.module.css';
import Star from './Star';

interface ReviewBoxProps {
  profileImg: string;
  username: string;
  reviewTitle: string;
  productImgs: string[];
  reviewContent: string;
  starpoint: number;
  className?: string;
}

const ReviewBox: React.FC<ReviewBoxProps> = ({
  profileImg,
  username,
  reviewTitle,
  productImgs = [],
  reviewContent,
  starpoint,
  className = '',
}) => {
  return (
    <div className={`${styles.reviewBox} ${className}`}>
      <div className={styles.profileBox}>
        <img
          src={profileImg}
          alt="프로필 이미지"
          className={styles.profileImg}
        />
        <div className={styles.profileInfoBox}>
          <p className={styles.username}>{username}</p>
          <div className={styles.starBox}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} filled={star <= starpoint} onClick={() => {}} />
            ))}
          </div>
        </div>
      </div>
      <div>
        <p className={styles.reviewTitle}>{reviewTitle}</p>
        <div className={styles.reviewImgBox}>
          {productImgs.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`리뷰 이미지 ${index}`}
              className={styles.productImg}
            />
          ))}
        </div>
        <p className={styles.reviewContent}>{reviewContent}</p>
      </div>
    </div>
  );
};

export default ReviewBox;
