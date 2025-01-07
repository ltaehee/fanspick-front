import styles from '../../css/productTable/productTableMenu.module.css';

interface ProductPriceProps {
    price: string;
}

const ProductPrice = ({price} : ProductPriceProps) => {
    return(
        <div className={styles.price}>
            <p>{price}</p>
        </div>
    )
}

export default ProductPrice;