import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import styles from '../css/header.module.css';
import noticeIcon from '../../public/icons/notice.png';
import cartIcon from '../../public/icons/cart_icon.png';
import guestProfile from '../../public/icons/gust_icon.png';
import defaultProfile from '../../public/icons/user_icon.png';
import fanspickLogo from '../../public/icons/header_logo.png';
import logoutIcon from '../../public/icons/logout.png';


interface User {
    id: string;
    name: string;
    profileImage?: string; 
  }

const Header = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const response = await api.get('/user/userprofile');
      if (response.status === 200) {
        setUser(response.data.user);
      } else {
        console.error('유저 정보 가져오기 실패');
      }
    } catch (err) {
      console.error('유저 정보 가져오기 오류:', err);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await api.post('/user/logout');
      if (response.status === 200) {
        setUser(null);
        navigate('/login');
      } else {
        console.error('로그아웃 실패');
      }
    } catch (err) {
      console.error('로그아웃 오류:', err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <a className={styles.logo} onClick={() => navigate('/')}>
          <img src={fanspickLogo} alt="FansPick Logo" className={styles.logoImage} />
        </a>
        <div className={styles.icons}>
          <a href="#notifications">
            <img src={noticeIcon} alt="Notifications" className={styles.icon} />
          </a>
          <a href="#cart">
            <img src={cartIcon} alt="Shopping Cart" className={styles.icon} />
          </a>
          <div className={styles.profileContainer}>
            <a onClick={() => user && navigate('/profile')}>
              <img
                src={user?.profileImage || (user ? defaultProfile : guestProfile)}
                alt="Profile"
                className={styles.profileIcon}
              />
            </a>
            {user && (
              <img
                src={logoutIcon}
                alt="Logout"
                className={styles.logoutIcon}
                onClick={handleLogout}
              />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;