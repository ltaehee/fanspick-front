import { useParams } from "react-router-dom";
import styles from "../../../css/product/productDetail.module.css";
import dummyImg2 from "/images/product/dog2.jpg";
import dummyImg3 from "/images/product/dogDetail1.png";
import { Button, Tabs } from "ys-project-ui";
import { useState } from "react";
import ProductCount from "../../../components/product/ProductCount";
import ReviewBox from "../../../components/review/ReviewBox";
import profileImg from "/icons/user_icon.png";

const mockProduct = {
  id: 1,
  title: "상품12321",
  price: "100,000원",
  description:
    "한정 수량으로 준비된 이달의 인기 굿즈! 이달만 만날 수 있는 특별한 굿즈를 확인하세요.상품 설명 부분입니다~~~~~~~~~~~~~상품 설명 부분입니다~~~~~~~~~~~~~상품 설명 부분입니다~~~~~~~~~~~~~",
  imageUrl: dummyImg2,
  detailImage: dummyImg3,
};

const mockReviews = [
  {
    profileImg: profileImg,
    username: "이 * 희",
    productName: "강아지 그립톡",
    productImg: dummyImg2,
    reviewContent:
      "그립톡 정말 좋아요! 그립톡 정말 좋아요!그립톡 정말 좋아요!그립톡 정말 좋아요!",
  },
  {
    profileImg: profileImg,
    username: "이 * 희",
    productName: "고양이 그립톡",
    productImg: dummyImg2,
    reviewContent: "그립톡 정말 좋아요!그립톡 정말 좋아요!그립톡 정말 좋아요!",
  },
];

const ProductDetail = () => {
  /* const { id } = useParams<{ id: string }>();

  const product = mockProducts.find((item) => item.id === Number(id));

  if (!product) {
    return <div>상품 정보를 찾을 수 없습니다.</div>;
  } */
  const [activeTab, setActiveTab] = useState(0);
  const onChangeTab = (index: number) => {
    setActiveTab(index);
  };
  return (
    <div className={styles.container}>
      <div className={styles.productDetailWrapper}>
        {/* 상품 이미지 */}
        <div className={styles.productImageBox}>
          <img
            src={mockProduct.imageUrl}
            alt="상품 이미지"
            className={styles.productImage}
          />
        </div>
        {/* 상품 정보 */}
        <div className={styles.productInfoBox}>
          <h1 className={styles.productTitle}>{mockProduct.title}</h1>
          <p className={styles.productPrice}>{mockProduct.price}</p>
          <p className={styles.productDescription}>{mockProduct.description}</p>
          <ProductCount />
          <Button label="구매하기" className={styles.buyButton} />
          <div className={styles.secondBtnWrap}>
            <Button label="장바구니" />
            <Button label="즐겨찾기" />
          </div>
        </div>
      </div>
      <Tabs
        onChangeTab={onChangeTab}
        defaultTabIndex={0}
        className={styles.tabs}
      >
        <Tabs.MenuList className={styles.tabsMenuList}>
          <Tabs.Menu
            className={`${styles.tabsMenu} ${
              activeTab === 0 ? styles.active : ""
            }`}
          >
            설명
          </Tabs.Menu>
          <Tabs.Menu
            className={`${styles.tabsMenu} ${
              activeTab === 1 ? styles.active : ""
            }`}
          >
            리뷰
          </Tabs.Menu>
          <Tabs.Menu
            className={`${styles.tabsMenu} ${
              activeTab === 2 ? styles.active : ""
            }`}
          >
            문의사항
          </Tabs.Menu>
        </Tabs.MenuList>
        <Tabs.Pannel className={styles.tabsPannel}>
          <img
            src={mockProduct.detailImage}
            className={styles.detailImage}
            alt="상품 상세 이미지"
          />
        </Tabs.Pannel>
        <Tabs.Pannel>
          <div className={styles.reviewListWrap}>
            {mockReviews.map((review, index) => (
              <ReviewBox
                key={index}
                profileImg={review.profileImg}
                username={review.username}
                productName={review.productName}
                productImg={review.productImg}
                reviewContent={review.reviewContent}
              />
            ))}
          </div>
        </Tabs.Pannel>
        <Tabs.Pannel className={styles.tabsPannel}>
          문의사항은 임시로 넣어놨습니다~~
        </Tabs.Pannel>
      </Tabs>
    </div>
  );
};

export default ProductDetail;
