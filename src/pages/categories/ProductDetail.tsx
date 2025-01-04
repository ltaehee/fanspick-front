import styles from "../css/homepage.module.css";

const ProductDetail = () => {
  return (
    <div className={styles.container}>
      <h2>이달의 한정판 굿즈</h2>
      <h1>
        한정 수량으로 준비된 이달의 인기 굿즈!
        <br />
        이달만 만날 수 있는 특별한 굿즈를 확인하세요.
      </h1>
      <div className={styles.productListWrap}></div>
    </div>
  );
};

export default ProductDetail;
