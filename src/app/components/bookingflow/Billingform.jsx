import React from "react";
import styles from "../../styles/bookingstyles/Billingform.module.css";

import { addBooking } from "../../../lib/data";
import BookingButton from "./BookingButton";

function Billingform({ setPage, setBookingId }) {
  const checkForError = (e) => {
    if (e.target.name == "expodate") {
      if (e.target.value.toString().length === 2) e.target.value = e.target.value + "/";
      else if (e.target.value.toString().length === 3 && e.target.value.toString().charAt(2) === "/") e.target.value = e.target.value.replace("/", "");
    }
  };

  function formHandler(e) {
    setPage(4);
    e.preventDefault();

    let info = {};
    const formData = new FormData(e.target);
    info.fullname = formData.get("fullname");
    info.address = formData.get("address");
    info.city = formData.get("city");
    info.zip = formData.get("zip");
    info.email = formData.get("email");
    info.tele = formData.get("phone");

    info.userid = self.crypto.randomUUID();
    setBookingId(info.userid);

    addBooking(info);
  }

  return (
    <div>
      <form className={styles} onSubmit={formHandler}>
        <fieldset>
          <p>Billing Information</p>
          <div className={styles.inputBox}>
            <label htmlFor="name">Full name</label>
            <input className={styles.inputField} name="fullname" id="name" type="text" placeholder="Lars Larsen" pattern="[A-Za-zæøåÆØÅ]{2,}\s?)+" required />
          </div>
          <div className={styles.smallerField}>
            <div className={styles.inputBox}>
              <label htmlFor="email">Email</label>
              <input className={styles.inputField} name="email" id="email" type="email" placeholder="lars@mail.com" pattern="[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required />
            </div>
            <div className={styles.inputBox}>
              <label htmlFor="phone">Phone</label>
              <input className={styles.inputField} name="phone" id="phone" type="tel" placeholder="2323 2323" pattern="[+0-9]{8,}" required inputmode="numerical" />
            </div>
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="address">Address</label>
            <input className={styles.inputField} name="address" id="address" type="text" placeholder="Larsvej 50 2 th" required />
          </div>
          <div className={styles.smallerField}>
            <div className={styles.inputBox}>
              <label htmlFor="zip">Zip</label>
              <input className={styles.inputField} name="zip" id="zip" placeholder="2300" pattern="[+0-9]{4,}" required inputmode="numerical" />
            </div>
            <div className={styles.inputBox}>
              <label htmlFor="city">City</label>
              <input className={styles.inputField} name="city" id="city" placeholder="Copenhagen" required />
            </div>
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="country">County</label>
            <input className={styles.inputField} name="country" id="country" placeholder="Denmark" required />
          </div>
          <div className={styles.paymentSection}>
            <p>Credit Card Details</p>
            <div className={styles.inputBox}>
              <label htmlFor="cardnumber">Cardnumber</label>
              <input className={styles.inputField} name="cardnumber" id="cardnumber" placeholder="1122 3344 5566 7788" required maxLength={16} inputmode="numerical" pattern="[0-9]{16}" />
            </div>
            <div className={styles.smallerField}>
              <div className={styles.inputBox}>
                <label htmlFor="expodate">Exp. Date</label>
                <input className={styles.inputField} name="expodate" id="expodate" placeholder="MM/YY" required maxLength={5} inputmode="numerical" onChange={checkForError} pattern="[0-1][0-9][/][0-9]{2}" />
              </div>
              <div className={styles.inputBox}>
                <label htmlFor="cvc">CVC</label>
                <input className={styles.inputField} name="cvc" id="cvc" placeholder="CVC" required maxLength={3} pattern="[0-9]{3}" />
              </div>
            </div>
          </div>
          <BookingButton color="green" buttontext={"Confirm"}></BookingButton>
        </fieldset>
      </form>
    </div>
  );
}

export default Billingform;
