// components/header/index.jsx
import styles from "./header.module.css";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";

const Header = ({ onNewCategoryClick }) => {
  return (
    <header className={styles.header} role="banner">
      <div className={styles.logoContainer}>
        <h1 className={styles.logo}>ALURA VIRTUALTOURS</h1>
      </div>
      <nav className={styles.nav} aria-label="Main Navigation">
        <Link to="/" className={`${styles.navLink} ${styles.navButton}`}>
          <HomeIcon style={{ verticalAlign: 'middle', color: "success" }} />
        </Link>
        <Link to="/nuevo-video" className={`${styles.navLink} ${styles.newVideoButton}`}>
          <AddIcon style={{ verticalAlign: 'middle', marginRight: '8px' }} /> NUEVO VIDEO
        </Link>
        <button 
          onClick={onNewCategoryClick}
          className={`${styles.navLink} ${styles.newVideoButton}`}
        >
          <AddIcon style={{ verticalAlign: 'middle', marginRight: '8px' }} /> NUEVA CATEGORÍA
        </button>
      </nav>
    </header>
  );
};

export default Header;