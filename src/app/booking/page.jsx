"use client";
import { useState, useEffect } from "react";
import styles from "../booking/Booking.module.css";
import Ticketsbox from "../components/Ticketsbox";
import Gearbox from "../components/Gearbox";
import Availablespots from "../components/Availablespots";
import Ordercomplete from "../components/Ordercomplete";
import Billingform from "../components/Billingform";
import TicketForm from "../components/Ticketinfo";

function Booking() {
  const fee = [{ name: "Fixed booking fee", price: "99", id: 0, type: "fee", amount: 1 }];

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
  console.log(ticketTotal);
  const [gearChoice, setGearChoice] = useState({
    twotent: 0,
    threetent: 0,
  });

  const [formData, setFormData] = useState({
    regular: [],
    vip: [],
  });
  const handleFormDataChange = (type, index, field, value) => {
    setFormData((prev) => {
      const newFormData = { ...prev };
      if (!newFormData[type][index]) {
        newFormData[type][index] = {};
      }
      newFormData[type][index][field] = value;
      return newFormData;
    });
  };
  return (
    <>
      <h1>Get Tickets</h1>
      <div className={styles.bookingMain}>
        <ol className={styles.breadCrumbsWrapper}>
          <li>
            <button onClick={() => setPage(0)}>Tickets</button>
          </li>
          <li>
            <button onClick={() => setPage(1)}>Ticket Info</button>
          </li>
          <li>
            <button onClick={() => setPage(2)}>Camping</button>
          </li>
          <li>
            <button onClick={() => setPage(3)}>Billing</button>
          </li>
          <li>
            <button onClick={() => setPage(4)}>Confirmed</button>
          </li>
        </ol>
        <div className={styles.bookingWrapper}>
          <section>
            {page === 0 && (
              <div>
                {" "}
                <Ticketsbox ticketChoice={ticketChoice} setTicketChoice={setTicketChoice} /> <Gearbox gearChoice={gearChoice} setGearChoice={setGearChoice} />{" "}
              </div>
            )}
            {page === 1 && <h1>ticket info</h1>}
            {page === 2 && <Availablespots data={data} ticketTotal={ticketTotal} />}
            {page === 3 && <Billingform></Billingform>}
            {page === 4 && <Ordercomplete />}
            <button onClick={() => setPage((o) => Math.max(o - 1, 0))}>Back</button>
            <button className={styles.nextbutton} onClick={() => setPage((o) => Math.min(o + 1, 4))}>
              Next
            </button>
          </section>
          <section className={styles.basketWrapper}>
            <h2>sunset sound</h2>
            <h2>Basket</h2>
            <hr />
            <div className={styles.feeTickets}>
              <h3>Ticket(s):</h3>
              <p>Regular Ticket: {ticketChoice.regular}x 799,-</p>
              <p>VIP Ticket: {ticketChoice.vip}x 1299,-</p>
            </div>
            <div className={styles.feeTents}>
              <h3>Tent(s):</h3>
              <p>2-person tent: {gearChoice.twotent}x 299,-</p>
              <p>3-person tent: {gearChoice.threetent}x 399,-</p>
            </div>
            <p className={styles.feeTotal}>Total: {fee[0].amount * fee[0].price + ticketChoice.regular * 799 + ticketChoice.vip * 1299 + gearChoice.twotent * 299 + gearChoice.threetent * 399},-</p>
            {fee.map((item) => (
              <div className={styles.feeFixed} key={item.id}>
                <p>{item.name}&nbsp;</p>
                <p>{item.price},-</p>
              </div>
            ))}
          </section>
        </div>
      </div>
      /
    </>
  );
}

export default Booking;
