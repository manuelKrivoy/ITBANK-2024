import React from "react";
import styles from "./home.module.css";
import Link from "next/link";
import Image from "next/image"; // Importa el componente Image

const Home = () => {
  return (
    <div>
      <div className={styles.content}>
        <Image className={styles.logo} src="/logo.svg" alt="itbank_logo" width={200} height={100} />
        <Link href="/login" prefetch={true}>
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
