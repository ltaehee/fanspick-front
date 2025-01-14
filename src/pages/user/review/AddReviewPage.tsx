import { ChangeEvent, useRef, useState } from 'react';
import styles from '@css/review.module.css';
// import dummyImg2 from '/images/product/dog2.jpg';
import uploadImg from '/icons/addImg.png';
import { Button, Input } from 'ys-project-ui';
import AWS from 'aws-sdk';
import { toast } from 'react-toastify';
import { useUserContext } from '@context/UserContext';
import api from '@utils/api';
import StarRating from '@components/review/StarRating';
import { useLocation } from 'react-router-dom';

// AWS S3 환경 변수
const ACCESS_KEY_ID = import.meta.env.VITE_ACCESS_KEY_ID;
const SECRET_ACCESS_KEY = import.meta.env.VITE_SECRET_ACCESS_KEY;
const REGION = import.meta.env.VITE_REGION;
const BUCKET_NAME = 'fanspick';

const AddReviewPage = () => {
  const location = useLocation();
  const { product } = location.state || {};
  const [rating, setRating] = useState(3);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [previewImg, setPreviewImg] = useState<string[]>([]);
  const [reviewPhotos, setReviewPhotos] = useState<File[]>([]);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewText, setReviewText] = useState('');
  const { token } = useUserContext();

  console.log('location.state', location.state);

  // AWS S3 설정
  const configAws = () => {
    AWS.config.update({
      accessKeyId: ACCESS_KEY_ID,
      secretAccessKey: SECRET_ACCESS_KEY,
      region: REGION,
    });
    return new AWS.S3();
  };

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray = Array.from(files).slice(0, 3); // 최대 3개 제한
    const previewArray = fileArray.map((file) => URL.createObjectURL(file));

    setReviewPhotos(fileArray);
    setPreviewImg(previewArray);
  };

  /* 이미지 S3 업로드 */
  const uploadToS3 = async (file: File) => {
    try {
      const s3 = configAws();
      const uploadParams = {
        Bucket: BUCKET_NAME,
        Key: `review/${file.name}`,
        Body: file,
        ACL: 'public-read',
      };

      const data = await s3.upload(uploadParams).promise();
      return data.Location;
    } catch (error) {
      toast.error('이미지 업로드에 실패했습니다.');
      return null;
    }
  };

  const handleImageDelete = (index: number) => {
    setPreviewImg((prev) => prev.filter((_, i) => i !== index));
    setReviewPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  /* 리뷰 등록하기 */
  const handleClickAddReview = async () => {
    try {
      const s3UploadPromises = reviewPhotos.map((file) => uploadToS3(file));
      const s3Urls = (await Promise.all(s3UploadPromises)).filter(
        (url) => url !== null,
      );
      const reviewData = {
        productId: product._id,
        title: reviewTitle, // 리뷰 제목
        content: reviewText, // 리뷰 본문
        starpoint: rating,
        images: s3Urls,
      };

      console.log('사용자 토큰:', token);
      await api.post('/review/add', reviewData);

      toast.success('리뷰가 성공적으로 등록되었습니다!');
    } catch (error) {
      console.error('리뷰 등록 중 오류가 발생했습니다.');
    }
  };

  /* 파일 선택 버튼 클릭 */
  const handleImageUpload = () => {
    inputFileRef.current?.click();
  };

  return (
    <div className={styles.addReviewWrap}>
      <h1 className={styles.h1}>리뷰등록</h1>
      <h3 className={styles.h3}>이상품 어떠셨나요?</h3>
      <div className={styles.productInfoBox}>
        <img
          className={styles.productImg}
          src={product?.image}
          alt="상품 이미지"
        />
        <div className={styles.productInfo}>
          <p className={styles.productTitle}>{product?.name}</p>
          <p className={styles.productCount}>수량: {product.quantity}</p>
          <p className={styles.productPrice}>가격: {product.price}</p>
        </div>
      </div>
      <StarRating rating={rating} onRatingChange={setRating} />
      <p className={styles.label}>사진 첨부</p>
      <div className={styles.uploadContainer}>
        {previewImg.map((photo, index) => (
          <div key={`previewImg-${index}`} className={styles.previewImgBox}>
            <img src={photo} alt="리뷰 사진" className={styles.imagePreview} />
            <button
              type="button"
              className={styles.removeButton}
              onClick={() => handleImageDelete(index)}
            >
              &times;
            </button>
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
      <p className={styles.label}>리뷰 제목</p>
      <Input
        type="text"
        name="reviewTitle"
        value={reviewTitle}
        onChange={(e) => setReviewTitle(e.target.value)}
        placeholder="리뷰 제목을 입력하세요"
        className={styles.review_title}
      />
      <p className={styles.label}>
        본문 입력{' '}
        <span style={{ fontSize: '10px', color: 'blue' }}>
          (최대 100자까지 입력 가능합니다.)
        </span>
      </p>
      <textarea
        className={styles.textarea}
        value={reviewText}
        onChange={(e) => {
          if (e.target.value.length <= 100) {
            setReviewText(e.target.value);
          } else {
            toast.warning('리뷰 본문은 최대 100자까지 입력 가능합니다.');
          }
        }}
      />
      <Button
        onClick={handleClickAddReview}
        className={styles.addButton}
        label="리뷰 등록하기"
      />
    </div>
  );
};

export default AddReviewPage;
