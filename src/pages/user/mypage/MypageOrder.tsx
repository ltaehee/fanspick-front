import styles from '../../../css/mypage/mypage.module.css';
import MypageHeader from '../../../components/categories/MypageCategories';
import ProductTableHeader from '../../../components/productTable/ProductTableHeader';
import ProductTableHeaderMenu from '../../../components/productTable/ProductTableHeaderMenu';
import tableStyles from '../../../css/productTable/productTable.module.css';


const MypageOrder = () => {
    
    return (
        <div className={styles.total}>
            <MypageHeader />
            <ProductTableHeader className={tableStyles.Table_wrap}>
                <ProductTableHeaderMenu menu='상품정보' className={tableStyles.Header_menu_first}/>
                <ProductTableHeaderMenu menu='주문 날짜' className={tableStyles.Header_menu} />
                <ProductTableHeaderMenu menu='수량' className={tableStyles.Header_menu}/>
                <ProductTableHeaderMenu menu='배송 현황' className={tableStyles.Header_menu} />
            </ProductTableHeader>

        </div>
    )
}

export default MypageOrder;