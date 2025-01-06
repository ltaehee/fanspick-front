import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../utils/api';
import { isAxiosError } from "axios";
import styles from '../css/header.module.css';
import noticeIcon from '/icons/notice.png';
import cartIcon from '/icons/cart_icon.png';
import defaultProfile from '/icons/user_icon.png';
import fanspickLogo from '/icons/user_header_logo.png';
import logoutIcon from '/icons/logout_icon.png';

interface User {
    id: string;
    name: string;
    profileImage?: string;
}

const Header = () => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
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
            const response = await api.get("/oauth/");
            if (response.status === 200) {
                const userData = response.data.user;
                setUser(userData);
                setIsAuthenticated(true);
    
                localStorage.setItem("user", JSON.stringify(userData));
                localStorage.setItem("isAuthenticated", "true");
            }
        } catch (err) {
            if (isAxiosError(err) && ![401, 404].includes(err.response?.status ?? 0)) {
                console.error("유저 정보 가져오기 오류:", err);
            }
            setIsAuthenticated(false);
            localStorage.removeItem("user");
            localStorage.removeItem("isAuthenticated");
        }
    };

    const handleLogout = async () => {
        try {
            const response = await api.post("/oauth/logout");
            if (response.status === 200) {
                setUser(null);
                setIsAuthenticated(false);
                localStorage.removeItem("user");
                localStorage.removeItem("isAuthenticated");
                navigate("/login");
            } else {
                console.error("로그아웃 실패");
            }
        } catch (err) {
            console.error("로그아웃 오류:", err);
        }
    };

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const storedIsAuthenticated = localStorage.getItem("isAuthenticated");
    
        if (storedUser && storedIsAuthenticated === "true") {
            setUser(JSON.parse(storedUser));
            setIsAuthenticated(true);
        } else {
            fetchUser(); 
        }
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
                <button onClick={handleLogout} className={styles.logoutIcon}>
                    <img
                    src={logoutIcon}
                    alt="Logout"
                    className={styles.icon}
                    />
                </button>
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
