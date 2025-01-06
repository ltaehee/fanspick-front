import { useNavigate } from "react-router-dom";
import styles from "../../css/homepage.module.css";
import FavoritesBtn from "./FavoritesBtn";

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
  const navigate = useNavigate();

  return (
    <div className={styles.productCard} onClick={() => navigate(`/product`)}>
      <div className={styles.imgBox}>
        <img src={imageUrl} alt="상품 이미지" className={styles.productImage} />
        <FavoritesBtn className={styles.favoritImage} />
      </div>
      <div className={styles.cardTextBox}>
        <h3>{title}</h3>
        <p>{price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
