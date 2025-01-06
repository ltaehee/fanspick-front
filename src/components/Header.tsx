import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../utils/api";
import styles from "../css/header.module.css";
import noticeIcon from "../../public/icons/notice.png";
import cartIcon from "../../public/icons/cart_icon.png";
import defaultProfile from "../../public/icons/user_icon.png";
import fanspickLogo from "../../public/icons/footer_logo.png";

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
    { label: "인형", path: "/doll-category" },
    { label: "디지털", path: "/digital-category" },
    { label: "문구", path: "/stationery-category" },
    { label: "생활", path: "/lifestyle-category" },
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
