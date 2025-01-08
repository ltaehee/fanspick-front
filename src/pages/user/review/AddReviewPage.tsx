import { ChangeEvent, useRef, useState } from "react";
import Star from "../../../components/review/Star";
import styles from "../../../css/review.module.css";
import dummyImg2 from "/images/product/dog2.jpg";
import uploadImg from "/icons/addImg.png";
import { Button } from "ys-project-ui";

const mockProduct = {
  id: 1,
  title: "상품12321",
  price: "100,000원",
  count: 1,
  imageUrl: dummyImg2,
};
const AddReviewPage = () => {
  const [rating, setRating] = useState(3);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [previewImg, setPreviewImg] = useState<string[]>([]);
  const [reviewPhotos, setReviewPhotos] = useState<File[]>([]);

  const handleClick = (index: number) => {
    setRating(index);
  };

  /* 이미지 업로드 */
  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray = Array.from(files).slice(0, 3);
    const previewArray = fileArray.map((file) => URL.createObjectURL(file));

    setReviewPhotos(fileArray);
    setPreviewImg(previewArray);
  };

  /* 이미지 삭제 하기 */
  const handleImageDelete = (index: number) => {
    setPreviewImg((prev) => prev.filter((_, i) => i !== index));
    setReviewPhotos((prev) => prev.filter((_, i) => i !== index));
  };
  // 버튼 클릭 시 input 요소 클릭
  const handleImageUpload = () => {
    inputFileRef.current?.click();
  };

  //리뷰 등록하기 버튼
  const handleClickAddReview = () => {};
  return (
    <div className={styles.addReviewWrap}>
      <h1 className={styles.h1}>리뷰등록</h1>
      <h3 className={styles.h3}>이상품 어떠셨나요?</h3>
      <div className={styles.productInfoBox}>
        <img
          className={styles.productImg}
          src={mockProduct.imageUrl}
          alt="상품 이미지"
        />
        <div className={styles.productInfo}>
          <p className={styles.productTitle}>{mockProduct.title}</p>
          <p className={styles.productCount}>수량: {mockProduct.count}</p>
          <p className={styles.productPrice}>{mockProduct.price}</p>
        </div>
      </div>
      <div className={styles.reviewStarWrap}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            filled={star <= rating}
            onClick={() => handleClick(star)}
            width="40px"
            height="40px"
          />
        ))}
      </div>
      <p className={styles.label}>본문 입력</p>
      <textarea className={styles.textarea} />
      <p className={styles.label}>사진 첨부</p>
      <div className={styles.uploadContainer}>
        {previewImg.map((photo, index) => (
          <div key={`previewImg-${index}`} className={styles.previewImgBox}>
            <img
              src={photo}
              alt="리뷰 사진"
              className={styles.imagePreview}
              onClick={() => handleImageDelete(index)}
            />
          </div>
        ))}
        {previewImg.length < 3 && (
          <div className={styles.uploadButton} onClick={handleImageUpload}>
            <input
              className={styles.uploadInput}
              type="file"
              accept="image/*"
              onChange={onFileChange}
              ref={inputFileRef}
              multiple
            />
            <img
              src={uploadImg}
              alt="업로드 아이콘"
              className={styles.uploadIcon}
            />
          </div>
        )}
      </div>
      <Button
        onClick={handleClickAddReview}
        className={styles.addButton}
        label="리뷰 등록하기"
      />
    </div>
  );
};

export default AddReviewPage;
