import { useState } from "react";
import styles from "../../css/product/productDetail.module.css";

const ProductCount = ({ initialCount = 1 }: { initialCount?: number }) => {
  const [count, setCount] = useState(initialCount);

  const increaseCount = () => setCount((prev) => prev + 1);
  const decreaseCount = () => setCount((prev) => (prev > 1 ? prev - 1 : prev));

  return (
    <div className={styles.productCount}>
      <button onClick={decreaseCount}>-</button>
      <span>{count}</span>
      <button onClick={increaseCount}>+</button>
    </div>
  );
};

export default ProductCount;
