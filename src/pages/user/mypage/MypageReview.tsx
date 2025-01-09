import styles from '../../../css/mypage/mypage.module.css';
import MypageHeader from '../../../components/mypageHeader/MypageHeader';
import { useState } from 'react';
import noticeImg from '/icons/alert-circle.png';
import cartStyles from '../../../css/mypage/mypageCart.module.css';

const MypageReview = () => {
    const [review, setReveiw] = useState([]);

    return(
        <div className={cartStyles.content_wrap}>
            <MypageHeader />
            {review.length !== 0 ? (
                <div>
                </div>
            ):(
                <div>
                    <div className={cartStyles.none_wrap}>
                        <img src={noticeImg} className={cartStyles.alertImg}/>
                        <p className={cartStyles.p1}>리뷰 내역이 없습니다.</p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default MypageReview;