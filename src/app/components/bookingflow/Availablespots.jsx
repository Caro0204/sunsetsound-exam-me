"use client";
import React from "react";
import { useState } from "react";
import styles from "../../styles/bookingstyles/AvailableSpots.module.css";
import BookingButton from "./BookingButton";
import Image from "next/image";

export default function Availablespots({ data, ticketTotal, page, setPage }) {
  const [spots, setSpots] = useState(data);
  const [selectedArea, setSelectedArea] = useState(null);

  const handleSelection = (event) => {
    const selectedArea = event.target.value;
    const area = spots.find((spot) => spot.area === selectedArea);
    if (area.available >= ticketTotal) {
      setSelectedArea(selectedArea);
    }
  };

  const selectionMade = () => selectedArea !== null;

  // image
  const [showMap, setShowMap] = useState(false);

  const handleMapClick = () => {
    setShowMap(true);
  };

  const handleMapHideClick = () => {
    setShowMap(false);
  };

  //

  return (
    <>
      <form>
        <fieldset>
          <legend className={styles.bookingSubtitle}>Camping area</legend>
          <p className={styles.hint}>Choose your desired camping area</p>
          {spots.map(
            (spot, index) =>
              ticketTotal < spot.available && (
                <div className={styles.camping} key={index}>
                  <div className={styles.camping_spot_title}>
                    <label htmlFor={`campingArea${index}`}>{spot.area}</label>
                  </div>
                  <div>
                    <input
                      className={styles.radiobutton}
                      type="radio"
                      name="campingArea"
                      id={`campingArea${index}`}
                      value={spot.area}
                      onChange={handleSelection}
                    />
                    <span>{spot.available} spots available</span>
                  </div>
                </div>
              )
          )}
        </fieldset>
      </form>
      <div>
        {" "}
        <p className={styles.maptext} onClick={handleMapClick}>
          Click here to show map
        </p>
        {showMap && (
          <div className={styles.mapoverlay} onClick={handleMapHideClick}>
            <Image
              className={styles.map}
              src="map_ufill_5s.svg"
              alt="map of festival"
              width={160}
              height={160}
            ></Image>
          </div>
        )}
      </div>
      {page !== 4 && (
        <div>
          <BookingButton
            buttontext={"Continue"}
            color="blue"
            onClick={() => setPage((o) => o + 1)}
            disabled={!selectionMade()}
          ></BookingButton>
        </div>
      )}
    </>
  );
}
