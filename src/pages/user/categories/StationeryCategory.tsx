import ProductCard from "../../../components/product/ProductCard";
import styles from "../../../css/homepage.module.css";
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
    title: "문구 1",
    price: "10,000원",
    imageUrl: dummyImg1,
  },
  {
    id: 2,
    title: "문구 2",
    price: "20,000원",
    imageUrl: dummyImg2,
  },
  {
    id: 3,
    title: "문구 3",
    price: "30,000원",
    imageUrl: dummyImg3,
  },
  {
    id: 4,
    title: "문구 4",
    price: "15,000원",
    imageUrl: dummyImg1,
  },
];

const StationeryCategory = () => {
  return (
    <div className={styles.container}>
      <h1>문구 카테고리</h1>
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

export default StationeryCategory;
