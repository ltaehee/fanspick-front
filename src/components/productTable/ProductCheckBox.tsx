import { ChangeEvent, useContext } from "react";
import { TableMenuContext } from "./ProductTableMenu";
import styles from '../../css/productTable/productTable.module.css';

interface ProductCheckBoxProps {
    productId: string;
}

const ProductCheckBox = ({productId} : ProductCheckBoxProps) => {
    const {handleCheckBoxChange, isSelected, handleDeleteItem} = useContext(TableMenuContext);

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        handleCheckBoxChange(e,productId);
    }

    const handleClick = () => {
        handleDeleteItem(productId);
    }
    return(
        <div className={styles. checkbox_wrap}>
            <input type="checkbox"
             checked={isSelected.includes(productId)} //선택한 상품이 체크 되어있으면 true, 체크 안되어있으면 false
             onChange={handleChange}
             />
            <button onClick={handleClick} className={styles.checkbox_button}>삭제</button>
        </div>
    )
}

export default ProductCheckBox;