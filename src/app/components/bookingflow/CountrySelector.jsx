import React, { useState } from "react";
import countries from "../../assets/countries.json";
import styles from "../../styles/bookingstyles/Billingform.module.css";

const CountrySelector = () => {
  const [selectedCountry, setSelectedCountry] = useState("DK");

  const handleChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  return (
    <div className={styles.inputBox}>
      <label htmlFor="country">Country: </label>
      <select
        id="country"
        value={selectedCountry}
        onChange={handleChange}
        className={styles.select}
        placeholder="Denmark"
        required
        name="country"
      >
        {countries.map((country) => (
          <option key={country.countryCode} value={country.countryCode}>
            {country.flag} {country.country}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CountrySelector;
