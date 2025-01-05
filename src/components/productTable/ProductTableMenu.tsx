import { createContext, Dispatch, FC, ReactNode, SetStateAction, useEffect, useState } from "react";
import axios from "axios";
import ProductQuantity from "./ProductQuantity";

interface TableMenu {
    className?: string;
    children: ReactNode;
    handleDelete?: () => void;
}

interface TableMenuCompoundProps {
    Quantity: typeof ProductQuantity;
}

interface Product {
    name: string;
    price: string;
    image: string;
}

interface TableMenuContextProps {
    isQuantity: number;
    setIsQuantity: Dispatch<SetStateAction<number>>;
    handleDown: () => void;
    handleUp: () => void;
}

export const TableMenuContext = createContext<TableMenuContextProps>({
    isQuantity: 0,
    setIsQuantity: () => {},
    handleDown: () => {},
    handleUp: () => {},
})

const ProductTableMenu: FC<TableMenu> & TableMenuCompoundProps = (props) => {
    const {children, className, handleDelete} = props;
    const [productInCart,setProductInCart] = useState<Product>({name:'', price:'', image:''});
    const [isQuantity, setIsQuantity] = useState<number>(0);

    const getProductData = async() => {  //장바구니 목록 가져오기
        try{
            const response = await axios.get('/');
            console.log(response.data);
            setProductInCart(response.data);
        }catch(err) {
            console.error('데이터 가져오기 실패', err);
        }
    };

    useEffect(() => {
        getProductData();
    },[]);



    // 수량 빼기
    const handleDown = () => { 
        if(isQuantity === 0) {
            return;
        }else{
            setIsQuantity((prev) => (prev - 1));
        }
    }


    // 수량 더하기
    const handleUp = () => { 
        setIsQuantity((prev) => (prev + 1));
    }


    return(
        <TableMenuContext.Provider value={{isQuantity, setIsQuantity,handleDown, handleUp}}>
            <div>
                <input type="checkbox"/>
                <button onClick={handleDelete}>삭제</button>
            </div>
            <div>
                <img src={productInCart.image} className={className}/>
                <p>{productInCart.name}</p>
                <p>{productInCart.price}</p>
                {children}
            </div>
        </TableMenuContext.Provider>
    )
}

ProductTableMenu.Quantity = ProductQuantity;

export default ProductTableMenu;