import orderStyles from '../../../css/mypage/mypageOrder.module.css';
import MypageHeader from '../../../components/categories/MypageCategories';
import tableStyles from '../../../css/productTable/productTable.module.css';
import cartStyles from '../../../css/mypage/mypageCart.module.css';
import ProductTableMenu from '../../../components/productTable/ProductTableMenu';
import { useNavigate } from 'react-router-dom';
import { Button } from 'ys-project-ui';


const MypageOrder = () => {
    const navigate = useNavigate();
    const order = [
        {
            id: "1",
            name: "상품 A",
            price: "10,000원",
            image: "/images/productA.jpg",
            quantity: 1,
            day: "2022/03/28",
        },
        {
            id: "2",
            name: "상품 B",
            price: "20,000원",
            image: "/images/productB.jpg",
            quantity: 1,
            day: "2022/03/28"
        },
    ];

    const handleReview = () => {
        navigate('/add-review');
    };
    
    
    return (
        <div className={cartStyles.content_wrap}>
            {order ? (
                <div>
                    <MypageHeader />
                    <div className={orderStyles.Table_wrap}>
                        <ProductTableMenu >
                            
                            {order.map((product) => (
                                <div className={orderStyles.order_wrap}>
                                    <div className={orderStyles.day}>
                                    {product.day}
                                    </div>
                                    <div key={product.id} className={orderStyles.content}>
                                        <div className={orderStyles.table_wrap}>
                                            <ProductTableMenu.Detail onClick={() => navigate('/')} productName={product.name}/> 
                                            <ProductTableMenu.Content content={product.price} />
                                            <div className={tableStyles.quantity_wrap}>
                                            <ProductTableMenu.Quantity quantity={product.quantity} />
                                            </div>
                                        <Button label='리뷰 등록하기' onClick={handleReview} className={orderStyles.review_button}/>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </ProductTableMenu>
                    </div>
                </div>
            ) : (
            <div>

            </div>
            ) 
            }
        </div>
    )
}

export default MypageOrder;