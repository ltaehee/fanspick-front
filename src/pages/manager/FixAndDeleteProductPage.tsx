import { Input, Button } from 'ys-project-ui';
import styles from '@css/manager/fixAndDeleteProductPage.module.css';
import addImg from '/icons/addImg.png';
import xImg from '/icons/xImg.png';
import api from '@utils/api';
import AWS from 'aws-sdk';

const FixAndDeleteProductPage = () => {
  return (
    <>
      <div className={styles.body}>
        <div className={styles.main}>
          <h1>상품등록</h1>
        </div>
        <div className={styles.addProduct}>
          <section className={styles.addProductInfo}>
            <div className={styles.addProductPhoto}>
              <Input.Label>상품이미지</Input.Label>
              {!imgUrl && (
                <div className={styles.addProductPhotoDiv}>
                  <img
                    className={styles.addProductPhotoPreviewImg}
                    alt="기본 이미지"
                    onClick={handleClickDefaultImage}
                    src={addImg}
                  />
                  <input
                    className={styles.addProductPhotoInput}
                    type="file"
                    id="productImg"
                    accept="image/*"
                    onChange={handleClickFile}
                    ref={imgRef}
                  />
                  <input
                    className={styles.addProductPhotoInput}
                    type="file"
                    id="productImg"
                    accept="image/*"
                    onChange={handleClickFile}
                    ref={imgRef}
                  />
                </div>
              )}

              {imgUrl && (
                <div className={styles.addProductImgContainer}>
                  <div>
                    <img
                      className={styles.addProductPhotoImg}
                      src={imgUrl}
                      alt=""
                      onClick={handleClickDefaultImage}
                    />
                    <img src={xImg} alt="" className={styles.xImg} />
                    <div
                      className={styles.overlay}
                      onClick={() => handleDeleteImage()}
                    >
                      <p className={styles.deleteImg}>삭제</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className={styles.inputWrap}>
              <div className={styles.input}>
                <Input.Label>상품이름</Input.Label>
                <input
                  type="text"
                  placeholder="상품이름"
                  onChange={handleChangeName}
                  value={productName}
                />
              </div>
              <div className={styles.input}>
                <Input.Label>가격</Input.Label>
                <input
                  type="text"
                  placeholder="가격"
                  onChange={handleChangePrice}
                  value={productPrice}
                />
              </div>
            </div>
            <div className={styles.input}>
              <Input.Label>상품설명</Input.Label>
              <textarea
                typeof="text"
                placeholder="상품설명"
                rows={4}
                onChange={handleChangeIntroduce}
                value={productintroduce}
                className={styles.textarea}
              />
            </div>
            <Input.Label>카테고리</Input.Label>
            <div className={styles.inputCategory}>
              {categories.map((item, index) => (
                <div key={index} className={styles.inputCategoryLabel}>
                  <Input
                    type="checkbox"
                    id={item}
                    checked={categoryCheckedList.some(
                      (prev) => prev.item === item,
                    )}
                    onChange={(e) => handleCheckedCategory(e, item, index)}
                  />
                  <Input.Label htmlFor={item}>{item}</Input.Label>
                </div>
              ))}
            </div>
            <div className={styles.input}>
              <label>상품상세이미지 (최대3개)</label>
              {predetailViewUrls.length < 1 && (
                <div className={styles.addProductPhotoDiv}>
                  <img
                    className={styles.addProductPhotoPreviewImg}
                    alt="기본 이미지"
                    onClick={handleClickDefaultDetailImage}
                    src={addImg}
                  />
                  <input
                    className={styles.addProductPhotoInput}
                    type="file"
                    id="productDetailImg"
                    accept="image/*"
                    onChange={handleAddDetailImages}
                    ref={imgDetailRef}
                    multiple
                  />
                </div>
              )}
              <div className={styles.addProductDetailImgContainer}>
                {predetailViewUrls.map((url, i) => (
                  <div key={i} className={styles.imageContainer}>
                    <img
                      className={styles.addProductPhotoDetailImg}
                      src={url}
                      alt={`Image preview ${i + 1}`}
                    />
                    <div
                      className={styles.overlayDetail}
                      onClick={() => handleDeleteDetailImage(i)}
                    >
                      <p className={styles.deleteDetailImg}>삭제</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.buttonContainer}>
              <Button
                className={styles.submitButton}
                label="상품등록하기"
                type="button"
                onClick={handleClickSubmitButton}
              ></Button>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default FixAndDeleteProductPage;
