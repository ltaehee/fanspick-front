import styles from "../../css/review.module.css";
import { useState } from "react";
import Star from "./Star";

interface ReviewBoxProps {
  profileImg: string;
  username: string;
  productName: string;
  productImg: string;
  reviewContent: string;
  className?: string;
}

const ReviewBox: React.FC<ReviewBoxProps> = ({
  profileImg,
  username,
  productName,
  productImg,
  reviewContent,
  className = "",
}) => {
  const [rating, setRating] = useState(0);

  const handleClick = (index: number) => {
    setRating(index);
  };
  return (
    <div className={`${styles.reviewBox} ${className}`}>
      <div className={styles.profileBox}>
        <img
          src={profileImg}
          alt="프로필 이미지"
          className={styles.profileImg}
        />
        <div className={styles.profileInfoBox}>
          <p>{username}</p>
          <div className={styles.starBox}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                filled={star <= rating}
                onClick={() => handleClick(star)}
              />
            ))}
          </div>
        </div>
      </div>
      <div>
        <p className={styles.productName}>{productName}</p>
        <div className={styles.reviewImgBox}>
          <img src={productImg} alt="제품 이미지" />
        </div>
        <p className={styles.reviewContent}>{reviewContent}</p>
      </div>
    </div>
  );
};

export default ReviewBox;
