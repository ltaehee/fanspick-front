import { Button, Tabs } from "ys-project-ui";
import styles from "../../css/faq/manager_faq.module.css";
import { useState } from "react";
import plusIcon from '/icons/plus_icon.png';
import minusIcon from '/icons/minus_icon.png';
import { useNavigate } from "react-router-dom";

const MainPage = () => {
    const [activeTab, setActiveTab] = useState<number | null>(null); 

    const toggleTab = (tabIndex: number) => {
        setActiveTab((prev) => (prev === tabIndex ? null : tabIndex)); 
    };

    const navigate = useNavigate();
    const handleSignup = () => {
      navigate("/signup");
    }
    const handleLogin = () => {
      navigate("/login");
    }

    return (
        <div className={styles.faqContainer}>
        <div className={styles.faq}>FAQ</div>
        <h2 className={styles.h2}>자주 묻는 질문은 여기서 확인하세요!</h2>
        <div className={styles.tabs}>
            <Tabs defaultTabIndex={-1}> 
            <Tabs.MenuList>
              <Tabs.Menu onClick={() => toggleTab(0)} className={`${styles.menu} ${activeTab === 0 ? styles.active : ""}`.trim()}>
                상품 등록은 어떻게 하나요?
                <img
                    src={activeTab === 0 ? minusIcon : plusIcon}
                    className={styles.icon}
                    alt={activeTab === 0 ? "minus icon" : "plus icon"}
                />
              </Tabs.Menu>
              <Tabs.Menu onClick={() => toggleTab(1)} className={`${styles.menu} ${activeTab === 1 ? styles.active : ""}`.trim()}>
                둥록한 상품을 수정 또는 삭제할 수 있나요?
                <img
                    src={activeTab === 1 ? minusIcon : plusIcon}
                    className={styles.icon}
                    alt={activeTab === 1 ? "minus icon" : "plus icon"}
                />
              </Tabs.Menu>
              <Tabs.Menu onClick={() => toggleTab(2)} className={`${styles.menu} ${activeTab === 2 ? styles.active : ""}`.trim()}>
                사업자 번호를 어디에서 작성하나요?
                <img
                    src={activeTab === 2 ? minusIcon : plusIcon}
                    className={styles.icon}
                    alt={activeTab === 2 ? "minus icon" : "plus icon"}
                />
              </Tabs.Menu>
              <Tabs.Menu onClick={() => toggleTab(3)} className={`${styles.menu} ${activeTab === 3 ? styles.active : ""}`.trim()}>
                상품 상세는 꼭 이미지로만 등록해야하나요?
                <img
                    src={activeTab === 3 ? minusIcon : plusIcon}
                    className={styles.icon}
                    alt={activeTab === 3 ? "minus icon" : "plus icon"}
                />
              </Tabs.Menu>
              <Tabs.Menu onClick={() => toggleTab(4)} className={`${styles.menu} ${activeTab === 4 ? styles.active : ""}`.trim()}>
                소셜로그인은 구글/카카오/네이버 외 다른 로그인은 없나요?
                <img
                    src={activeTab === 4 ? minusIcon : plusIcon}
                    className={styles.icon}
                    alt={activeTab === 4 ? "minus icon" : "plus icon"}
                />
              </Tabs.Menu>
            </Tabs.MenuList>
            <Tabs.Pannel className={`${styles.pannel} ${activeTab === 0 ? styles.active : ""}`}>
                <p>상품은 홈 화면 상단에 있는 상품등록 페이지에서 가능합니다.</p>
                <p>해당 상품의 정보를 자세하게 입력해주시길 바랍니다.</p>
            </Tabs.Pannel>
            <Tabs.Pannel className={`${styles.pannel} ${activeTab === 1 ? styles.active : ""}`}>
                <p>등록한 상품을 수정 또는 삭제가 가능합니다.</p>
                <p>홈 화면 상단에 있는 상품조회 페이지에서 가능합니다.</p><br />
                <p style={{color:"red"}}>※ 등록한 상품을 삭제 시 되돌릴 수 없습니다.</p>
            </Tabs.Pannel>
            <Tabs.Pannel className={`${styles.pannel} ${activeTab === 2 ? styles.active : ""}`}>
                <p>우측 상단 프로필을 누르시면 마이페이지에서 사업자번호를 등록할 수 있습니다.</p>
                <p style={{color:"red"}}>안전한 거래를 위해 사업자번호를 등록해주세요.</p>
            </Tabs.Pannel>
            <Tabs.Pannel className={`${styles.pannel} ${activeTab === 3 ? styles.active : ""}`}>
              <p style={{color:"red"}}>상세 이미지는 필수는 아닙니다.</p> <br />
              <p>사용자가 해당 상품의 정보를 알 수 있게 사진을 첨부하는 것을 추천드립니다.</p>
              <p>상품상세 사진 외 상품 설명을 추가하여 더 자세한 정보를 전달할 수 있습니다.</p>
            </Tabs.Pannel>
            <Tabs.Pannel className={`${styles.pannel} ${activeTab === 4 ? styles.active : ""}`}>
                <p>현재는 구글, 카카오, 네이버 3개의 간편로그인만 지원합니다.</p>
                <p>해당 계정이 없으실 경우 일반 회원가입 진행 후 이메일 로그인을 해주시길 바랍니다.</p> <br />
                <div className={styles.buttonContainer}>
                  <Button
                    type="button"
                    label="회원가입"
                    onClick={handleSignup}
                    className={styles.signupButton}
                  />
                  <Button
                    type="button"
                    label="로그인"
                    onClick={handleLogin}
                    className={styles.loginButton}
                  />
                </div>
              </Tabs.Pannel>
            </Tabs>
        </div>
        </div>
    );
};

export default MainPage;