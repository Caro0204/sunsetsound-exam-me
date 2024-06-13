import React from "react";
import styles from "../../styles/bookingstyles/Billingform.module.css";
import { addBooking } from "../../../lib/data";
import BookingButton from "./BookingButton";

function Billingform({ setPage, setBookingId }) {
  const checkForError = (e) => {
    if (e.target.name == "expodate") {
      if (e.target.value.toString().length === 2)
        e.target.value = e.target.value + "/";
      else if (
        e.target.value.toString().length === 3 &&
        e.target.value.toString().charAt(2) === "/"
      )
        e.target.value = e.target.value.replace("/", "");
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
          <legend className={styles.bookingSubtitle}>
            Billing Information
          </legend>
          <p className={styles.hint}>
            Please fill out the information for the desired billing address
          </p>
          <div className={styles.inputBox}>
            <label htmlFor="fullname">Full name</label>
            <p className={styles.hint}>
              Write you full name including first, middle, and lastname
            </p>
            <input
              className={styles.inputField}
              name="fullname"
              id="fullname"
              type="text"
              placeholder="Jane Doe"
              pattern="[A-Za-zæøåÆØÅ]{2,}\s?)+"
              autoCapitalize="on"
              autoCorrect="off"
              title="Please fill out full name"
              required
            />
          </div>
          {/* <div className={styles.smallerField}> */}
          <div className={styles.inputBox}>
            <label htmlFor="email">Email</label>

            <input
              className={styles.inputField}
              name="email"
              id="email"
              type="email"
              placeholder="jane@mail.com"
              pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
              title="Invalid email address"
              autoCapitalize="off"
              autoCorrect="off"
            />
            {/* </div> */}
            <div className={styles.inputBox}>
              <label htmlFor="phone">Phone</label>
              <p className={styles.hint}>
                Must be 8 characters end exclude country-code
              </p>
              <input
                id="phone"
                type="tel"
                name="phone"
                required
                inputMode="numeric"
                className={`${styles.inputField} ${styles.inputTel}`}
                placeholder="20202020"
                title="Invalid phone number"
                pattern="^(?:\d{2}\s?\d{2}\s?\d{2}\s?\d{2}|\d{8})$"
                maxLength={8}
              />
            </div>
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="address">Address</label>
            <p className={styles.hint}>
              Fill out full address including number and/or floor
            </p>
            <input
              className={styles.inputField}
              name="address"
              id="address"
              type="text"
              placeholder="Streetname 1 st.tv"
              title="Invalid address"
              autoCapitalize="on"
              required
            />
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="zip">Zip</label>

            <input
              className={`${styles.inputField} ${styles.inputZip}`}
              name="zip"
              id="zip"
              placeholder="2000"
              title="Invalid zip"
              pattern="[+0-9]{4,}"
              required
              inputmode="numeric"
            />
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="city">City</label>

            <input
              className={styles.inputField}
              name="city"
              id="city"
              type="text"
              title="Invalid city"
              placeholder="Copenhagen"
              autoCapitalize="on"
              autoCorrect="on"
              required
            />
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="country">County</label>
            <input
              className={styles.inputField}
              name="country"
              id="country"
              placeholder="Denmark"
              required
            />
          </div>
          <div className={styles.paymentSection}>
            <legend className={styles.bookingSubtitle}>
              Credit Card Details
            </legend>
            <p className={styles.hint}>
              Credit card details doesn't have to match the billing info
            </p>
            <div className={styles.inputBox}>
              <label htmlFor="cardholdername">Cardholders Name</label>
              <input
                className={styles.inputField}
                name="cardholdername"
                id="cardholdername"
                type="text"
                placeholder="Jane Doe"
                pattern="[A-Za-zæøåÆØÅ]{2,}\s?)+"
                autoCapitalize="on"
                autoCorrect="off"
                title="Please fill out cardholders full name"
                required
              />
            </div>
            <div className={styles.inputBox}>
              <label htmlFor="cardnumber">Cardnumber</label>
              <input
                className={`${styles.inputField} ${styles.inputCn}`}
                name="cardnumber"
                id="cardnumber"
                placeholder="1122 3344 5566 7788"
                required
                maxLength={16}
                inputmode="numerical"
                pattern="[0-9]{16}"
                title="Please fill out cardnumber"
              />
            </div>
            <div className={styles.smallerField}>
              <div className={styles.inputBox}>
                <label htmlFor="expodate">Exp. Date</label>
                <input
                  className={`${styles.inputField} ${styles.inputExp}`}
                  name="expodate"
                  id="expodate"
                  placeholder="MM/YY"
                  required
                  maxLength={5}
                  inputmode="numerical"
                  onChange={checkForError}
                  pattern="[0-1][0-9][/][0-9]{2}"
                  title="Please fill out exp. date"
                />
              </div>
              <div className={styles.inputBox}>
                <label htmlFor="cvc">CVC</label>
                <input
                  className={`${styles.inputField} ${styles.inputCvc}`}
                  name="cvc"
                  id="cvc"
                  placeholder="CVC"
                  required
                  maxLength={3}
                  pattern="[0-9]{3}"
                  title="Please fill out CVC"
                />
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
