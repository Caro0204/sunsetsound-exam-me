"use client";
import React from "react";
import styles from "../tickets/Tickets.module.css"; // Antag at stierne til CSS-modulerne er korrekte
import MainButton from "./Button";

function TicketCardBack({ name, moreinfo }) {
  return (
    <div className={styles.card}>
      <div className={styles.backContent}>
        <p className={styles.topP}>sunset sound 2024</p>
        <p className={styles.name}>{name}</p>
        <p className={styles.moreInfo}>{moreinfo}</p>
      </div>
      <div className={styles.indexButWrap}>
        <MainButton href={"/tickets"} buttontext="Buy" color="primary" />
        <MainButton href={""} buttontext="Back" color="pink" />
      </div>
    </div>
  );
}

export default TicketCardBack;
