import styles from "./styles/page.module.css";
import MainButton from "./components/Button";
import Image from "next/image";

export default async function Home() {
  return (
    <>
      <div className={styles.indexWrap}>
        {/* <div className={styles.indexTitles}> */}
        <Image className={styles.hp_img} src="bbg_ss_play_uf.svg" alt="background image" width={150} height={150}></Image>
        <Image className={styles.hpm_img} src="bbg_ss_mobil.svg" alt="background image mobile" width={150} height={150}></Image>
        <h1 className={styles.indexHeaderTitle}>
          SUNSET <br /> SOUND
        </h1>
        <div className={styles.indexButWrap}>
          <MainButton href={"/booking"} buttontext="Get Tickets" color="primary" />
          <MainButton href={"/program"} buttontext="Lineup" color="primary" />
        </div>
        {/* <h2 className={styles.address}>Main Street 25 7800 FooCity Denmark</h2> */}
        {/* <h2 className={styles.address}>Vibrant Music · Golden Horizons · Endless Memories</h2>
          <h3 className={styles.indexSubTitle}>Experience the Magic of Music Under the Summer Sky</h3> */}
        {/* </div> */}
      </div>
    </>
  );
}
