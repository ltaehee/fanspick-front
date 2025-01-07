import { useContext } from "react"
import { TableMenuContext } from "./ProductTableMenu"
import styles from '../../css/productTable/productTableMenu.module.css';
import TableStyles from '../../css/productTable/productTable.module.css';
import { Button } from "ys-project-ui";

interface ProductQuantityProps {
    quantity : string;
}

const ProductQuantity = ({quantity} : ProductQuantityProps) => {
    const {handleDown, handleUp} = useContext(TableMenuContext);

    return(
        <div className={styles.children}>
            <div className={TableStyles.quantity_wrap}>
                <Button label={'-'} onClick={handleDown} type={'button'} className={TableStyles.quantityButton}/>
                <p className={TableStyles.quantity_p}>{quantity}</p>
                <Button label={'+'} onClick={handleUp} type={'button'} className={TableStyles.quantityButton}/>
            </div>
        </div>
    )
}

export default ProductQuantity;