import { FC } from "react";
import { Button } from "ys-project-ui";
import styles from '../../css/mypage/mypage.module.css';
import { useNavigate, useLocation } from "react-router-dom";

interface Header {
    className?: string;
}

const MypageHeader : FC<Header> = (props) => {
    const {className} = props;
    const navigate = useNavigate();
    const location = useLocation();
    const isActive = (path: string)  => location.pathname === path; // 현재경로와 path가 같으면 true, 다르면 false
    

    return (
        <div className={className}>
            <div className={styles.h1_box}>
                <h1 className={styles.h1}>마이페이지</h1>
            </div>
            <div className={styles.button_box}>
                <Button className={`${styles.buttons} ${isActive('/mypage') ? styles.active : ''}`} label='프로필 수정' onClick={() => navigate('/mypage')}/>
                <Button className={`${styles.buttons} ${isActive('/mypage-order') ? styles.active : ''}`}  label='주문내역' onClick={() => navigate('/mypage-order')}/>
                <Button className={`${styles.buttons} ${isActive('/mypage-review') ? styles.active : ''}`} label='등록한 리뷰' onClick={() => navigate('/mypage-review')}/>
                <Button className={`${styles.buttons} ${isActive('/cart') ? styles.active : ''}`} label='장바구니' onClick={() => navigate('/cart')}/>
                <Button className={`${styles.buttons} ${isActive('/mypage-bookmark') ? styles.active : ''}`} label='즐겨찾기' onClick={() => navigate('/mypage-bookmark')}/>
            </div>
        </div>
        
    )
}

export default MypageHeader;