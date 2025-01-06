import ProductCard from "../../components/product/ProductCard";
import styles from "../../css/homepage.module.css";
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
    title: "그립톡 1",
    price: "10,000원",
    imageUrl: dummyImg1,
  },
  {
    id: 2,
    title: "그립톡 2",
    price: "20,000원",
    imageUrl: dummyImg2,
  },
  {
    id: 3,
    title: "그립톡 3",
    price: "30,000원",
    imageUrl: dummyImg3,
  },
  {
    id: 4,
    title: "그립톡 4",
    price: "15,000원",
    imageUrl: dummyImg1,
  },
];

const GriptokCategory = () => {
  return (
    <div className={styles.container}>
      <h2>이달의 한정판 굿즈</h2>
      <h1>그립톡 카테고리</h1>
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

export default GriptokCategory;
