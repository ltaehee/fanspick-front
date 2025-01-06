import ProductCard from "../../../components/product/ProductCard";
import styles from "../../../css/header.module.css";
import dummyImg1 from "/images/product/dog1.jpg";
import dummyImg2 from "/images/product/dog2.jpg";
import dummyImg3 from "/images/product/pet2.jpg";

interface Product {
  id: number;
  imageUrl: string;
  title: string;
  price: string;
}

const products: Product[] = [
  {
    id: 1,
    title: "인형 1",
    price: "10,000원",
    imageUrl: dummyImg1,
  },
  {
    id: 2,
    title: "인형 2",
    price: "20,000원",
    imageUrl: dummyImg2,
  },
  {
    id: 3,
    title: "인형 3",
    price: "30,000원",
    imageUrl: dummyImg3,
  },
  {
    id: 4,
    title: "인형 4",
    price: "15,000원",
    imageUrl: dummyImg1,
  },
];

const LifestyleCategory = () => {
  return (
    <div className={styles.container}>
      <h2>이달의 한정판 굿즈</h2>
      <h1>생활 카테고리</h1>
      <div className={styles.productListWrap}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            imageUrl={product.imageUrl}
            title={product.title}
            price={product.price}
          />
        ))}
      </div>
    </div>
  );
};

export default LifestyleCategory;
