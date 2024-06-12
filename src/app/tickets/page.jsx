"use client";
import React, { useRef, useState } from "react";
import styles from "./Tickets.module.css";
import ReactCardFlip from "react-card-flip";
import TicketCardFront from "../components/TicketCardFront";
import TicketCardBack from "../components/TicketCardBack";
import { useMediaQuery } from "react-responsive";
import ScrollToTop from "react-scroll-to-top";
import MainButton from "../components/Button";
import Image from "next/image";

function Tickets() {
  const [isFlippedRegular, setIsFlippedRegular] = useState(false);
  const [isFlippedVIP, setIsFlippedVIP] = useState(false);
  const [isFlipped2PersonTent, setIsFlipped2PersonTent] = useState(false);
  const [isFlipped3PersonTent, setIsFlipped3PersonTent] = useState(false);
  const handleClickRegular = () => {
    setIsFlippedRegular(!isFlippedRegular);
  };

  const handleClickVIP = () => {
    setIsFlippedVIP(!isFlippedVIP);
  };

  const handleClick2PersonTent = () => {
    setIsFlipped2PersonTent(!isFlipped2PersonTent);
  };

  const handleClick3PersonTent = () => {
    setIsFlipped3PersonTent(!isFlipped3PersonTent);
  };
  const isMobile = useMediaQuery({ query: "(max-width: 600px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 601px) and (max-width: 1024px)",
  });

  // scroll
  const TicketsectionRef = useRef(null);
  const TentsectionRef = useRef(null);
  const MapsectionRef = useRef(null);

  const scrollToSection = (sectionRef) => {
    sectionRef.current.scrollIntoView({ behavior: "smooth" });
  };
  //

  return (
    <>
      {" "}
      <div className={styles.sidebar}>
        <ul>
          <li>
            <button onClick={() => scrollToSection(TicketsectionRef)}>
              <Image className={styles.icon} src="Tickets.svg" alt="ticket icon" width={100} height={100} />
            </button>
          </li>
          <li>
            <button onClick={() => scrollToSection(TentsectionRef)}>
              <Image className={styles.icon} src="Camping-Tent.svg" alt="tent icon" width={100} height={100} />
            </button>
          </li>
          <li>
            <button onClick={() => scrollToSection(MapsectionRef)}>
              <Image className={styles.icon} src="Map-Fold.svg" alt="map icon" width={100} height={100} />
            </button>
          </li>
        </ul>
      </div>
      <div className={styles.content}>
        <div ref={TicketsectionRef} className={styles.section}>
          <div>
            <h1 className={`globalHeader`}>Tickets</h1>
            <div className={styles.indexButWrap}>
              <MainButton href={"/booking"} buttontext="Get Tickets" color="primary" />
            </div>
          </div>

          <div className={isMobile ? styles.mobileContainer : isTablet ? styles.tabletContainer : styles.desktopContainer}>
            <div onClick={handleClickRegular}>
              <ReactCardFlip isFlipped={isFlippedRegular} flipDirection="horizontal">
                <TicketCardFront name="REGULAR" desc="Full access, all week, all year" price="799 DKK"></TicketCardFront>
                <TicketCardBack moreinfo="With a regular ticket, attendees can immerse themselves in the festival atmosphere, explore food and beverage options, and discover emerging artists across multiple stages." name="REGULAR"></TicketCardBack>
              </ReactCardFlip>
            </div>
            <div onClick={handleClickVIP}>
              <ReactCardFlip isFlipped={isFlippedVIP} flipDirection="horizontal">
                <TicketCardFront name="VIP" desc="Full access with extra perks" price="1299 DKK"></TicketCardFront>
                <TicketCardBack moreinfo="A VIP ticket to the music festival grants exclusive access to premium viewing areas near the main stage and offers complimentary drinks and snacks throughout the event." name="VIP"></TicketCardBack>
              </ReactCardFlip>
            </div>
          </div>
        </div>
        <div ref={TentsectionRef} className={styles.section}>
          <h2 className={styles.campingTitle}>Camping options</h2>
          <div className={isMobile ? styles.mobileContainer : isTablet ? styles.tabletContainer : styles.desktopContainer}>
            {" "}
            <div onClick={handleClick2PersonTent}>
              <ReactCardFlip isFlipped={isFlipped2PersonTent} flipDirection="horizontal">
                <TicketCardFront name="2-person-tent" desc="A two-person tent installed by Sunset Sound-crew" price="299 DKK" />
                <TicketCardBack moreinfo="Sunset Sound crew offers a range of accommodation options, including cozy two-person tents and spacious three-person tents installed by the skilled Sunset Sound crew." name="2-person-tent" />
              </ReactCardFlip>
            </div>
            <div onClick={handleClick3PersonTent}>
              <ReactCardFlip isFlipped={isFlipped3PersonTent} flipDirection="horizontal">
                <TicketCardFront name="3-person-tent" desc="A three-person tent installed by Sunset Sound-crew" price="399 DKK" />
                <TicketCardBack moreinfo="Sunset Sound crew offers a range of accommodation options, including cozy two-person tents and spacious three-person tents installed by the skilled Sunset Sound crew." name="3-person-tent" />
              </ReactCardFlip>
            </div>
          </div>
        </div>

        <div ref={MapsectionRef} className={styles.section}>
          <h2 className={styles.mapTitle}>Map of the festival</h2>
          <Image className={styles.map} src="map_ufill_5s.svg" alt="map of festival" width={160} height={160}></Image>
        </div>
      </div>
      <ScrollToTop width="38" color="#5e7af5" className={`importantstyle`} smooth />
    </>
  );
}
export default Tickets;
