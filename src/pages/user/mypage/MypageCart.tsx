import { useState } from "react";
import styles from '../../../css/mypage/mypage.module.css';
import cartStyles from '../../../css/mypage/mypageCart.module.css';
import tableStyles from '../../../css/productTable/productTable.module.css';
import noticeImg from '/icons/alert-circle.png';
import ProductTableHeader from "../../../components/productTable/ProductTableHeader";
import ProductTableHeaderMenu from "../../../components/productTable/ProductTableHeaderMenu";
import ProductTableMenu from "../../../components/productTable/ProductTableMenu";
import { useNavigate } from "react-router-dom";
import { Button,Pagination } from "ys-project-ui";
import MypageHeader from "../../../components/mypageHeader/MypageHeader";

const MypageCart = () => {
    // const [cart, setCart] = useState();
    const navigate = useNavigate();

    const [cart, setCart] = useState([
        {
            id: "1",
            name: "상품 A",
            price: "10,000원",
            image: "/images/productA.jpg",
            quantity: '1'
        },
        {
            id: "2",
            name: "상품 B",
            price: "20,000원",
            image: "/images/productB.jpg",
            quantity: '1'
        },
        {
            id: "3",
            name: "상품 C",
            price: "30,000원",
            image: "/images/productC.jpg",
            quantity: '1'
        },
    ]);

    return(
        <div className={cartStyles.content_wrap}>
            <MypageHeader />
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
                            <ProductTableMenu.Detail review='리뷰작성하기' onClick={() => navigate('/add-review')} productName={product.name}/>
                            <ProductTableMenu.Price price={product.price} />
                            <ProductTableMenu.Quantity quantity={product.quantity}/>
                            <ProductTableMenu.CheckBox productId={product.id} />
                        </div>
                    ))}
                </ProductTableMenu>
            </div>
            <div className={cartStyles.button_box}>
                <Button className={cartStyles.button} label='구매하기' />
            </div>
            {/* {cart ? (
                <div></div>
            ) : (
                <div>
                    <div className={styles.h1_box}>
                        <h1 className={styles.h1}>마이페이지</h1>
                    </div>
                    <div className={styles.button_box}>
                        <button className={styles.buttons}>프로필 수정</button>
                        <button className={styles.buttons}>주문내역</button>
                        <button className={styles.buttons}>등록한 리뷰</button>
                        <button className={styles.buttons}>장바구니</button>
                        <button className={styles.buttons}>즐겨찾기</button>
                    </div>
                    <div className={cartStyles.none_wrap}>
                        <img src={noticeImg} className={cartStyles.alertImg}/>
                        <p className={cartStyles.p1}>장바구니에 담긴 상품이 없습니다.</p>
                        <p className={cartStyles.p2}>마음에 드는 상품을 담아보세요!</p>
                        <button>계속 쇼핑하기</button>
                    </div>
                </div>
            )} */}
            {/* <Pagination itemLength={235} value={page} itemCountPerPage={10} onPageChange={handlePageChange}>
                <Pagination.PageButtons />
                <Pagination.Navigator />
            </Pagination> */}

        </div>
    )
}

export default MypageCart;