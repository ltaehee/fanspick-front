import userProfile from '../../../public/icons/user_icon.png';
import { ChangeEvent, useRef, useState } from 'react';
import axios from 'axios';
import styles from '../../styles/mypage.module.css';
import { passwordPattern, emailPattern } from '../../consts/patterns';
import DaumPostcode, { Address } from 'react-daum-postcode';
import Modal from 'react-modal';


interface User {
    name: string;
    email: string;
    password: string;
}

interface AddressType {
    roadAddress: string; //도로명 주소
    zoneCode: string; //우편번호
    jibunAddress: string; // 지번주소
    detailAddress: string; //상세 주소
}

const Mypage = () => {
    const [imgFile, setImgFile] = useState<File>();
    const [previewImg, setPreviewImg] = useState<string>(userProfile);
    const [user, setUser] = useState<User>({name:'', email:'', password:''});
    const [address, setAddress] = useState<AddressType>({roadAddress:'', zoneCode:'', jibunAddress:'', detailAddress:''});
    const [isOpen, setIsOpen] = useState(false);

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => { //input 입력
        const {name, value} = e.target;
        setUser({...user, [name]:value});
        setAddress({...address, [name]: value});
    }

    const fileInputRef = useRef<HTMLInputElement>(null);  //이미지 선택
    const handleClickFile = () => {
        fileInputRef?.current?.click();
    }

    const handleChangeImg = (e:ChangeEvent<HTMLInputElement>) => {
        if(e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImgFile(file);
            const previewUrl = URL.createObjectURL(file); //이미지 경로
            setPreviewImg(previewUrl);
        }
    }

    const handleDeleteImg = () => {  // 이미지 삭제
        setImgFile(undefined); 
        setPreviewImg(userProfile);
    }

    const handleClickOpen = () => {
        setIsOpen(!isOpen);
    }

    const handleDaumPost = (data:Address) => {
        setAddress((address) => ({
            ...address,
            roadAddress: data.roadAddress,
            jibunAddress: data.jibunAddress,
            zoneCode: data.zonecode,
        }));
        setIsOpen(false);
    }

    const handleSubmit = async() => {
        if(!user.password) {
            alert('비밀번호를 입력해주세요.');
            return;
        }

        if(!passwordPattern.test(user.password)) {
            alert('비밀번호는 8자리 이상, 숫자, 특수문자(@&!%*?&)를 포함해야 합니다.');
        }

        if(!emailPattern.test(user.email)) {
            alert("올바른 이메일 형식이 아닙니다. 이메일을 다시 확인해주세요.");

        }

        const password = user.password;

        const formData = new FormData();

        formData.append('name', user.name);
        formData.append('email', user.email);
        formData.append('roadAddress', address.roadAddress);
        formData.append('zoneCode', address.zoneCode);
        formData.append('jibunAddress', address.jibunAddress);
        formData.append('detailAddress', address.detailAddress);
        if(imgFile) {
            formData.append('profileImage', imgFile);
        }

        try{
            const verifyResponse = await axios.post('/', password);
            if(!verifyResponse.data.success) {
                alert('비밀번호가 일치하지 않습니다.');
                return;
            }

            const response = await axios.put("/", formData);
            console.log('회원정보 수정 성공', response.data);
        }catch(err) {
            console.log('회원정보 수정 실패',err);
        }
    }
    
    return(
        <div className={styles.total}>
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
            <div className={styles.edit_box}>
                <div className={styles.imgupload_box}>
                    <div className={styles.previewImg_box}>
                        <img src={previewImg} onClick={handleClickFile} className={styles.preview_img}/>
                        <input type='file' ref={fileInputRef} onChange={handleChangeImg} className={styles.img_input}/>
                    </div>
                    <div className={styles.imgupload_button_box}>
                        <button className={styles.imgupload_button} onClick={handleClickFile}>사진 업로드</button>
                        <button className={styles.imgupload_button} onClick={handleDeleteImg}>사진 삭제</button>
                    </div>
                </div>
                <ul className={styles.ul}>
                    <li className={styles.li}>
                        <label>이름</label>
                        <input placeholder='이름' name='name' value={user.name} onChange={handleChange} className={styles.ul_input}/>
                    </li>
                    <li className={styles.li}>
                        <label>이메일</label>
                        <input placeholder='이메일' name='email' value={user.email} onChange={handleChange} className={styles.ul_input}/>
                    </li>
                    <li className={styles.li}>
                        <label>비밀번호</label>
                        <input placeholder='비밀번호' type='password' name='password' value={user.password} onChange={handleChange} className={styles.ul_input}/>
                    </li>
                    <li className={styles.li}>
                        <label>주소</label>
                        <div className={styles.search_box}>
                            <input className={styles.ul_input} placeholder='우편번호' name='zoneCode' value={address.zoneCode} onChange={handleChange} />
                            <button className={styles.edit_button} onClick={handleClickOpen}>주소 검색</button>
                        </div>
                    </li>
                    <li className={styles.li}>
                        <input className={styles.ul_input} placeholder='도로명 주소' name='roadAddress' value={address.roadAddress} onChange={handleChange}/>
                    </li>
                    <li className={styles.li}>
                        <input className={styles.ul_input} placeholder='상세 주소' name='detailAddrss' value={address.detailAddress} onChange={handleChange}/>
                    </li>
                </ul>
                </div>
            <div className={styles.edit_button_box}>
                <button onClick={handleSubmit} className={styles.edit_button}>회원정보 수정</button>
            </div>
            {isOpen && (
                <Modal isOpen={isOpen} onRequestClose={handleClickOpen} className={styles.modal}>
                    <DaumPostcode className={styles.daumpostcode} onComplete={handleDaumPost} autoClose/>
                    <button onClick={handleClickOpen} className={styles.modal_button}>X</button>
                </Modal>
            )}
        </div>
    )
}

export default Mypage;