import ProductCard from "../../../components/product/ProductCard";
import styles from "../../../css/homepage.module.css";
import { products } from "../../HomePage";

const StationeryCategory = () => {
  return (
    <div className={styles.container}>
      <h1>문구 카테고리</h1>
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

export default StationeryCategory;
