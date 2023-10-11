import { FC } from "react";
import styles from "../../styles/main.module.css";

const Header: FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <p className={styles.logo}>TREE Categories</p>
      </div>
    </header>
  );
};

export default Header;
