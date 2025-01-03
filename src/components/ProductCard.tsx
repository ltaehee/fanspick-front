import styles from "../css/homepage.module.css";

interface ProductCardProps {
  imageUrl: string;
  title: string;
  price: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  imageUrl,
  title,
  price,
}) => {
  return (
    <div className={styles.productCard}>
      <img src={imageUrl} alt={title} className={styles.productImage} />
      <div className={styles.cardTextBox}>
        <h3>{title}</h3>
        <p>{price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
