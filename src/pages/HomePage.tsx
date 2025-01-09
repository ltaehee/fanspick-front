import styles from "../css/homepage.module.css";
import ProductCard from "../components/product/ProductCard";
import dummyImg1 from "/images/product/dog1.jpg";
import dummyImg2 from "/images/product/dog2.jpg";
import dummyImg3 from "/images/product/pet2.jpg";

interface Product {
  id: number;
  imageUrl: string;
  title: string;
  price: string;
}

export const products: Product[] = [
  {
    id: 1,
    title: "상품 1",
    price: "10,000원",
    imageUrl: dummyImg1,
  },
  {
    id: 2,
    title: "상품 2",
    price: "20,000원",
    imageUrl: dummyImg2,
  },
  {
    id: 3,
    title: "상품 3",
    price: "30,000원",
    imageUrl: dummyImg3,
  },
  {
    id: 4,
    title: "상품 4",
    price: "15,000원",
    imageUrl: dummyImg1,
  },
  {
    id: 5,
    title: "상품 4",
    price: "15,000원",
    imageUrl: dummyImg2,
  },
  {
    id: 6,
    title: "상품 4",
    price: "15,000원",
    imageUrl: dummyImg3,
  },
];

const HomePage = () => {
  return (
    <div className={styles.container}>
      <h2>이달의 한정판 굿즈</h2>
      <h1>
        한정 수량으로 준비된 이달의 인기 굿즈!
        <br />
        이달만 만날 수 있는 특별한 굿즈를 확인하세요.
      </h1>
      <div className={styles.productListWrap}>
        {products.map((product) => (
          <ProductCard
            id={product.id}
            imageUrl={product.imageUrl}
            title={product.title}
            price={product.price}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
