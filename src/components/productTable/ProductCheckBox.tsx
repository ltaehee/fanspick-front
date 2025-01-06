import { ChangeEvent, useContext } from "react";
import { TableMenuContext } from "./ProductTableMenu";

interface ProductCheckBoxProps {
    productId: string;
}

const ProductCheckBox = ({productId} : ProductCheckBoxProps) => {
    const {handleCheckBoxChange, isSelected} = useContext(TableMenuContext);

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        handleCheckBoxChange(e,productId);
    }
    return(
        <div>
            <input type="checkbox"
             checked={isSelected.includes(productId)} //선택한 상품이 체크 되어있으면 true, 체크 안되어있으면 false
             onChange={handleChange}
             />
            <button>삭제</button>
        </div>
    )
}

export default ProductCheckBox;