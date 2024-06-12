import React from "react";
import styles from "../../styles/bookingstyles/TicketsBox.module.css";
import BookingButton from "./BookingButton";
import ToolTip from "./ToolTip";

function Ticketsbox({
  ticketChoice,
  setTicketChoice,
  gearChoice,
  setGearChoice,
  page,
  setPage,
}) {
  // FUNKTIONER FOR TICKETS
  function removeRegular() {
    setTicketChoice((old) => {
      return {
        ...old,
        regular: Math.max(0, old.regular - 1),
      };
    });
  }

  function addRegular() {
    if (getTotalTickets() < 5) {
      setTicketChoice((old) => {
        return {
          ...old,
          regular: old.regular + 1,
        };
      });
    }
  }

  function removeVip() {
    setTicketChoice((old) => {
      return {
        ...old,
        vip: Math.max(0, old.vip - 1),
      };
    });
  }

  function addVip() {
    if (getTotalTickets() < 5) {
      setTicketChoice((old) => {
        return {
          ...old,
          vip: old.vip + 1,
        };
      });
    }
  }

  // TOTAL TICKETS
  function getTotalTickets() {
    const total = ticketChoice.regular + ticketChoice.vip;
    return Math.min(total, 5);
  }

  // FUNKTIONER FOR CAMPING
  function removeTwoPersons() {
    setGearChoice((old) => {
      return {
        ...old,
        twotent: Math.max(0, old.twotent - 1),
      };
    });
  }

  function addTwoPersons() {
    setGearChoice((old) => {
      return {
        ...old,
        twotent: old.twotent + 1,
      };
    });
  }

  function removeThreePersons() {
    setGearChoice((old) => {
      return {
        ...old,
        threetent: Math.max(0, old.threetent - 1),
      };
    });
  }

  function addThreePersons() {
    setGearChoice((old) => {
      return {
        ...old,
        threetent: old.threetent + 1,
      };
    });
  }

  function toggleGreenCamp() {
    setGearChoice((old) => {
      return {
        ...old,
        greenCamping: !old.greenCamping,
      };
    });
  }

  function buttonDisabled() {
    return ticketChoice.regular === 0 && ticketChoice.vip === 0;
  }

  return (
    <>
      {/* TICKETBOX */}
      <p className={styles.bookingSubtitle}>Ticket(s)</p>
      <p className={styles.hint}>Max 5 tickets per order</p>
      <div className={styles.ticketLine}>
        <p>Regular Ticket</p>
        <div className={styles.plusMinusCollected}>
          <button onClick={removeRegular} className={styles.miunsPlusButton}>
            -
          </button>
          <span>{ticketChoice.regular}</span>
          <button onClick={addRegular} className={styles.miunsPlusButton}>
            +
          </button>
        </div>
      </div>

      <div className={styles.ticketLine}>
        <p>VIP Ticket</p>
        <div className={styles.plusMinusCollected}>
          <button onClick={removeVip} className={styles.miunsPlusButton}>
            -
          </button>
          <span>{ticketChoice.vip}</span>
          <button onClick={addVip} className={styles.miunsPlusButton}>
            +
          </button>
        </div>
      </div>
      <div>
        <br />
        {/* GEARBOX */}
        <p className={styles.bookingSubtitle}>Tent(s)</p>
        <p className={styles.hint}>Choose the desired amount of camping-gear</p>
        <div className={styles.ticketLine}>
          <p>2-person tent</p>
          <div className={styles.plusMinusCollected}>
            <button
              onClick={removeTwoPersons}
              className={styles.miunsPlusButton}
            >
              -
            </button>
            <span>{gearChoice.twotent}</span>
            <button onClick={addTwoPersons} className={styles.miunsPlusButton}>
              +
            </button>
          </div>
        </div>
      </div>

      <div className={styles.ticketLine}>
        <p>3-person tent</p>
        <div className={styles.plusMinusCollected}>
          <button
            onClick={removeThreePersons}
            className={styles.miunsPlusButton}
          >
            -
          </button>
          <span>{gearChoice.threetent}</span>
          <button onClick={addThreePersons} className={styles.miunsPlusButton}>
            +
          </button>
        </div>
      </div>
      <div className={styles.ticketLine}>
        <div className={styles.greenCamping}>
          <label for="checkbox">Greencamping</label>
          <span> </span>
          <ToolTip ToolTipText="for 250 DKK you can help a great cause and donate to the enviroment"></ToolTip>
        </div>
        <input
          id="checkbox"
          className={styles.checkBox}
          type="checkbox"
          checked={gearChoice.greenCamping}
          onChange={toggleGreenCamp}
        />
      </div>

      {/* BUTTONS */}
      {page !== 4 && (
        <div>
          <BookingButton
            color="blue"
            buttontext={"Continue"}
            onClick={() => setPage((o) => o + 1)}
            disabled={buttonDisabled()}
          ></BookingButton>
        </div>
      )}
    </>
  );
}
export default Ticketsbox;
