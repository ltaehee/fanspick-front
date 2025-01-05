import { useContext } from "react"
import { TableMenuContext } from "./ProductTableMenu"

const ProductQuantity = () => {
    const {handleDown, handleUp, isQuantity} = useContext(TableMenuContext);

    return(
        <div>
            <button onClick={handleDown}>-</button>
            <p>{isQuantity}</p>
            <button onClick={handleUp}>+</button>
        </div>
    )
}

export default ProductQuantity;