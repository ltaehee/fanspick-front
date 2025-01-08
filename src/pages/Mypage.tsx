import userProfile from '/icons/user_icon.png'; 
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import styles from '../css/mypage/mypage.module.css';
import DaumPostcode, { Address } from 'react-daum-postcode';
import Modal from 'react-modal';
import { Button, Input } from 'ys-project-ui';
import MypageCategories from '../components/categories/MypageCategories';
import { useUserContext } from '../context/UserContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Mypage = () => {
    const [address, setAddress] = useState({
        roadAddress: '',
        zoneCode: '',
        jibunAddress: '',
        detailAddress: '' 
    });

    const [imgFile, setImgFile] = useState<File>();
    const [previewImg, setPreviewImg] = useState<string>(userProfile);
    const [isOpen, setIsOpen] = useState(false);
    const { user: loggedInUser, updateUser } = useUserContext(); 

    const [updatedUser, setUpdatedUser] = useState({
        name: '',
        email: '',
        password: '',
        role: ''
    });

    useEffect(() => {
        if (loggedInUser) {
            setUpdatedUser({
                name: loggedInUser.name || '',
                email: loggedInUser.email || '',
                password: '',
                role: loggedInUser.role || ''
            });
        }
    }, [loggedInUser]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUpdatedUser({ ...updatedUser, [name]: value });
        setAddress({ ...address, [name]: value });
    };

    const fileInputRef = useRef<HTMLInputElement>(null);
    const handleClickFile = () => {
        fileInputRef?.current?.click();
    };

    const handleChangeImg = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImgFile(file);
            const previewUrl = URL.createObjectURL(file);
            setPreviewImg(previewUrl);
        }
    };

    const handleDeleteImg = () => {
        setImgFile(undefined);
        setPreviewImg(userProfile);
    };

    const handleClickOpen = () => {
        setIsOpen(!isOpen);
    };

    const handleDaumPost = (data: Address) => {
        setAddress((prev) => ({
            ...prev,
            roadAddress: data.roadAddress,
            jibunAddress: data.jibunAddress,
            zoneCode: data.zonecode
        }));
        setIsOpen(false);
    };

    const handleSubmit = async () => {
        if (!updatedUser.password) {
            toast.error('비밀번호를 입력해주세요.');
            return;
        }

        if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(updatedUser.password)) {
            toast.error('비밀번호는 8자리 이상, 숫자, 특수문자(@&!%*?&)를 포함해야 합니다.');
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(updatedUser.email)) {
            toast.error('올바른 이메일 형식이 아닙니다. 이메일을 다시 확인해주세요.');
            return;
        }

        const userData = {
            name: updatedUser.name,
            email: updatedUser.email,
            password: updatedUser.password,
            address: {
                roadAddress: address.roadAddress,
                zoneCode: address.zoneCode,
                jibunAddress: address.jibunAddress,
                detailAddress: address.detailAddress
            }
        };

        try {
            const response = await axios.put('/user/profile/update', userData);
            if (response.status === 200) {
                toast.success('회원정보 수정 성공');
                updateUser(response.data.user); 
            }
        } catch (error) {
            toast.error('회원정보 수정 실패. 다시 시도해주세요.');
        }
    };

    return (
        <div className={styles.total}>
            <MypageCategories />
            <div className={styles.edit_box}>
                <div className={styles.imgupload_box}>
                    <div className={styles.previewImg_box}>
                        <img src={previewImg} onClick={handleClickFile} className={styles.preview_img} />
                        <input type="file" ref={fileInputRef} onChange={handleChangeImg} className={styles.img_input} />
                    </div>
                    <div className={styles.imgupload_button_box}>
                        <Button
                            className={styles.imgupload_button}
                            onClick={handleClickFile}
                            label="사진 업로드"
                            style={{ border: `2px solid ${updatedUser.role === 'manager' ? '#ffacac' : '#ffd700'}` }}
                        />
                        <Button
                            className={styles.imgupload_button}
                            onClick={handleDeleteImg}
                            label="사진 삭제"
                            style={{ border: `2px solid ${updatedUser.role === 'manager' ? '#ffacac' : '#ffd700'}` }}
                        />
                    </div>
                </div>
                <ul className={styles.ul}>
                    <li className={styles.li}>
                        <label>이름</label>
                        <Input placeholder="이름" name="name" value={updatedUser.name} onChange={handleChange} className={styles.ul_input} />
                    </li>
                    <li className={styles.li}>
                        <label>이메일</label>
                        <Input placeholder="이메일" name="email" value={updatedUser.email} onChange={handleChange} className={styles.ul_input} />
                    </li>
                    <li className={styles.li}>
                        <label>비밀번호</label>
                        <Input placeholder="비밀번호 확인" type="password" name="password" value={updatedUser.password} onChange={handleChange} className={styles.ul_input} />
                    </li>
                    <li className={styles.li}>
                        <label>주소</label>
                        <div className={styles.search_box}>
                            <Input className={styles.ul_input} placeholder="우편번호" name="zoneCode" value={address.zoneCode} onChange={handleChange} />
                            <Button
                                className={styles.edit_button}
                                onClick={handleClickOpen}
                                label="주소 검색"
                                style={{ backgroundColor: updatedUser.role === 'manager' ? '#ffacac' : '#ffd700' }}
                            />
                        </div>
                    </li>
                    <li className={styles.li}>
                        <Input className={styles.ul_input} placeholder="도로명 주소" name="roadAddress" value={address.roadAddress} onChange={handleChange} />
                    </li>
                    <li className={styles.li}>
                        <Input className={styles.ul_input} placeholder="상세 주소" name="detailAddress" value={address.detailAddress} onChange={handleChange} />
                    </li>
                </ul>
            </div>
            <div className={styles.edit_button_box}>
                <Button
                        onClick={handleSubmit}
                        className={styles.edit_button}
                        label="회원정보 수정"
                        style={{ backgroundColor: updatedUser.role === 'manager' ? '#ffacac' : undefined }}
                    />
            </div>
            {isOpen && (
                <Modal isOpen={isOpen} onRequestClose={handleClickOpen} className={styles.modal}>
                    <DaumPostcode className={styles.daumpostcode} onComplete={handleDaumPost} autoClose />
                    <Button onClick={handleClickOpen} className={styles.modal_button} label="X" />
                </Modal>
            )}
        </div>
    );
};

export default Mypage;