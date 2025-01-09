import { useState } from "react";
import cartStyles from '../../../css/mypage/mypageCart.module.css';
import tableStyles from '../../../css/productTable/productTable.module.css';
import noticeImg from '/icons/alert-circle.png';
import ProductTableHeader from "../../../components/productTable/ProductTableHeader";
import ProductTableHeaderMenu from "../../../components/productTable/ProductTableHeaderMenu";
import ProductTableMenu from "../../../components/productTable/ProductTableMenu";
import { useNavigate } from "react-router-dom";
import { Button } from "ys-project-ui";
import MypageHeader from "../../../components/categories/MypageCategories";

const MypageCart = () => {
    // const [cart, setCart] = useState();
    const navigate = useNavigate();
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
        // {
        //     id: "1",
        //     name: "상품 A",
        //     price: "10,000원",
        //     image: "/images/productA.jpg",
        //     quantity: 1
        // },
        // {
        //     id: "2",
        //     name: "상품 B",
        //     price: "20,000원",
        //     image: "/images/productB.jpg",
        //     quantity: 1
        // },
        // {
        //     id: "3",
        //     name: "상품 C",
        //     price: "30,000원",
        //     image: "/images/productC.jpg",
        //     quantity: 1
        // },
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

    //장바구니 선택한 하나의 아이템 삭제 버튼
    const handleDeleteItem = (productId: string) => {
        setCart((prev) => prev.filter((product) => product.id !== productId));
    }

    return(
        <div className={cartStyles.content_wrap}>
            <MypageHeader />
            {cart.length !== 0 ? (
                <div>
                    
                    <div className={cartStyles.Table_wrap}>
                        <ProductTableHeader className={tableStyles.Header_wrap}>
                            <ProductTableHeaderMenu menu='상품정보' className={tableStyles.Header_menu_first}/>
                            <ProductTableHeaderMenu menu='판매 금액' className={tableStyles.Header_menu} />
                            <ProductTableHeaderMenu menu='수량' className={tableStyles.Header_menu}/>
                            <ProductTableHeaderMenu menu='' className={tableStyles.Header_menu} />
                        </ProductTableHeader>
                        <ProductTableMenu >
                            {cart.map((product) => (
                                <div key={product.id} className={tableStyles.content}>
                                    <ProductTableMenu.CheckBox className={cartStyles.checkbox_box} productId={product.id} isChecked={isChecked(product.id)} onChange={handleChangeCheckBox} />
                                    <ProductTableMenu.Detail onClick={() => navigate('/add-review')} productName={product.name}/>
                                    <ProductTableMenu.Content content={product.price} />
                                    <div className={tableStyles.quantity_wrap}>
                                    <ProductTableMenu.QuantityButton label='-' onClick={handleDown} id={product.id}/>
                                    <ProductTableMenu.Quantity quantity={product.quantity} />
                                    <ProductTableMenu.QuantityButton label='+' onClick={handleUp} id={product.id} />
                                    </div>
                                    <ProductTableMenu.DeleteButton productId={product.id} onClick={handleDeleteItem} />
                                </div>
                            ))}
                        </ProductTableMenu>
                    </div>
                    <div className={cartStyles.button_box}>
                        <Button className={cartStyles.button} label='구매하기' onClick={() => navigate('/')}/>
                    </div>
                </div>
            ) : (
                <div>
                    <div className={cartStyles.none_wrap}>
                        <img src={noticeImg} className={cartStyles.alertImg}/>
                        <p className={cartStyles.p1}>장바구니에 담긴 상품이 없습니다.</p>
                        <p className={cartStyles.p2}>마음에 드는 상품을 담아보세요!</p>
                        <Button label='상품 담으러 가기' onClick={() => navigate('/')}/>
                    </div>
                </div>
            )}
            

        </div>
    )
}

export default MypageCart;