import React from "react";
import Link from "next/link";
import styles from "./Program.module.css";
import Image from "next/image";
import Scroll from "../components/Scroll";

export default async function page() {
  // const url = "https://broken-tinted-wombat.glitch.me/bands";
  const url = "http://localhost:8080/bands";
  const res = await fetch(url);
  const bandData = await res.json();

  const topBand = bandData.slice(0, 14);
  const midBand = bandData.slice(14, 27);
  const botBand = bandData.slice(27, 69);

  return (
    <>
      <h1 className={`globalHeader`}>Lineup</h1>
      <div className={styles.programwrapper}>
        <div className={styles.topBandWrapper}>
          {topBand.map((data, svg) => (
            <Link className={styles.topBandStyle} key={data.name} href={`/bands/${data.slug}`}>
              {data.name}
              <div className={styles.starbox}>{svg < topBand.length - 1 && <Image className={styles.star} src="Star.svg" alt="star" width={50} height={50}></Image>}</div>
            </Link>
          ))}
        </div>
        <div className={styles.midBandWrapper}>
          {midBand.map((data, svg) => (
            <Link className={styles.midBandStyle} key={data.name} href={`/bands/${data.slug}`}>
              {data.name}
              <div className={styles.starbox}>{svg < midBand.length - 1 && <Image className={styles.star} src="Star-fill.svg" alt="star" width={50} height={50}></Image>}</div>
            </Link>
          ))}
        </div>
        <div className={styles.botBandWrapper}>
          {botBand.map((data, svg) => (
            <Link className={styles.botBandStyle} key={data.name} href={`/bands/${data.slug}`}>
              {data.name}
              <div className={styles.starbox}>{svg < botBand.length - 1 && <Image className={styles.starsmall} src="Star.svg" alt="star" width={50} height={50}></Image>}</div>
            </Link>
          ))}
        </div>
        <Scroll></Scroll>
      </div>
    </>
  );
}
