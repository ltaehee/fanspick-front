import styles from "../../css/homepage.module.css";
import FavoritesBtn from "./FavoritesBtn";
// import emptyHeart from "/icons/favoritIcon.svg";

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
      <div className={styles.imgBox}>
        <img src={imageUrl} alt="상품 이미지" className={styles.productImage} />
        {/* <img
          src={emptyHeart}
          alt="즐겨찾기 아이콘"
          className={styles.favoritImage}
        /> */}
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
