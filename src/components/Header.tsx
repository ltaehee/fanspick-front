// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import styles from './Header.module.css';
// import guestProfile from '../../../public/images/guest_profile.png'; // 비로그인 상태 기본 이미지
// import defaultProfile from '../../../public/images/default_profile.png'; // 로그인 상태 기본 이미지

// const Header = () => {
//   const [user, setUser] = useState(null); // 유저 상태 관리
//   const navigate = useNavigate();

//   const fetchUser = async () => {
//     try {
//       const response = await axios.get('/api/user/userprofile', {
//         withCredentials: true, // 쿠키 포함
//       });

//       if (response.status === 200) {
//         setUser(response.data.user);
//       } else {
//         console.error('유저 정보 가져오기 실패');
//       }
//     } catch (err) {
//       console.error('유저 정보 가져오기 오류:', err);
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       const response = await axios.post('/api/user/logout', {}, { withCredentials: true });

//       if (response.status === 200) {
//         setUser(null); // 유저 상태 초기화
//         navigate('/login'); // 로그인 페이지로 이동
//       } else {
//         console.error('로그아웃 실패');
//       }
//     } catch (err) {
//       console.error('로그아웃 오류:', err);
//     }
//   };

//   useEffect(() => {
//     fetchUser();
//   }, []);

//   return (
//     <header className={styles.header}>
//       <div className={styles.headerContent}>
//         {/* 로고 */}
//         <a className={styles.logo} onClick={() => navigate('/home')}>
//           <img src="/icons/cart_logo.png" alt="FansPick Logo" className={styles.logoImage} />
//           FansPick
//         </a>

//         {/* 오른쪽 아이콘들 */}
//         <div className={styles.icons}>
//           <a href="#notifications">
//             <img src="/icons/notification.png" alt="Notifications" className={styles.icon} />
//           </a>
//           <a href="#cart">
//             <img src="/icons/cart.png" alt="Shopping Cart" className={styles.icon} />
//           </a>
//           <div className={styles.profileContainer}>
//             <a onClick={() => user && navigate('/profile')}>
//               <img
//                 src={user?.profileImage || (user ? defaultProfile : guestProfile)}
//                 alt="Profile"
//                 className={styles.profileIcon}
//               />
//             </a>
//             {user && (
//               <button className={styles.logoutButton} onClick={handleLogout}>
//                 로그아웃
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;