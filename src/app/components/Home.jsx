import styles from "./home.module.css";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Home = () => {
  return (
    <div>
      <div className={styles.content}>
        <img className={styles.logo} src="./logo.svg" alt="logo" />
        <Link href="/login">
          <button className={styles.seParte}>Forma parte</button>
        </Link>
      </div>

      <div className={`${styles.light} ${styles.x1}`}></div>
      <div className={`${styles.light} ${styles.x2}`}></div>
      <div className={`${styles.light} ${styles.x3}`}></div>
      <div className={`${styles.light} ${styles.x4}`}></div>
      <div className={`${styles.light} ${styles.x5}`}></div>
      <div className={`${styles.light} ${styles.x6}`}></div>
      <div className={`${styles.light} ${styles.x7}`}></div>
      <div className={`${styles.light} ${styles.x8}`}></div>
      <div className={`${styles.light} ${styles.x9}`}></div>
    </div>
  );
};

export default Home;
