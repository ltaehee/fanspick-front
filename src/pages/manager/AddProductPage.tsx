import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from "react";
import styles from "../../css/manager/addProductPage.module.css";
import { Button, ImageUpload, Input } from "ys-project-ui";
import { AxiosError } from "axios";
import addImg from "/icons/addImg.png";
import api from "../../utils/api";
// import { api } from "../utils/api";

interface CheckedCategory {
  id: number;
  item: string;
}

// const categories = [
//   { id: 1, item: "그립톡" },
//   { id: 2, item: "키링" },
//   { id: 3, item: "의류" },
//   { id: 4, item: "문구" },
//   { id: 5, item: "케이스" },
// ];

const AddProductPage = () => {
  const [categories, setCategories] = useState([]);
  const [productName, setproductName] = useState(""); // 상품이름
  const [productPrice, setproductPrice] = useState(""); // 상품가격
  const [productintroduce, setProductIntroduce] = useState(""); // 상품설명
  const [categoryCheckedList, setCategoryCheckedList] = useState<
    CheckedCategory[]
  >([]);
  const [imgUrl, setImgUrl] = useState<string>(""); // 상품이미지
  const [imgFile, setImgFile] = useState<File | null>(null); // 상품이미지파일
  const [detailImageFiles, setDetailImageFiles] = useState<File[]>([]); // 상세이미지 파일
  const [predetailViewUrls, setPreDetailViewUrls] = useState<string[]>([]); // 상세이미지 미리보기 url
  const imgRef = useRef<HTMLInputElement>(null);
  const imgDetailRef = useRef<HTMLInputElement>(null);

  console.log("카테고리 ", categoryCheckedList);
  // console.log("상품상세이미지파일 ", detailImageFiles);
  // console.log("상품상세이미지 ", predetailViewUrls);

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
      setImgFile(file);

      const reader = new FileReader();

      reader.onload = (e) => {
        // 파일을 읽은 후 실행할 코드를 정의
        const image = new Image();
        image.onload = () => {
          const width = image.width;
          const height = image.height;
          console.log(width, height);
          if (width !== height) {
            alert("이미지의 크기는 가로 세로 길이가 같아야 합니다.");
            setImgUrl("");
            setImgFile(null);
          }
        };
        if (e.target && typeof e.target.result === "string") {
          image.src = e.target.result; // 이미지 객체가 파일 내용을 로드하게
        }
      };
      reader.readAsDataURL(file); // 실제로 파일을 읽어 onload 실행
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

  const handleAddDetailImages = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).slice(0, 5);

      // 기존 이미지 파일에 새로운 파일추가
      const newImageFiles = [...detailImageFiles, ...filesArray];
      if (newImageFiles.length > 3) {
        alert("숙소 이미지는 최대 3개까지 등록가능합니다.");
        return;
      }

      filesArray.forEach((file) => {
        const reader = new FileReader();

        reader.onload = (e) => {
          // 파일을 읽은 후 실행할 코드를 정의
          const image = new Image();
          image.onload = () => {
            const width = image.width;
            // console.log(width);
            if (width < 900) {
              alert("이미지의 가로길이는 최소 900px 이상이어야 합니다. ");
              setPreDetailViewUrls([]);
              setDetailImageFiles([]);
            }
          };
          if (e.target && typeof e.target.result === "string") {
            image.src = e.target.result; // 이미지 객체가 파일 내용을 로드하게
          }
        };
        reader.readAsDataURL(file); // 실제로 파일을 읽어 onload 실행
      });

      setDetailImageFiles(newImageFiles);

      const newPreviewUrls = [...predetailViewUrls];

      filesArray.forEach((file) => {
        const image = window.URL.createObjectURL(file);
        // 생성된 미리보기URL을 임시 배열에 추가
        newPreviewUrls.push(image);
        if (newPreviewUrls.length === newImageFiles.length) {
          setPreDetailViewUrls(newPreviewUrls);
        }
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
    setImgFile(null);
  };
  const handleDeleteDetailImage = (index: number) => {
    const newImageFiles = detailImageFiles.filter(
      (_, fileIndex) => fileIndex !== index
    );
    setDetailImageFiles(newImageFiles);

    const newPreviewUrls = predetailViewUrls.filter(
      (_, urlIndex) => urlIndex !== index
    );
    setPreDetailViewUrls(newPreviewUrls);
  };

  const handleClickSubmitButton = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (imgFile === null) {
      alert("상품이미지를 등록해주세요");
      return false;
    }
    if (!productName) {
      alert("상품 이름을 등록해주세요");
      return false;
    }

    if (!productPrice) {
      alert("상품 가격을 등록해주세요");
      return false;
    }
    if (!productintroduce) {
      alert("상품 설명을 등록해주세요");
      return false;
    }
    if (categoryCheckedList.length === 0) {
      alert("카테고리를 등록해주세요");
      return false;
    }
    if (detailImageFiles.length === 0) {
      alert("상품상세이미지를 등록해주세요");
      return false;
    }

    try {
      const categoryCheckedId = categoryCheckedList.map((prev) => prev.id);
      console.log("categoryCheckedId ", JSON.stringify(categoryCheckedId));
      const formData = new FormData();
      formData.append("imageFile", imgFile);
      formData.append("name", productName);
      formData.append("price", productPrice);
      formData.append("introduce", productintroduce);
      if (detailImageFiles) {
        detailImageFiles.forEach((detailImageFiles) =>
          formData.append("detailImage", detailImageFiles)
        );
      }
      formData.append("category", JSON.stringify(categoryCheckedId));

      // const response = await api.post("/product/add", formData);
      // console.log("response data ", response.data);

      // if (response.status === 200) {
      //   alert("상품 등록이 완료되었습니다.");
      // }
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
        console.log("프론트 카테고리 가져오기 성공", response.data.data);
        const category = response.data.data[0].name;
        setCategories(category);
        console.log(categories);
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
