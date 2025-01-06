import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Button } from 'ys-project-ui'; 
import axios from 'axios'; 
import api from '../utils/api';
import styles from '../css/login.module.css'; 
import showPasswordIcon from '/icons/showPassword.png';
import hidePasswordIcon from '/icons/hidePassword.png';
import kakaoLoginIcon from '/icons/kakao_login.png';
import googleLoginIcon from '/icons/google_login.png';
import naverLoginIcon from '/icons/naver_login.png';

function Login() {
    const [user, setUser] = useState({
        email: '',
        password: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [saveEmail, setSaveEmail] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const savedEmail = localStorage.getItem('savedEmail');
        if (savedEmail) {
            setUser((prev) => ({ ...prev, email: savedEmail }));
            setSaveEmail(true); 
        }
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser((prev) => ({ ...prev, [name]: value }));
    };

    const toggleShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    const handleSaveEmailChange = () => {
        setSaveEmail((prev) => !prev);
        if (!saveEmail) {
            localStorage.setItem('savedEmail', user.email); 
        } else {
            localStorage.removeItem('savedEmail'); 
        }
    };

    const handleLogin = async () => {
        const { email, password } = user;

        if (!email.trim() || !password.trim()) {
            alert('이메일과 비밀번호를 입력해주세요.');
            return;
        }

        if (saveEmail) {
            localStorage.setItem('savedEmail', email);
        }

        try {
            const response = await api.post('/oauth/login', { email, password });

            if (response.status === 200) {
                alert('로그인 성공!');
                navigate('/');
            }
        } catch (error) {
            console.error('로그인 실패:', error);
            if (axios.isAxiosError(error)) {
                alert(error.response?.data?.message || '로그인 실패. 다시 시도하세요.');
            } else {
                alert('알 수 없는 오류가 발생했습니다. 다시 시도하세요.');
            }
        }
    };


    return (
        <div className={styles.loginContainer}>
            <h1 className={styles.title}>로그인</h1>
            <form className={styles.form}>
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

                <div className={styles.passwordRow}>
                    <Input.Box className={styles.inputRow}>
                        <Input.Label className={styles.inputLabel}>비밀번호</Input.Label>
                        <Input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={user.password}
                            onChange={handleInputChange}
                            className={styles.input}
                            placeholder="비밀번호를 입력해주세요"
                            required
                        />
                    </Input.Box>
                    <img
                        src={showPassword ? hidePasswordIcon : showPasswordIcon} 
                        alt={showPassword ? "Hide Password" : "Show Password"}
                        className={styles.showPasswordIcon}
                        onClick={toggleShowPassword}
                    />
                </div>

                {/* 이메일 저장 체크박스 추가 */}
                <div className={styles.saveEmailRow}>
                <Input.Box className={styles.inputBox}>
                    <Input.Label htmlFor="saveEmail" className={styles.saveEmailLabel}>
                        이메일 저장하기
                    </Input.Label>
                    <Input
                        type="checkbox"
                        id="saveEmail"
                        className={styles.saveEmailCheckbox}
                        checked={saveEmail}
                        onChange={handleSaveEmailChange}
                    />
                </Input.Box>
            </div>

                <Button
                    type="button"
                    label="로그인"
                    onClick={handleLogin}
                    className={styles.loginButton}
                />
            </form>

            <div className={styles.simpleLogin}>
                <hr className={styles.separator} />
                <span className={styles.simpleLoginText}>간편로그인</span>
                <hr className={styles.separator} />
            </div>

            {/* oauth 추가 예정 */}
            <div className={styles.socialLogin}>
                <img 
                    src={googleLoginIcon} 
                    alt="Google Login" 
                    className={styles.socialButton} 
                    onClick={() => console.log('구글 로그인 클릭')} 
                />
                <img 
                    src={kakaoLoginIcon} 
                    alt="Kakao Login" 
                    className={styles.socialButton} 
                    onClick={() => console.log('카카오 로그인 클릭')} 
                />
                <img 
                    src={naverLoginIcon} 
                    alt="Naver Login" 
                    className={styles.socialButton} 
                    onClick={() => console.log('네이버 로그인 클릭')} 
                />
            </div>

            <p className={styles.signupPrompt}>
                계정이 없으신가요?{' '}
                <span onClick={() => navigate('/signup')} className={styles.signupLink}>
                    회원가입
                </span>
            </p>
        </div>
    );
}

export default Login;