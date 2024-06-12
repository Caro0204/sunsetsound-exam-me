import React from "react";
import styles from "../../styles/bookingstyles/OrderComplete.module.css";
import MainButton from "../Button";

function Ordercomplete({ bookingId }) {
  return (
    <div className={styles.completeWrapper}>
      <div className={styles.completeTitles}>
        <h2 className={styles.completeHeader}>ORDER COMPLETE!</h2>
        <p>Go check your email for a confirmation.</p>
        <p> UR BOOKING ID IS: {bookingId}</p>
        <p>Return Home or check out the Lineup:</p>
      </div>
      <div className={styles.buttonWrapper}>
        <MainButton href={"/"} buttontext="Home" color="primary" />
        <MainButton href={"/program"} buttontext="Lineup" color="primary" />
      </div>
    </div>
  );
}

export default Ordercomplete;
