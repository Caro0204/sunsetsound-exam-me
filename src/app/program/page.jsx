"use client";
import React from "react";
import Link from "next/link";
import styles from "./Program.module.css";
import ScrollToTop from "react-scroll-to-top";
import Image from "next/image";

export default async function page() {
  // const url = "https://broken-tinted-wombat.glitch.me/bands";
  const url = "http://localhost:8080/bands";
  const res = await fetch(url);
  const bandData = await res.json();

  const topBand = bandData.slice(0, 14);
  const midBand = bandData.slice(14, 27);
  const botBand = bandData.slice(27, 69);

  console.log(bandData);

  return (
    <>
      <h1 className={`globalHeader`}>Lineup</h1>
      <div className={styles.programwrapper}>
        <div className={styles.topBandWrapper}>
          {topBand.map((data) => (
            <Link className={styles.topBandStyle} key={data.name} href={`/bands/${data.slug}`}>
              {data.name}
            </Link>
          ))}
        </div>
        <div className={styles.midBandWrapper}>
          {midBand.map((data) => (
            <Link className={styles.midBandStyle} key={data.name} href={`/bands/${data.slug}`}>
              {data.name}
            </Link>
          ))}
        </div>
        <div className={styles.botBandWrapper}>
          {botBand.map((data) => (
            <Link className={styles.botBandStyle} key={data.name} href={`/bands/${data.slug}`}>
              {data.name}
            </Link>
          ))}
        </div>
        <ScrollToTop width="38" color="#5e7af5" className={`importantstyle`} smooth />
      </div>
    </>
  );
}
