import { FC, useMemo } from "react"
import styles from "../css/footer.module.css"
import footerLogo from "../../public/icons/footer_logo.png"
import youtubeIcon from "../../public/icons/youtube.png"
import facebookIcon from "../../public/icons/facebook.png"
import twitterIcon from "../../public/icons/twitter.png"
import instagramIcon from "../../public/icons/instagram.png"
import linkedinIcon from "../../public/icons/linkedin.png"

interface FooterProps {
  className?: string;
}

const Footer: FC<FooterProps> = ({ className }) => {
  const footerCls = useMemo(() => {
    return className ? `${className} ${styles.footerContainer}` : styles.footerContainer;
  }, [className]);

  return (
    <footer className={footerCls}>
      <div className={styles.footerContent}>
        {/* 로고 */}
        <a href="/" className={styles.footerLogo}>
          <img src={footerLogo} alt="Footer Logo" className={styles.logoImage} />
        </a>
        {/* 네비게이션 */}
        <nav className={styles.footerNav}>
          <a href="/">홈</a>
          <a href="#figures">인형</a>
          <a href="#digital">디지털</a>
          <a href="#stationery">문구</a>
          <a href="#lifestyle">생활</a>
          <a href="#faq" className={styles.bold}>FAQ</a>
        </nav>
        {/* 소셜 미디어 */}
        <div className={styles.footerSocial}>
          <a href="#youtubve">
            <img src={youtubeIcon} alt="Youtube" className={styles.socialIcon} />
          </a>
          <a href="#facebook">
            <img src={facebookIcon} alt="Facebook" className={styles.socialIcon} />
          </a>
          <a href="#twitter">
            <img src={twitterIcon} alt="Twitter" className={styles.socialIcon} />
          </a>
          <a href="#instagram">
            <img src={instagramIcon} alt="Instagram" className={styles.socialIcon} />
          </a>
          <a href="#linkedin">
            <img src={linkedinIcon} alt="LinkedIn" className={styles.socialIcon} />
          </a>
        </div>
      </div>
      {/* 저작권 */}
      <div className={styles.footerCopyright}>
        CompanyName © 202X. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;