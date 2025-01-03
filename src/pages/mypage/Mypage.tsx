import userProfile from '../../../public/icons/User Thumb.png';
import { ChangeEvent, useState } from 'react';


interface User {
    name: string;
    email: string;
}

interface AddressType {
    roadAddress: string; //도로명 주소
    zoneCode: string; //우편번호
    jibunAddress: string; // 지번주소
    detailAddress: string; //상세 주소
}

const Mypage = () => {
    const [user, setUser] = useState<User>({name:'', email:''});
    const [address, setAddress] = useState<AddressType>({roadAddress:'', zoneCode:'', jibunAddress:'', detailAddress:''});


    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setUser({...user, [name]:value});
        setAddress({...address, [name]: value});
    }

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
                        <input placeholder='이름' name='name' value={user.name} onChange={handleChange}/>
                    </li>
                    <li>
                        <label>이메일</label>
                        <input placeholder='이메일' name='email' value={user.email} onChange={handleChange}/>
                    </li>
                    <li>
                        <label>주소</label>
                        <input placeholder='우편번호' name='zoneCode' value={address.zoneCode} onChange={handleChange}/>
                        <button>주소 검색</button>
                    </li>
                    <li>
                        <input placeholder='도로명 주소' name='roadAddress' value={address.roadAddress} onChange={handleChange}/>
                    </li>
                    <li>
                        <input placeholder='상세 주소' name='detailAddrss' value={address.detailAddress} onChange={handleChange}/>
                    </li>
                </ul>
                <div>
                    <button>회원정보 수정</button>
                </div>
            </div>
        </div>
    )
}

export default Mypage;