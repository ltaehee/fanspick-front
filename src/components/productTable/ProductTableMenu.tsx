import { ChangeEvent, createContext, Dispatch, FC, ReactNode, SetStateAction, useEffect, useState } from "react";
import axios from "axios";
import ProductQuantity from "./ProductQuantity";
import ProductCheckBox from "./ProductCheckBox";
import ProductDetail from "./ProductDetail";
import ProductPrice from "./ProductPrice";

interface TableMenu {
    className?: string;
    children: ReactNode;
}

interface TableMenuCompoundProps {
    Quantity: typeof ProductQuantity;
    Detail: typeof ProductDetail;
    Price: typeof ProductPrice;
    CheckBox: typeof ProductCheckBox;
}

interface Product {
    id: string;
    name: string;
    price: string;
    image: string;
}

interface TableMenuContextProps {
    isQuantity: number; //수량
    setIsQuantity: Dispatch<SetStateAction<number>>;
    isSelected : Array<string>; //체크박스 선택한 아이템 배열
    setIsSelected: Dispatch<SetStateAction<Array<string>>>;
    handleDown: () => void; // 수량 빼기
    handleUp: () => void; // 수량 더하기
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
    handleDeleteItem: () => {},
});

const ProductTableMenu: FC<TableMenu> & TableMenuCompoundProps = (props) => {
    const {children, className} = props;
    const [productInCart,setProductInCart] = useState<Product[]>([]); //local에서 가져오는 장바구니에 담은 상품 
    const [isQuantity, setIsQuantity] = useState<number>(0);
    const [isSelected, setIsSelected] = useState<string[]>([]); // 장바구니에서 체크박스 선택한 아이템 배열



    //아이템 목록 가져오기 ->localstorage에서 가져오는 걸로 수정하기
    const getProductData = async() => {  
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

    //장바구니 아이템 전체 선택
    const handleSelectAll = () => {
        if(isSelected.length === cart.length) {
            setIsSelected([]);
        } else {
            setIsSelected(cart.map((product) => product.id));
        }
    }

    //장바구니에서 체크한 아이템 삭제
    const handleDeleteSelected = () => {
        setCart((prevcart) => prevcart.filter((product) => !isSelected.includes(product.id)));
    }

    //장바구니 선택한 하나의 아이템 삭제 버튼
    const handleDeleteItem = (productId: string) => {
        setProductInCart((prev) => prev.filter((product) => product.id !== productId));
    }


    //예시 데이터
    const [cart, setCart] = useState([
        {
            id: "1",
            name: "상품 A",
            price: "10,000원",
            image: "/images/productA.jpg",
        },
        {
            id: "2",
            name: "상품 B",
            price: "20,000원",
            image: "/images/productB.jpg",
        },
        {
            id: "3",
            name: "상품 C",
            price: "30,000원",
            image: "/images/productC.jpg",
        },
    ]);


    return(
        <TableMenuContext.Provider value={{isQuantity, setIsQuantity,handleDown, handleUp, isSelected, setIsSelected, handleCheckBoxChange, handleDeleteItem}}>
            {children}
        </TableMenuContext.Provider>
    )
}

ProductTableMenu.Quantity = ProductQuantity;
ProductTableMenu.Detail = ProductDetail;
ProductTableMenu.Price = ProductPrice;
ProductTableMenu.Quantity = ProductQuantity;
ProductTableMenu.CheckBox = ProductCheckBox;

export default ProductTableMenu;