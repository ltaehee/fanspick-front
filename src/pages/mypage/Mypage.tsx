import userProfile from '../../../public/icons/User Thumb.png';

const Mypage = () => {
    return(
        <div>
            <div>
                <h1>마이페이지</h1>
            </div>
            <div>
                <button>프로필 수정</button>
                <button>주문내역</button>
                <button>등록한 리뷰</button>
                <button>장바구니</button>
                <button>즐겨찾기</button>
            </div>
            <div>
                <div>
                    <img src={userProfile}/>
                </div>
                <div>
                    <button>사진 업로드</button>
                    <button>사진 삭제</button>
                </div>
                <ul>
                    <li>
                        <label>이름</label>
                        <input placeholder='이름'/>
                    </li>
                    <li>
                        <label>이메일</label>
                        <input placeholder='이름'/>
                    </li>
                    <li>
                        <label>주소</label>
                        <input placeholder='이름'/>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Mypage;