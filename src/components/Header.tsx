import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../css/header.module.css';
import noticeIcon from '/icons/notice.png';
import cartIcon from '/icons/cart_icon.png';
import defaultProfile from '/icons/user_icon.png';
import fanspickLogo from '/icons/user_header_logo.png';
import api from '../utils/api';

interface User {
    id: string;
    name: string;
    role?: string;
    profileImage?: string;
}

const Header = () => {
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();

    const userMenu = [
        { label: "홈", path: "/" },
        { label: "그립톡", path: "/griptok-category" },
        { label: "의류", path: "/clothing-category" },
        { label: "문구", path: "/stationery-category" },
        { label: "케이스", path: "/case-category" },
    ];

    const managerMenu = [
        { label: "홈", path: "/manager-home" },
        { label: "상품 등록", path: "/product-management" },
        { label: "상품 조회", path: "/order-management" },
    ];

    // 로그인된 유저가 있을 경우 로컬스토리지에서 가져오기
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const userData = JSON.parse(storedUser);
            setUser(userData);
        }
    }, []); 

    // 로그아웃 처리
    const handleLogout = async () => {
        try {
            await api.post("/oauth/logout");
            setUser(null);  
            localStorage.removeItem("user");
            navigate("/login");
        } catch (err) {
            console.error("로그아웃 실패:", err);
        }
    };

    // 메뉴 렌더링
    const renderMenu = () => {
        const menu = user?.role === "manager" ? managerMenu : userMenu;
        return menu.map((item, index) => (
            <li key={index} className={styles.navItem}>
                <a
                    href={item.path}
                    className={`${
                        window.location.pathname === item.path
                            ? styles.active
                            : styles.navLink
                    }`}
                >
                    {item.label}
                </a>
            </li>
        ));
    };

    return (
        <header
            className={styles.header}
            style={{ backgroundColor: user?.role === "manager" ? "#ffacac" : "#ffd700" }}
        >
            <div className={styles.headerContent}>
                <a className={styles.logo} onClick={() => navigate("/")}>
                    <img
                        src={fanspickLogo}
                        alt="FansPick Logo"
                        className={styles.logoImage}
                    />
                </a>
                <nav className={styles.headerNav}>
                    <ul className={styles.navList}>
                        {renderMenu()}
                    </ul>
                </nav>

                <div className={styles.icons}>
                    {user ? (
                        <>
                            <span className={styles.logoutText} onClick={handleLogout}>
                                logout
                            </span>
                            <a onClick={() => navigate("/profile")}>
                                <img
                                    src={user.profileImage || defaultProfile}
                                    alt="Profile"
                                    className={styles.profileIcon}
                                />
                            </a>
                            {user.role !== "manager" && (
                                <>
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
                        </>
                    ) : (
                        <>
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