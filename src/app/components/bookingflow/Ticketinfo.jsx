import React from "react";
import styles from "../../styles/bookingstyles/TicketInfo.module.css";

function TicketForm({ ticketNumber, ticketType }) {
  return (
    <>
      <div className={styles.infoBoxContent}>
        <p className={styles.ticketType}>{ticketType}</p>
        <p className={styles.ticketNumber}>Ticket {ticketNumber}</p>
        <div>
          <fieldset className={styles.infoBox}>
            <div className={styles.infoBox}>
              <label for="fullname">Full name:</label>
              <p className={styles.hint}>Write your full name including first, middle, and lastname</p>
              <input id="fullname" type="text" name="fullname" required className={styles.inputField} placeholder="Jane Doe" pattern="[A-Za-zæøåÆØÅ]{2,}\s?)*" autoCapitalize="on" autoCorrect="off" />
            </div>
            <div className={styles.infoBox}>
              <label for="email">Email:</label>
              <p className={styles.hint}>Email must contain @</p>
              <input id="email" type="email" name="email" required className={styles.inputField} placeholder="jane@mail.com" pattern="[^@\s]+@[^@\s]+\.[^@\s]+" title="Invalid email address" autoCapitalize="off" autoCorrect="off" />
            </div>
            <div className={styles.infoBox}>
              <label for="phone">Phone-number:</label>
              <p className={styles.hint}>Phone number must be 8 characters end exclude country-code</p>
              <input id="phone" type="tel" name="phone" required inputMode="numeric" className={`${styles.inputField} ${styles.inputTel}`} placeholder="20202020" title="Invalid phone number" pattern="^(?:\d{2}\s?\d{2}\s?\d{2}\s?\d{2}|\d{8})$" maxLength={8} />
            </div>
          </fieldset>
        </div>
      </div>
    </>
  );
}

export default TicketForm;
