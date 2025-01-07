import { useContext } from "react"
import { TableMenuContext } from "./ProductTableMenu"
import TableStyles from '../../css/productTable/productTable.module.css';
import { Button } from "ys-project-ui";

const ProductQuantity = () => {
    const {handleDown, handleUp, isQuantity} = useContext(TableMenuContext);

    return(
        <div className={TableStyles.quantity_wrap}>
            <Button label={'-'} onClick={handleDown} type={'button'} className={TableStyles.quantityButton}/>
            <p className={TableStyles.quantity_p}>{isQuantity}</p>
            <Button label={'+'} onClick={handleUp} type={'button'} className={TableStyles.quantityButton}/>
        </div>
    )
}

export default ProductQuantity;