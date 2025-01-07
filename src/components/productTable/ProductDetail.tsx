import { FC } from 'react';
import styles from '../../css/productTable/productTableMenu.module.css';

interface ProductDetailProps {
    image?: string;
    onClick?: () => void;
    productName: string;
    review: string;
}

const ProductDetail: FC<ProductDetailProps> = (props) => {
    const {image, onClick, productName,review} = props;

    return (
        <div className={styles.detail}>
            <img src={image} className={styles.image}/>
            <div>
                <p>{productName}</p>
                <a onClick={onClick}>{review}</a>
            </div>
        </div>
    )
}

export default ProductDetail;