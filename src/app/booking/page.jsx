"use client";
import { useState, useEffect } from "react";
import styles from "../booking/Booking.module.css";
import Ticketsbox from "../components/bookingflow/Ticketsbox";
import Availablespots from "../components/bookingflow/Availablespots";
import Ordercomplete from "../components/bookingflow/Ordercomplete";
import Billingform from "../components/bookingflow/Billingform";
import GetTicketInfo from "../components/bookingflow/GetTicketInfo";
import ToolTip from "../components/bookingflow/ToolTip";

import { useMediaQuery } from "react-responsive";

function Booking() {
  const fee = [
    { name: "Fixed booking fee", price: "99", id: 0, type: "fee", amount: 1 },
  ];
  const [data, setData] = useState(null);
  useEffect(() => {
    // fetch("https://broken-tinted-wombat.glitch.me/available-spots")
    fetch("http://localhost:8080/available-spots")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  const [page, setPage] = useState(0);
  const [bookingId, setBookingId] = useState("");

  const [ticketChoice, setTicketChoice] = useState({
    regular: 0,
    vip: 0,
  });

  const [ticketTotal, setTicketTotal] = useState();
  useEffect(() => {
    setTicketTotal(() => {
      const newTotal = ticketChoice.regular + ticketChoice.vip;
      return newTotal;
    });
  }, [ticketChoice]);

  const [gearChoice, setGearChoice] = useState({
    twotent: 0,
    threetent: 0,
    greenCamping: false,
  });

  const isMobile = useMediaQuery({ query: "(max-width: 600px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 601px) and (max-width: 1024px)",
  });

  return (
    <>
      <h1 className={`globalHeader`}>Tickets</h1>
      <div className={styles.bookingMain}>
        <ol
          className={
            isMobile ? styles.breadCrumbsMobile : styles.breadCrumbsWrapper
          }
        >
          <li>
            {/* onClick => setPage sætter siden til det korrekte side ud fra index  */}
            {/*disabled sørger for at brødkrumme kun er brugbar tilbage og ikke frem */}
            <button
              onClick={() => setPage(0)}
              disabled={page === 0}
              className={`button ${page === 0 ? styles.active : ""}`}
            >
              Tickets <span className={styles.space}>/</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => setPage(1)}
              disabled={page <= 1}
              className={`button ${page === 1 ? styles.active : ""}`}
            >
              Ticket Info <span className={styles.space}>/</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => setPage(2)}
              disabled={page <= 2}
              className={`button ${page === 2 ? styles.active : ""}`}
            >
              Camping <span className={styles.space}>/</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => setPage(3)}
              disabled={page <= 3}
              className={`button ${page === 3 ? styles.active : ""}`}
            >
              Billing <span className={styles.space}>/</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => setPage(4)}
              disabled={page <= 4}
              className={`button ${page === 4 ? styles.active : ""}`}
            >
              Confirmed
            </button>
          </li>
        </ol>
        <div
          className={
            isMobile
              ? styles.mobileWrapper
              : isTablet
              ? styles.tabletWrapper
              : styles.desktopWrapper
          }
        >
          <section>
            <div
              className={
                isMobile
                  ? styles.sectionWrapperMobile
                  : isTablet
                  ? styles.sectionWrapperTablet
                  : styles.sectionWrapperDesktop
              }
            >
              {page === 0 && (
                <div>
                  {" "}
                  <Ticketsbox
                    setPage={setPage}
                    ticketChoice={ticketChoice}
                    setTicketChoice={setTicketChoice}
                    gearChoice={gearChoice}
                    setGearChoice={setGearChoice}
                  />
                </div>
              )}
              {page === 1 && (
                <div>
                  <p className={styles.bookingSubtitle}>Ticket(s) Info</p>
                  <p className={styles.hint}>
                    Fill out the information below for each ticketholder
                  </p>
                  <ToolTip ToolTipText="This information is only used to secure your tickets integrety"></ToolTip>
                  <div>
                    <GetTicketInfo
                      setPage={setPage}
                      ticketChoice={ticketChoice}
                    ></GetTicketInfo>
                  </div>
                </div>
              )}
              {page === 2 && (
                <Availablespots
                  setPage={setPage}
                  data={data}
                  ticketTotal={ticketTotal}
                />
              )}
              {page === 3 && (
                <Billingform
                  setBookingId={setBookingId}
                  setPage={setPage}
                ></Billingform>
              )}
              {page === 4 && <Ordercomplete bookingId={bookingId} />}
            </div>
          </section>
          {/* Sørger for ikke at vise kurven på confirmed siden  */}
          {page !== 4 && (
            <section>
              <div
                className={
                  isMobile
                    ? styles.sectionBasketMobile
                    : isTablet
                    ? styles.sectionWrapperTablet
                    : styles.sectionWrapperDesktop
                }
              >
                <div className={styles.basketContent}>
                  <p
                    className={
                      isMobile
                        ? styles.hideInMobile
                        : isTablet
                        ? styles.basketTitle
                        : styles.basketTitle
                    }
                  >
                    sunset sound
                  </p>
                  <p
                    className={
                      isMobile
                        ? styles.hideInMobile
                        : isTablet
                        ? styles.basketSubtitle
                        : styles.basketSubtitle
                    }
                  >
                    Basket
                  </p>
                  <hr
                    className={
                      isMobile
                        ? styles.hideInMobile
                        : isTablet
                        ? styles.hrColor
                        : styles.hrColor
                    }
                  />
                  <div>
                    <div className={styles.feeTickets}>
                      {ticketChoice.regular + ticketChoice.vip > 0 && (
                        <p className={styles.basketSub2}>Ticket(s):</p>
                      )}
                      {ticketChoice.regular > 0 && (
                        <p>Regular Ticket: {ticketChoice.regular}x 799,-</p>
                      )}
                      {ticketChoice.vip > 0 && (
                        <p>VIP Ticket: {ticketChoice.vip}x 1299,-</p>
                      )}
                    </div>
                    <div className={styles.feeTents}>
                      {gearChoice.twotent + gearChoice.threetent > 0 && (
                        <p className={styles.basketSub2}>Tent(s):</p>
                      )}
                      {gearChoice.twotent > 0 && (
                        <p>2-person tent: {gearChoice.twotent}x 299,-</p>
                      )}
                      {gearChoice.threetent > 0 && (
                        <p>3-person tent: {gearChoice.threetent}x 399,-</p>
                      )}
                      {gearChoice.greenCamping && (
                        <p>Green Camping: 1x 250,-</p>
                      )}
                    </div>
                    <hr
                      className={
                        isMobile
                          ? styles.hideInMobile
                          : isTablet
                          ? styles.hrColor
                          : styles.hrColor
                      }
                    />
                    <div>
                      <p className={styles.feeTotal}>
                        Total:{" "}
                        {fee[0].amount * fee[0].price +
                          ticketChoice.regular * 799 +
                          ticketChoice.vip * 1299 +
                          gearChoice.twotent * 299 +
                          gearChoice.threetent * 399 +
                          gearChoice.greenCamping * 250}
                        ,-
                      </p>
                      {fee.map(
                        (item) =>
                          item.amount > 0 && (
                            <div className={styles.feeFixed} key={item.id}>
                              <p>{item.name}&nbsp;</p>
                              <p>{item.price},-</p>
                            </div>
                          )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}

export default Booking;
