import Link from "next/link";
import styles from "../schedule/Schedule.module.css";
import Image from "next/image";

function OneSchedule({ band }) {
  return (
    <div className={styles.img_textstyle}>
      {band.act === "break" ? (
        <h3 className={styles.break_text}>–– break ––</h3>
      ) : (
        <Link className={styles.color_container} href={`/bands/${band.slug}`}>
          <Image className={styles.bandimg} src={band.logo && !band.logo.startsWith("https") ? `http://localhost:8080/logos/${band.logo}` : band.logo} alt="cover of the band" width={160} height={160} />
          <span className={styles.band_name}>{band.act}</span>
        </Link>
      )}
    </div>
  );
}

export default OneSchedule;
