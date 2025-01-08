import userProfile from '/icons/user_icon.png';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import styles from '../css/mypage/mypage.module.css';
import { passwordPattern, emailPattern } from '../consts/patterns';
import DaumPostcode, { Address } from 'react-daum-postcode';
import Modal from 'react-modal';
import { Button, Input } from 'ys-project-ui';
import MypageHeader from '../components/mypageHeader/MypageHeader';
import { useUserContext } from '../context/UserContext';


interface User {
    name: string;
    email: string;
    password: string;
    role: string; 
    businessNumber?: string;
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
    const [user, setUser] = useState<User>({name:'', email:'', password:'', role: '', businessNumber: '' });
    const [address, setAddress] = useState<AddressType>({roadAddress:'', zoneCode:'', jibunAddress:'', detailAddress:''});
    const [isOpen, setIsOpen] = useState(false);
    const { user: loggedInUser } = useUserContext(); 

    useEffect(() => {
        if (loggedInUser) {
            setUser({
                name: loggedInUser.name || '',
                email: loggedInUser.email || '',
                password: '',
                role: loggedInUser.role || '',
                businessNumber: loggedInUser.businessNumber || '',
            });
        }
    }, [loggedInUser]);

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setUser({...user, [name]:value});
        setAddress({...address, [name]: value});
    }

    const fileInputRef = useRef<HTMLInputElement>(null);  
    const handleClickFile = () => {
        fileInputRef?.current?.click();
    }

    const handleChangeImg = (e:ChangeEvent<HTMLInputElement>) => {
        if(e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImgFile(file);
            const previewUrl = URL.createObjectURL(file); 
            setPreviewImg(previewUrl);
        }
    }

    const handleDeleteImg = () => {  
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

        if (user.role === 'user') {
            formData.append('roadAddress', address.roadAddress);
            formData.append('zoneCode', address.zoneCode);
            formData.append('jibunAddress', address.jibunAddress);
            formData.append('detailAddress', address.detailAddress);
        } else if (user.role === 'manager') {
            formData.append('businessNumber', user.businessNumber || ''); 
        }

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
            <MypageHeader />
            <div className={styles.edit_box}>
                <div className={styles.imgupload_box}>
                    <div className={styles.previewImg_box}>
                        <img src={previewImg} onClick={handleClickFile} className={styles.preview_img}/>
                        <input type='file' ref={fileInputRef} onChange={handleChangeImg} className={styles.img_input}/>
                    </div>
                    <div className={styles.imgupload_button_box}>
                        <Button className={styles.imgupload_button} onClick={handleClickFile} label='사진 업로드'/>
                        <Button className={styles.imgupload_button} onClick={handleDeleteImg} label='사진 삭제'/>
                    </div>
                </div>
                <ul className={styles.ul}>
                    <li className={styles.li}>
                        <label>이름</label>
                        <Input placeholder='이름' name='name' value={user.name} onChange={handleChange} className={styles.ul_input}/>
                    </li>
                    <li className={styles.li}>
                        <label>이메일</label>
                        <Input placeholder='이메일' name='email' value={user.email} onChange={handleChange} className={styles.ul_input}/>
                    </li>
                    <li className={styles.li}>
                        <label>비밀번호</label>
                        <Input placeholder='비밀번호 확인' type='password' name='password' value={user.password} onChange={handleChange} className={styles.ul_input}/>
                    </li>
                    <li className={styles.li}>
                        {user.role === 'user' ? (
                            <>
                                <label>주소</label>
                                <div className={styles.search_box}>
                                    <Input
                                        className={styles.ul_input}
                                        placeholder='우편번호'
                                        name='zoneCode'
                                        value={address.zoneCode}
                                        onChange={handleChange}
                                    />
                                    <Button className={styles.edit_button} onClick={handleClickOpen} label='주소 검색' />
                                </div>
                                <Input
                                    className={styles.ul_input}
                                    placeholder='도로명 주소'
                                    name='roadAddress'
                                    value={address.roadAddress}
                                    onChange={handleChange}
                                />
                                <Input
                                    className={styles.ul_input}
                                    placeholder='상세 주소'
                                    name='detailAddress'
                                    value={address.detailAddress}
                                    onChange={handleChange}
                                />
                            </>
                        ) : (
                            <>
                                <label>사업자번호</label>
                                <Input
                                    placeholder='사업자번호 입력'
                                    name='businessNumber'
                                    value={user.businessNumber} 
                                    onChange={handleChange}
                                    className={styles.ul_input}
                                />
                            </>
                        )}
                    </li>
                </ul>
                </div>
            <div className={styles.edit_button_box}>
                <Button
                    onClick={handleSubmit}
                    className={styles.edit_button}
                    label='회원정보 수정'
                    style={{ backgroundColor: user.role === 'manager' ? '#ffacac' : '#ffd700' }}
                />
            </div>
            {isOpen && (
                <Modal isOpen={isOpen} onRequestClose={handleClickOpen} className={styles.modal}>
                    <DaumPostcode className={styles.daumpostcode} onComplete={handleDaumPost} autoClose/>
                    <Button onClick={handleClickOpen} className={styles.modal_button} label='X'></Button>
                </Modal>
            )}
        </div>
    )
}

export default Mypage;