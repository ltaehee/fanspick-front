import styles from "../../../css/product.module.css";

/* const mockProducts = [
  {
    id: 1,
    title: "상품 1",
    price: "10,000원",
    description: "이 상품은 한정판입니다.",
    imageUrl: "/images/product/dog1.jpg",
  },
  {
    id: 2,
    title: "상품 2",
    price: "20,000원",
    description: "인기 있는 굿즈 상품입니다.",
    imageUrl: "/images/product/dog2.jpg",
  },
  {
    id: 3,
    title: "상품 3",
    price: "30,000원",
    description: "특별한 디자인의 상품입니다.",
    imageUrl: "/images/product/pet2.jpg",
  },
]; */

const Product = () => {
  /* const { id } = useParams<{ id: string }>();

  const product = mockProducts.find((item) => item.id === Number(id));

  if (!product) {
    return <div>상품 정보를 찾을 수 없습니다.</div>;
  } */
  return (
    <div className={styles.container}>
      <h2>이달의 한정판 굿즈</h2>
      <h1>
        한정 수량으로 준비된 이달의 인기 굿즈!
        <br />
        이달만 만날 수 있는 특별한 굿즈를 확인하세요.
      </h1>
    </div>
  );
};

export default Product;
