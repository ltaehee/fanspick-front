import { useNavigate } from "react-router-dom";
import styles from "../../css/product/product.module.css";
import FavoritesBtn from "./FavoritesBtn";

interface ProductCardProps {
  imageUrl: string;
  title: string;
  price: string;
  id: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  imageUrl,
  title,
  price,
  id,
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/product`);
  };

  return (
    <div className={styles.productCard} onClick={handleCardClick}>
      <div className={styles.imgBox}>
        <img src={imageUrl} alt="상품 이미지" className={styles.productImage} />
        <FavoritesBtn className={styles.favoritImage} productId={id} />
      </div>
      <div className={styles.cardTextBox}>
        <h3>{title}</h3>
        <p>{price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
