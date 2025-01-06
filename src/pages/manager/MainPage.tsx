import { Button, Popover, Tabs } from "ys-project-ui";
import styles from "../../css/manager/mainPage.module.css";
import { useState } from "react";
const MainPage = () => {
  const [activeTab, setActiveTab] = useState(0);

  const onChangeTab = (index: number) => {
    setActiveTab(index);
  };
  return (
    <>
      <div className={styles.body}>
        <div className={styles.main}>
          <h1>마이페이지</h1>
          <div className={styles.buttonContainer}>
            <Button className={styles.button} label="프로필 수정"></Button>
            <Button className={styles.button} label="상품 등록"></Button>
            <Button className={styles.button} label="상품 조회"></Button>
          </div>
        </div>
        <div className={styles.faqContainer}>
          <div className={styles.faqFAQ}>FAQ</div>
          <h2 className={styles.h2}>자주 묻는 질문은 여기서 확인하세요!</h2>
          <div className={styles.tabs}>
            <Tabs onChangeTab={onChangeTab}>
              <Tabs.MenuList className={styles.menuList}>
                <Tabs.Menu className={styles.menu} index={1}>
                  주문내역은 어디서 확인 하나요?
                </Tabs.Menu>
              </Tabs.MenuList>
              <Tabs.Pannel className={styles.pannel} index={1}>
                사용자로 로그인하셔야 확인됩니다.
              </Tabs.Pannel>
            </Tabs>
          </div>

          <Popover.Trigger className={styles.trigger}>
            주문내역은 어디서 확인 하나요?
          </Popover.Trigger>
          <Popover.Content position="bottom-center" className={styles.content}>
            사용자로 로그인하셔야 확인됩니다.
          </Popover.Content>
          <Popover>
            <Popover.Trigger>주문내역은 어디서 확인 하나요?</Popover.Trigger>
            <Popover.Content position="bottom-center">
              사용자로 로그인하셔야 확인됩니다.
            </Popover.Content>
          </Popover>
          {/* <Tabs>
            <Tabs.MenuList>
              <Tabs.Menu>주문내역은 어디서 확인 하나요?</Tabs.Menu>
            </Tabs.MenuList>
            <Tabs.Pannel>사용자로 로그인하셔야 확인됩니다.</Tabs.Pannel>
          </Tabs>
          <Tabs>
            <Tabs.MenuList>
              <Tabs.Menu>회원정보 변경은 어디서 하나요?</Tabs.Menu>
            </Tabs.MenuList>
            <Tabs.Pannel>프로필 수정탭에서 하시면 됩니다.</Tabs.Pannel>
          </Tabs>
          <Tabs>
            <Tabs.MenuList>
              <Tabs.Menu>상품등록은 어디서 하나요?</Tabs.Menu>
            </Tabs.MenuList>
            <Tabs.Pannel>상품등록 탭에서 하시면 됩니다.</Tabs.Pannel>
          </Tabs> */}
        </div>
        <img src="" alt="" />
      </div>
    </>
  );
};

export default MainPage;
