// components/footer/index.jsx
import styles from "./footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.footerContainer}>
        <p className={styles.text}>
          © 2025 Alura VirtualTours. Todos los derechos reservados.
        </p>
        <p className={styles.text}>
          Diseñado con 💙.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
