import MypageHeader from "../../../components/categories/MypageCategories";
import styles from '../../../css/mypage/mypage.module.css';
import QuantityButton from "../../../components/productTable/QuantityButton";
import { useState } from "react";



const MypageBookmark = () => {
    const [isQuantity,setIsQuantity] = useState(0);
    const [isSelected, setIsSelected] = useState<{ id: string; name: string; price: string; image: string; quantity: number }[]>([
        {
            id: "1",
            name: "상품 A",
            price: "10,000원",
            image: "/images/productA.jpg",
            quantity: 1
        },
        {
            id: "2",
            name: "상품 B",
            price: "20,000원",
            image: "/images/productB.jpg",
            quantity: 1
        },
    ]);
    

    const [cart, setCart] = useState<{ id: string; name: string; price: string; image: string; quantity: number }[]>([
        {
            id: "1",
            name: "상품 A",
            price: "10,000원",
            image: "/images/productA.jpg",
            quantity: 1
        },
        {
            id: "2",
            name: "상품 B",
            price: "20,000원",
            image: "/images/productB.jpg",
            quantity: 1
        },
        {
            id: "3",
            name: "상품 C",
            price: "30,000원",
            image: "/images/productC.jpg",
            quantity: 1
        },
    ]);

    //수량 빼기
    const handleDown = (id: string) => {
        setCart((prevCart) =>
            prevCart.map((product) =>
                product.id === id && product.quantity > 0
                    ? { ...product, quantity: product.quantity - 1 } // 수량 감소
                    : product // 다른 상품은 변경하지 않음
            )
        );
    };

    //수량 더하기
    const handleUp = (id: string) => { 
        setCart((prevCart) => 
            prevCart.map((product) => 
                product.id === id 
                    ? { ...product, quantity: product.quantity + 1} // 수량 증가
                    : product // 다른 상품은 변경 하지 않음
            )
        )
    }

    const isChecked = (id: string) => isSelected.some((product) => product.id === id);

    //선택된 아이템 관리
    const handleChangeCheckBox = (id: string) => {
        setIsSelected((prev) => {
            // 이미 선택된 id가 있으면 해당 상품 객체를 배열에서 제거
            if (prev.some((product) => product.id === id)) { 
                return prev.filter((product) => product.id !== id); 
            } else {
                // id가 없으면 cart에서 해당 상품을 찾아서 추가 (undefined가 아닌 값만 추가)
                const product = cart.find((product) => product.id === id);
                return product ? [...prev, product] : prev; // 상품이 없으면 배열을 그대로 반환
            }
        });
    };

    //아이템 삭제 버튼
    const handleDeleteItem = (productId: string) => {
        setCart((prev) => prev.filter((product) => product.id !== productId));
    }

    return(
        <div className={styles.total}>
            <MypageHeader />

            
        </div>
    )
}

export default MypageBookmark;