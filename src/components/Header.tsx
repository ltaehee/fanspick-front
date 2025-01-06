import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../utils/api';
import styles from '../css/header.module.css';
import noticeIcon from '/icons/notice.png';
import cartIcon from '/icons/cart_icon.png';
import defaultProfile from '/icons/user_icon.png';
import fanspickLogo from '/icons/footer_logo.png';
import logoutIcon from '/icons/logout_icon.png';

interface User {
  id: string;
  name: string;
  profileImage?: string;
}

const Header = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const Menu = [
    { label: "홈", path: "/" },
    { label: "그립톡", path: "/griptok-category" },
    { label: "의류", path: "/clothing-category" },
    { label: "문구", path: "/stationery-category" },
    { label: "케이스", path: "/case-category" },
  ];

  const fetchUser = async () => {
    try {
      const response = await api.get("/user/userprofile");
      if (response.status === 200) {
        setUser(response.data.user);
      } else {
        console.error("유저 정보 가져오기 실패");
      }
    } catch (err) {
      console.error("유저 정보 가져오기 오류:", err);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await api.post("/user/logout");
      if (response.status === 200) {
        setUser(null);
        navigate("/login");
      } else {
        console.error("로그아웃 실패");
      }
    } catch (err) {
      console.error("로그아웃 오류:", err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        {/* 로고 */}
        <a className={styles.logo} onClick={() => navigate("/")}>
          <img
            src={fanspickLogo}
            alt="FansPick Logo"
            className={styles.logoImage}
          />
        </a>

        {/* 네비게이션 메뉴 */}
        <nav className={styles.headerNav}>
          <ul className={styles.navList}>
            {Menu.map((item, index) => (
              <li key={index} className={styles.navItem}>
                <a
                  href={item.path}
                  className={`${
                    location.pathname + location.hash === item.path
                      ? styles.active
                      : styles.navLink
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* 공통 아이콘 */}
        <div className={styles.icons}>
          {user ? (
            <>
              {/* 유저가 있을 때 */}
              <span className={styles.logoutText} onClick={handleLogout}>
                logout
              </span>
              <a href="#notifications">
                <img
                  src={noticeIcon}
                  alt="Notifications"
                  className={styles.icon}
                />
              </a>
              <a href="#cart">
                <img
                  src={cartIcon}
                  alt="Shopping Cart"
                  className={styles.icon}
                />
              </a>
              <a onClick={() => navigate("/profile")}>
                <img
                  src={user.profileImage || defaultProfile}
                  alt="Profile"
                  className={styles.profileIcon}
                />
              </a>
              <a onClick={handleLogout} className={styles.logoutIcon}>
                <img
                src={logoutIcon}
                alt="Logout"
                className={styles.icon}
                />
            </a>
            </>
          ) : (
            <>
              {/* 유저가 없을 때 */}
              <span
                className={styles.loginText}
                onClick={() => navigate("/login")}
              >
                Login
              </span>
              <a href="#notifications">
                <img
                  src={noticeIcon}
                  alt="Notifications"
                  className={styles.icon}
                />
              </a>
              <a href="#cart">
                <img
                  src={cartIcon}
                  alt="Shopping Cart"
                  className={styles.icon}
                />
              </a>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
