import { useNavigate } from 'react-router-dom';
import styles from '../../css/product/product.module.css';
import FavoritesBtn from './FavoritesBtn';

interface ProductProps {
  _id: string;
  name: string;
  price: string;
  image: string;
  category?: {
    name: string[];
  };
}
const ProductCard: React.FC<ProductProps> = ({ image, name, price, _id }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/product`);
  };

  return (
    <div className={styles.productCard} onClick={handleCardClick}>
      <div className={styles.imgBox}>
        <img src={image} alt="상품 이미지" className={styles.productImage} />
        <FavoritesBtn
          className={styles.favoritImage}
          _id={_id}
          name={name}
          price={price}
          image={image}
        />
      </div>
      <div className={styles.cardTextBox}>
        <h3>{name}</h3>
        <p>{price}원</p>
      </div>
    </div>
  );
};

export default ProductCard;
