import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { passwordPattern, emailPattern } from '../consts/patterns';
import { Input, Button, Modal } from 'ys-project-ui'; 
import styles from '../css/signup.module.css'; 
import Terms from '../components/Terms';

function Signup() {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isTermsChecked, setIsTermsChecked] = useState(false); 

    const navigate = useNavigate();

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser((prev) => ({ ...prev, [name]: value }));
    };

    const handleSignup = async () => {
        const { name, email, password, confirmPassword } = user;

        if (!name.trim()) {
            alert('이름을 입력해주세요.');
            return;
        }

        if (!emailPattern.test(email)) {
            alert('올바른 이메일 형식을 입력해주세요.');
            return;
        }

        if (!passwordPattern.test(password)) {
            alert('비밀번호는 최소 8자, 문자, 숫자, 특수 문자를 포함해야 합니다.');
            return;
        }

        if (password !== confirmPassword) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }

        if (!isTermsChecked) {
            alert('약관에 동의하셔야 회원가입이 가능합니다.');
            return;
        }

        try {
            const response = await fetch('/api/user/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                    termsAccepted: isTermsChecked,
                }),
            });

            if (response.ok) {
                alert('회원가입 성공!');
                navigate('/login');
            } else {
                const errorData = await response.json();
                alert(errorData.message || '회원가입 실패. 다시 시도하세요.');
            }
        } catch (err) {
            console.error('회원가입 중 오류 발생:', err);
            alert('오류가 발생했습니다. 다시 시도하세요.');
        }
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleCheckboxChange = () => {
        setIsTermsChecked((prev) => !prev);
    };

    return (
        <div className={styles.signupContainer}>
            <h1 className={styles.title}>회원가입</h1>
            <form className={styles.form}>
                <div className={styles.inputGroup}>
                    <Input.Box className={styles.inputRow}>
                        <Input.Label className={styles.inputLabel}>이름</Input.Label>
                        <Input
                            type="text"
                            name="name"
                            value={user.name}
                            onChange={handleInputChange}
                            className={styles.input}
                            placeholder="이름을 입력해주세요"
                            required
                        />
                    </Input.Box>

                    <Input.Box className={styles.inputRow}>
                        <Input.Label className={styles.inputLabel}>이메일</Input.Label>
                        <Input
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={handleInputChange}
                            className={styles.input}
                            placeholder="이메일을 입력해주세요"
                            required
                        />
                    </Input.Box>
                </div>

                <Input.Box className={styles.inputRow}>
                    <Input.Label className={styles.inputLabel}>비밀번호</Input.Label>
                    <Input
                        type="password"
                        name="password"
                        value={user.password}
                        onChange={handleInputChange}
                        className={styles.input}
                        placeholder="비밀번호를 입력해주세요"
                        required
                    />
                </Input.Box>

                <Input.Box className={styles.inputRow}>
                    <Input.Label className={styles.inputLabel}>비밀번호 확인</Input.Label>
                    <Input
                        type="password"
                        name="confirmPassword"
                        value={user.confirmPassword}
                        onChange={handleInputChange}
                        className={styles.input}
                        placeholder="비밀번호를 다시 입력해주세요"
                        required
                    />
                </Input.Box>

                {/* 약관 동의 및 약관 보기 */}
                <div className={styles.checkboxRow}>
                    <Input.Box className={styles.checkboxBox}>
                        <Input.Label htmlFor="terms" className={styles.checkboxLabel}>
                                약관에 동의합니다. <span>(필수)</span>
                            </Input.Label>
                        <Input
                            type="checkbox"
                            id="terms"
                            checked={isTermsChecked}
                            onChange={handleCheckboxChange}
                            className={styles.checkbox}
                        />
                    </Input.Box>
                    <span onClick={openModal} className={styles.termsLink}>
                        약관 보기
                    </span>
                </div>

                <Button
                    type="button"
                    label="회원가입"
                    onClick={handleSignup}
                    className={styles.signupButton}
                />
            </form>

            <p className={styles.loginPrompt}>
                이미 계정이 있으신가요?{' '}
                <span onClick={() => navigate('/login')} className={styles.loginLink}>
                    로그인
                </span>
            </p>

            {/* 모달 */}
            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                minWidth={600}
                minHeight={400}
                backgroundColor={"#ffffff"}
                padding={20}
                borderRadius={8}
            >
                <Terms />
                <Modal.Button
                    onClick={() => {
                        setIsTermsChecked(true); 
                        closeModal(); 
                    }}
                    className={styles.modalButton}
                >
                    약관 동의하기
                </Modal.Button>
            </Modal>
        </div>
    );
}

export default Signup;