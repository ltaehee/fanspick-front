import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from "react";
import styles from "../../css/manager/addProductPage.module.css";
import { Button, Input } from "ys-project-ui";
import { AxiosError } from "axios";
import addImg from "/icons/addImg.png";
import api from "../../utils/api";
import AWS from "aws-sdk";
import { File } from "aws-sdk/clients/codecommit";
import { toast } from "react-toastify";

const ACCESS_KEY_ID = import.meta.env.VITE_ACCESS_KEY_ID;
const SECRET_ACCESS_KEY = import.meta.env.VITE_SECRET_ACCESS_KEY;
const REGION = import.meta.env.VITE_REGION;

interface CheckedCategory {
  id: number;
  item: string;
}

const AddProductPage = () => {
  const [categories, setCategories] = useState([]);
  const [productName, setproductName] = useState(""); // 상품이름
  const [productPrice, setproductPrice] = useState(""); // 상품가격
  const [productintroduce, setProductIntroduce] = useState(""); // 상품설명
  const [categoryCheckedList, setCategoryCheckedList] = useState<
    CheckedCategory[]
  >([]);
  const [imgUrl, setImgUrl] = useState<string>(""); // 상품이미지
  const [awsImgAddress, setAwsImgAddress] = useState(""); // 상품이미지 저장된 S3 주소
  const [awsDetailImgAddress, setAwsDetailImgAddress] = useState<string[]>([]); // 상품상세이미지 저장된 S3 주소
  const [predetailViewUrls, setPreDetailViewUrls] = useState<string[]>([]); // 상세이미지 미리보기 url
  const imgRef = useRef<HTMLInputElement>(null);
  const imgDetailRef = useRef<HTMLInputElement>(null);

  // console.log("imgUrl ", imgUrl);
  console.log("awsDetailImgAddress ", awsDetailImgAddress);
  // console.log("상품상세이미지 ", predetailViewUrls);

  // AWS S3 설정
  const configAws = () => {
    AWS.config.update({
      accessKeyId: ACCESS_KEY_ID, // IAM 사용자 엑세스 키 변경
      secretAccessKey: SECRET_ACCESS_KEY, // IAM 엑세스 시크릿키 변경
      region: REGION,
    });
    return new AWS.S3();
  };

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setproductName(e.target.value);
  };
  const handleChangePrice = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const value = input.replace(/[^0-9]/g, ""); // 문자는 입력못하게
    setproductPrice(value);
  };
  const handleChangeIntroduce = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setProductIntroduce(e.target.value);
  };

  const handleClickFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];

      const url = URL.createObjectURL(file);
      setImgUrl(url);
      // setImgFile(file);

      const reader = new FileReader();

      reader.onload = (e) => {
        // 파일을 읽은 후 실행할 코드를 정의
        const image = new Image();
        image.onload = () => {
          const width = image.width;
          const height = image.height;
          console.log(width, height);
          if (width !== height) {
            toast.error("이미지의 크기는 가로 세로 길이가 같아야 합니다.");
            setImgUrl("");
            // setImgFile(null);
          } else {
            uploadToS3(file);
          }
        };
        if (e.target && typeof e.target.result === "string") {
          image.src = e.target.result; // 이미지 객체가 파일 내용을 로드하게
        }
      };
      reader.readAsDataURL(file); // 실제로 파일을 읽어 onload 실행

      const uploadToS3 = async (file: globalThis.File) => {
        try {
          const s3 = configAws();

          // 업로드할 파일 정보 설정
          const uploadParams = {
            Bucket: "fanspick",
            Key: `product/${file.name}`,
            Body: file,
          };

          // S3에 파일 업로드
          const data = await s3.upload(uploadParams).promise();
          console.log("AWS S3 상품메인이미지 업로드 성공 ", data);
          setAwsImgAddress(data.Location);
        } catch (err) {
          console.error("AWS S3 업로드 실패 : ", err);
        }
      };
    }
  };

  const handleCheckedCategory = (
    e: ChangeEvent<HTMLInputElement>,
    value: string,
    id: number
  ) => {
    const isChecked = e.target.checked;
    categoryCheckedList.shift();

    if (isChecked) {
      setCategoryCheckedList((prev) => [...prev, { id, item: value }]);
    } else {
      setCategoryCheckedList((prev) =>
        prev.filter((item) => item.item !== value)
      );
    }
  };

  /* 상품 상세 이미지 업로드(다중) */
  const handleAddDetailImages = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).slice(0, 4);

      // 기존 이미지 파일에 새로운 파일추가
      if (e.target.files.length > 3) {
        toast.error("숙소 이미지는 최대 3개까지 등록가능합니다.");
        return;
      }
      console.log("filesArray ", e.target.files);
      const validFiles: globalThis.File[] = [];
      let checkFiles = 0;

      const uploadToS3 = async (files: globalThis.File[]) => {
        try {
          const s3 = configAws();

          const uploadFiles = files.map((file) => {
            // 업로드할 파일 정보 설정
            const uploadParams = {
              Bucket: "fanspick",
              Key: `productDetail/${file.name}`,
              Body: file,
            };
            // S3에 파일 업로드
            return s3.upload(uploadParams).promise();
          });

          const results = await Promise.all(uploadFiles);
          console.log("AWS S3 업로드 성공 ", results);
          const detailImgLocation = results.map((item) => item.Location);
          console.log("AWS S3 상세이미지 ", detailImgLocation);
          setAwsDetailImgAddress(detailImgLocation);
        } catch (err) {
          console.error("AWS S3 업로드 실패 : ", err);
        }
      };

      filesArray.forEach((file) => {
        const reader = new FileReader();

        reader.onload = (e) => {
          // 파일을 읽은 후 실행할 코드를 정의
          const image = new Image();
          image.onload = () => {
            const width = image.width;
            // console.log(width);
            if (width < 900) {
              toast.error("이미지의 가로길이는 최소 900px 이상이어야 합니다. ");
              setPreDetailViewUrls([]);
              // setDetailImageFiles([]);
            } else {
              validFiles.push(file);
            }
            checkFiles++;

            // 모든 파일 검증이 끝난 후 업로드
            if (checkFiles === filesArray.length) {
              if (validFiles.length === filesArray.length) {
                uploadToS3(filesArray);
              }
            }
          };

          if (e.target && typeof e.target.result === "string") {
            image.src = e.target.result; // 이미지 객체가 파일 내용을 로드하게
          }
        };
        reader.readAsDataURL(file); // 실제로 파일을 읽어 onload 실행
      });

      // setDetailImageFiles(newImageFiles);

      const newPreviewUrls = [...predetailViewUrls];

      filesArray.forEach((file) => {
        const image = window.URL.createObjectURL(file);
        // 생성된 미리보기URL을 임시 배열에 추가
        newPreviewUrls.push(image);
        setPreDetailViewUrls(newPreviewUrls);
        // if (newPreviewUrls.length === newImageFiles.length) {
        //   setPreDetailViewUrls(newPreviewUrls);
        // }
      });
    }
  };

  const handleClickDefaultImage = () => {
    if (imgRef.current) {
      imgRef.current.click();
    }
  };
  const handleClickDefaultDetailImage = () => {
    if (imgDetailRef.current) {
      imgDetailRef.current.click();
    }
  };
  const handleDeleteImage = () => {
    setImgUrl("");
    // setImgFile(null);
  };
  const handleDeleteDetailImage = (index: number) => {
    const newImageFiles = awsDetailImgAddress.filter(
      (_, fileIndex) => fileIndex !== index
    );
    setAwsDetailImgAddress(newImageFiles);

    const newPreviewUrls = predetailViewUrls.filter(
      (_, urlIndex) => urlIndex !== index
    );
    setPreDetailViewUrls(newPreviewUrls);
  };

  const handleClickSubmitButton = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (imgUrl === null) {
      toast.error("상품이미지를 등록해주세요");
      return false;
    }
    if (!productName) {
      toast.error("상품 이름을 등록해주세요");
      return false;
    }

    if (!productPrice) {
      toast.error("상품 가격을 등록해주세요");
      return false;
    }
    if (!productintroduce) {
      toast.error("상품 설명을 등록해주세요");
      return false;
    }
    if (categoryCheckedList.length === 0) {
      toast.error("카테고리를 등록해주세요");
      return false;
    }
    if (predetailViewUrls.length === 0) {
      toast.error("상품상세이미지를 등록해주세요");
      return false;
    }

    try {
      const categoryCheckedId = categoryCheckedList.map((prev) => prev.id);
      const categoryIndex = categoryCheckedId[0];
      console.log("categoryIndex ", categoryIndex);

      const data = {
        name: productName,
        price: productPrice,
        introduce: productintroduce,
        categoryIndex: categoryIndex,
        image: awsImgAddress,
        detailImage: awsDetailImgAddress,
      };
      console.log("data ", data);
      const response = await api.post("/manager/product", data);
      console.log("response data ", response.data);

      if (response.status === 200) {
        toast.success("상품 등록이 완료되었습니다.");
      }
    } catch (error) {
      const err = error as AxiosError;
      if (err.response?.status === 404) {
        console.log("상품 등록을 실패했습니다. 다시 시도해 주세요. ", err);
      } else if (err.response?.status === 500) {
        console.log("internal error ", err);
      }
    }
  };

  const getCategory = async () => {
    try {
      const response = await api.get("/manager/category");
      if (response.status === 200) {
        // console.log("프론트 카테고리 가져오기 성공", response.data.data);
        const category = response.data.data[0].name;
        setCategories(category);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getCategory();
  }, []);
  return (
    <>
      <div className={styles.body}>
        <div className={styles.main}>
          <h1>상품등록</h1>
          <div className={styles.buttonContainer}>
            <Button className={styles.button} label="프로필 수정"></Button>
            <Button className={styles.button} label="상품 등록"></Button>
            <Button className={styles.button} label="상품 조회"></Button>
          </div>
        </div>
        <div className={styles.addProduct}>
          <section className={styles.addProductInfo}>
            <div className={styles.addProductPhoto}>
              <label>상품이미지</label>
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
                <label>상품이름</label>
                <input
                  type="text"
                  placeholder="상품이름"
                  onChange={handleChangeName}
                  value={productName}
                />
              </div>
              <div className={styles.input}>
                <label>가격</label>
                <input
                  type="text"
                  placeholder="가격"
                  onChange={handleChangePrice}
                  value={productPrice}
                />
              </div>
            </div>
            <div className={styles.input}>
              <label>상품설명</label>
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
                      (prev) => prev.item === item
                    )}
                    onChange={(e) => handleCheckedCategory(e, item, index)}
                  />
                  <Input.Label htmlFor={item}>{item}</Input.Label>
                </div>
              ))}
            </div>
            <div className={styles.input}>
              <label>상품상세이미지</label>
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
                  <div key={i}>
                    <img
                      className={styles.addProductPhotoDetailImg}
                      src={url}
                      alt={`Image preview ${i + 1}`}
                    />
                    <div
                      className={styles.overlayDetail}
                      onClick={() => handleDeleteDetailImage(i)}
                    >
                      <p className={styles.deleteImg}>삭제</p>
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

export default AddProductPage;
