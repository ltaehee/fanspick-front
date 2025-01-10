import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Star from '../../../components/review/Star';
import styles from '../../../css/review.module.css';
import uploadImg from '/icons/addImg.png';
import { Button } from 'ys-project-ui';
import { toast } from 'react-toastify';
import api from '@utils/api';
import AWS from 'aws-sdk';

// AWS S3 환경 변수
const ACCESS_KEY_ID = import.meta.env.VITE_ACCESS_KEY_ID;
const SECRET_ACCESS_KEY = import.meta.env.VITE_SECRET_ACCESS_KEY;
const REGION = import.meta.env.VITE_REGION;
const BUCKET_NAME = 'fanspick';

const EditReviewPage = () => {
  const { reviewId } = useParams<{ reviewId: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<any>(null);
  const [rating, setRating] = useState(3);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewContent, setReviewContent] = useState('');
  const [previewImg, setPreviewImg] = useState<string[]>([]);
  const [reviewPhotos, setReviewPhotos] = useState<File[]>([]);
  const inputFileRef = useRef<HTMLInputElement>(null);

  // AWS S3 설정
  const configAws = () => {
    AWS.config.update({
      accessKeyId: ACCESS_KEY_ID,
      secretAccessKey: SECRET_ACCESS_KEY,
      region: REGION,
    });
    return new AWS.S3();
  };

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await api.get(`/review/${reviewId}`);
        const review = response.data.review;

        setProduct(review.productId);
        setRating(review.starpoint);
        setReviewTitle(review.title);
        setReviewContent(review.content);
        setPreviewImg(review.image || []);
      } catch (error) {
        console.error('리뷰 불러오기 오류:', error);
        toast.error('리뷰 정보를 불러오는 중 오류가 발생했습니다.');
      }
    };

    if (reviewId) {
      fetchReview();
    } else {
      toast.error('리뷰 ID가 유효하지 않습니다.');
    }
  }, [reviewId]);

  const handleClick = (index: number) => {
    setRating(index);
  };

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray = Array.from(files).slice(0, 3 - previewImg.length);
    const previewArray = fileArray.map((file) => URL.createObjectURL(file));

    setReviewPhotos((prev) => [...prev, ...fileArray]);
    setPreviewImg((prev) => [...prev, ...previewArray]);
  };

  const handleImageDelete = (index: number) => {
    setPreviewImg((prev) => prev.filter((_, i) => i !== index));
    setReviewPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleImageUpload = () => {
    inputFileRef.current?.click();
  };

  const handleReviewUpdate = async () => {
    try {
      const s3UploadPromises = reviewPhotos.map((file) => uploadToS3(file));
      const s3Urls = (await Promise.all(s3UploadPromises)).filter(
        (url) => url !== null,
      );

      const updatedReview = {
        title: reviewTitle,
        content: reviewContent,
        starpoint: rating,
        image: [...previewImg, ...s3Urls],
      };

      await api.put(`/review/${reviewId}`, updatedReview); 
      toast.success('리뷰가 성공적으로 수정되었습니다!');
      navigate('/mypage-review');
    } catch (error) {
      console.error('리뷰 수정 오류:', error);
      toast.error('리뷰 수정 중 오류가 발생했습니다.');
    }
  };

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

  return (
    <div className={styles.addReviewWrap}>
      <h1 className={styles.h1}>리뷰수정</h1>
      <h3 className={styles.h3}>이상품 어떠셨나요?</h3>
      {product && (
        <div className={styles.productInfoBox}>
          <img
            className={styles.productImg}
            src={product.image}
            alt="상품 이미지"
          />
          <div className={styles.productInfo}>
            <p className={styles.productTitle}>상품명: {product.name}</p>
            <p className={styles.productPrice}>가격: {product.price}원</p>
          </div>
        </div>
      )}
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
      <p className={styles.label}>리뷰 제목</p>
      <input
        type="text"
        value={reviewTitle}
        onChange={(e) => setReviewTitle(e.target.value)}
        className={styles.input}
      />
      <p className={styles.label}>본문 입력</p>
      <textarea
        className={styles.textarea}
        value={reviewContent}
        onChange={(e) => setReviewContent(e.target.value)}
      />
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
        className={styles.addButton}
        label="리뷰 수정하기"
        onClick={handleReviewUpdate}
      />
    </div>
  );
};

export default EditReviewPage;
