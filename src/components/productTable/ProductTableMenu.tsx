import { ChangeEvent, createContext, Dispatch, FC, ReactNode, SetStateAction, useEffect, useState } from "react";
import axios from "axios";
import ProductQuantity from "./ProductQuantity";
import ProductCheckBox from "./productCheckBox";

interface TableMenu {
    className?: string;
    children: ReactNode;
}

interface TableMenuCompoundProps {
    Quantity: typeof ProductQuantity;
}

interface Product {
    id: string;
    name: string;
    price: string;
    image: string;
}

interface TableMenuContextProps {
    isQuantity: number;
    setIsQuantity: Dispatch<SetStateAction<number>>;
    isSelected : Array<string>;
    setIsSelected: Dispatch<SetStateAction<Array<string>>>;
    handleDown: () => void;
    handleUp: () => void;
    handleCheckBoxChange: (e: ChangeEvent<HTMLInputElement> , productId: string)=> void;
    handleDeleteItem: (productId: string) => void;
}

export const TableMenuContext = createContext<TableMenuContextProps>({
    isQuantity: 0,
    setIsQuantity: () => {},
    isSelected: [],
    setIsSelected: () => {},
    handleDown: () => {},
    handleUp: () => {},
    handleCheckBoxChange: () => {},
    handleDeleteItem: () => {}
})

const ProductTableMenu: FC<TableMenu> & TableMenuCompoundProps = (props) => {
    const {children, className} = props;
    const [productInCart,setProductInCart] = useState<Product[]>([]);
    const [isQuantity, setIsQuantity] = useState<number>(0);
    const [isSelected, setIsSelected] = useState<string[]>([])

    const getProductData = async() => {  //장바구니 목록 가져오기
        try{
            const response = await axios.get('/');
            console.log(response.data);
            setProductInCart(response.data);
            setIsQuantity(response.data);
        }catch(err) {
            console.error('데이터 가져오기 실패', err);
        }
    };

    useEffect(() => {
        // getProductData();
    },[]);



    // 수량 빼기
    const handleDown = async() => {  
        if(isQuantity === 0) {
            return;
        }else{
            setIsQuantity((prev) => (prev - 1));
        }

        const response = await axios.put('/', isQuantity);
        console.log(response);
    }

    // 수량 더하기
    const handleUp = async() => { 
        setIsQuantity((prev) => (prev + 1));
        const response = await axios.put('/', isQuantity);
        console.log(response);
    }

    //체크박스 선택, 삭제
    const handleCheckBoxChange = (e: ChangeEvent<HTMLInputElement>,productId: string) => {
        const isChecked = e.target.checked;
        setIsSelected((prev) => isChecked ? [...prev, productId] : prev.filter((id) => id !== productId));
    }

    //장바구니 아이템 삭제 버튼
    const handleDeleteItem = (productId: string) => {
        setProductInCart((prev) => prev.filter((product) => product.id !== productId));
    }


    return(
        <TableMenuContext.Provider value={{isQuantity, setIsQuantity,handleDown, handleUp, isSelected, setIsSelected, handleCheckBoxChange, handleDeleteItem}}>
            <div>
                {productInCart.map((product) => (
                    <div key={product.id}>
                        <img src={product.image} className={className}/>
                        <p>{product.name}</p>
                        <p>{product.price}</p>
                        <ProductCheckBox productId={product.id}/>
                        {children}
                    </div>
                ))}
            </div>
        </TableMenuContext.Provider>
    )
}

ProductTableMenu.Quantity = ProductQuantity;

export default ProductTableMenu;