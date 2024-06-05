"use client";
import styles from "./Schedule.module.css";
import OneSchedule from "../components/OneSchedule";
import React from "react";
import { useState, useEffect } from "react";
import combineData from "../../lib/combineData";
import { useMediaQuery } from "react-responsive";
import ScrollToTop from "react-scroll-to-top";

function Schedule() {
  const [bands, setbands] = useState();
  const [day, setDay] = useState("mon");
  const [midgard, setMidgard] = useState([]);
  const [vanaheim, setVanaheim] = useState([]);
  const [jotunheim, setJotuneheim] = useState([]);
  const [fullDay, setFullDay] = useState("Monday");
  const [visibleContent, setVisibleContent] = useState(null);

  // mediaquerys //
  const isMobile = useMediaQuery({ query: "(max-width: 600px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 601px) and (max-width: 1024px)",
  });
  const isDesktop = useMediaQuery({ query: "(min-width: 1025px)" });
  //

  async function fetchData(parm) {
    const data = await combineData();
    setbands(data);

    setMidgard(data.Midgard[parm]);
    setVanaheim(data.Vanaheim[parm]);
    setJotuneheim(data.Jotunheim[parm]);
  }

  function showWeekDay(parm) {
    const dayFullName = {
      mon: "Monday",
      tue: "Tuesday",
      wed: "Wednesday",
      thu: "Thursday",
      fri: "Friday",
      sat: "Saturday",
      sun: "Sunday",
    };

    return dayFullName[parm];
  }

  useEffect(() => {
    fetchData(day);
    setFullDay(showWeekDay(day));
  }, [day]);

  //Time
  const insertTimes = () => {
    const list = [];
    for (let i = 0; i < 24; i += 2) {
      i < 10 ? list.push(<h2 className={styles.new_times_title}>0{i}:00</h2>) : list.push(<h2 className={styles.new_times_title}>{i}:00</h2>);
    }
    return (
      <div key={day.day} className={styles.new_times}>
        {list}
      </div>
    );
  };

  const toggleVisibility = (area) => {
    setVisibleContent((prevVisibleContent) => (prevVisibleContent === area ? null : area));
  };

  return (
    <div className={isMobile ? styles.mobileContainer : isTablet ? styles.tabletContainer : styles.desktopContainer}>
      <h1 className={`globalHeader`}>Schedule</h1>
      <div className={styles.days}>
        {["mon", "tue", "wed", "thu", "fri", "sat", "sun"].map((d) => (
          <button key={d} className={styles.button} onClick={() => setDay(d)}>
            {showWeekDay(d).toUpperCase()}
          </button>
        ))}
      </div>
      <div className={styles.weekday}>{fullDay}</div>
      <p className={styles.hideOnDesktop}>Choose a stage:</p>
      <div className={styles.mobileButtons}>
        <button className={`${styles.areabutton} ${visibleContent === "midgard" ? styles.activeButton : ""}`} onClick={() => toggleVisibility("midgard")}>
          MIDGARD
        </button>
        <div></div>
        <div className={`${styles.accordionContent} ${styles.areagrid} ${visibleContent === "midgard" ? styles.showContent : ""}`}>
          {insertTimes()}
          <div className={styles.bandbox}>
            {midgard.map((act) => (
              <OneSchedule key={act.logo} band={act} />
            ))}
          </div>
        </div>
        <button className={`${styles.areabutton} ${visibleContent === "vanaheim" ? styles.activeButton : ""}`} onClick={() => toggleVisibility("vanaheim")}>
          VANAHEIM
        </button>
        <div className={`${styles.accordionContent} ${styles.areagrid} ${visibleContent === "vanaheim" ? styles.showContent : ""}`}>
          {insertTimes()}
          <div className={styles.bandbox}>
            {vanaheim.map((act) => (
              <OneSchedule key={act.logo} band={act} />
            ))}
          </div>
        </div>
        <button className={`${styles.areabutton} ${visibleContent === "jotunheim" ? styles.activeButton : ""}`} onClick={() => toggleVisibility("jotunheim")}>
          JOTUNHEIM
        </button>
        <div className={`${styles.accordionContent} ${styles.areagrid} ${visibleContent === "jotunheim" ? styles.showContent : ""}`}>
          {insertTimes()}
          <div className={styles.bandbox}>
            {jotunheim.map((act) => (
              <OneSchedule key={act.logo} band={act} />
            ))}
          </div>
        </div>
      </div>

      <div className={`${styles.gridwrapper} ${styles.hideOnMobile}`}>
        <div className={styles.new_grid}>
          <h2 className={styles.hidden}>TIME</h2>
          <h3 className={styles.areatitle}>MIDGARD</h3>
          <h3 className={styles.areatitle}>VANAHEIM</h3>
          <h3 className={styles.areatitle}>JOTUNHEIM</h3>
          {insertTimes()}
          <article className={styles.oneschedulegrid}>
            <div className={styles.bandbox}>
              {midgard.map((act) => (
                <OneSchedule key={act.logo} band={act} />
              ))}
            </div>
            <div className={styles.bandbox}>
              {vanaheim.map((act) => (
                <OneSchedule key={act.logo} band={act} />
              ))}
            </div>
            <div className={styles.bandbox}>
              {jotunheim.map((act) => (
                <OneSchedule key={act.logo} band={act} />
              ))}
            </div>
          </article>
        </div>
      </div>
      <ScrollToTop width="38" color="#5e7af5" className={`importantstyle`} smooth />
    </div>
  );
}
export default Schedule;
