import ReviewProfile from "./ReviewProfile";
import styles from "../../css/review.module.css";

const ReviewBox = () => {
  return (
    <div className={styles.reviewBox}>
      <ReviewProfile />
    </div>
  );
};

export default ReviewBox;
