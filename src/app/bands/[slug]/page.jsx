import React from "react";
import combinedData from "../../../lib/combineData";
import { getData } from "../../../lib/data";
import Image from "next/image";
import styles from "./Bandname.module.css";
import NotFound from "../../not-found";
import Link from "next/link";

export async function generateStaticParams() {
  const data = await getData("bands");
  return data.map((oneBand) => ({
    slug: oneBand.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = params;
  const fetchData = await getData("bands");
  const filterData = fetchData.filter((oneBand) => oneBand.slug === slug);
  const data = filterData[0];
}

// funktion til opdeling af band members:
function formatBandMembers(members) {
  const len = members.length;
  if (len === 0) {
    return "";
  } else if (len === 1) {
    return members[0];
  } else if (len === 2) {
    return `${members[0]} & ${members[1]}`;
  } else {
    return `${members.slice(0, -1).join(", ")} & ${members[len - 1]}`;
  }
}

export default async function page({ params }) {
  const { slug } = params;
  const fetchData = await combinedData();
  const filterData = Object.entries(fetchData).map((venue) => {
    const filtered = Object.entries(venue[1]).map((oneDay) => oneDay[1].filter((band) => band.slug === slug));
    return filtered;
  });

  const dataFlattend = filterData.flat(Infinity);
  const data = dataFlattend[0];
  const dayFullName = {
    mon: "Monday",
    tue: "Tuesday",
    wed: "Wednesday",
    thu: "Thursday",
    fri: "Friday",
    sat: "Saturday",
    sun: "Sunday",
  };

  const randomBandsData = await getData("bands");
  const remainingBands = randomBandsData.filter((band) => band.slug !== slug);

  const shuffledBands = remainingBands.sort(() => 0.5 - Math.random());
  const randomBands = shuffledBands.slice(0, 3);

  const slicedBio = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "..";
    }
    return text;
  };

  if (!data) return NotFound();
  const formattedMembers = formatBandMembers(data.members);

  return (
    <>
      <h1 className={`${styles.bandName} globalHeader`}>{data.act}</h1>
      <section className={styles.bandWrapper}>
        <div>
          <div>
            <p className={styles.bandBio}>{data.bio}</p>
            <p className={styles.bandHype}>
              Let {data.act} take you on a {data.genre}-journey, guided by the incredible talents of {formattedMembers}.
            </p>
          </div>
          <div className={styles.infoWrapper}>
            <p className={styles.dataWrapper}>{dayFullName[data.day]}</p>
            <p className={styles.dataWrapper}>
              {data.start}-{data.end}
            </p>
            <p className={styles.dataWrapper}>{data.venue}</p>
          </div>
        </div>
        <Image className={styles.bandImage} src={data.logo && !data.logo.startsWith("https") ? `http://localhost:8080/logos/${data.logo}` : data.logo} alt="cover of the band" width={160} height={160} />
      </section>

      <section className={styles.randomBandsSection}>
        <h2 className={styles.randomBandsHeader}>You might also like</h2>
        <div className={styles.randomBandsWrapper}>
          {randomBands.map((band) => (
            <div key={band.slug}>
              <Link href={`/bands/${band.slug}`} className={styles.bandLink}>
                <div>
                  <Image className={styles.randomBandImage} src={band.logo && !band.logo.startsWith("https") ? `http://localhost:8080/logos/${band.logo}` : band.logo} alt={`cover of ${band.name}`} width={160} height={160} />
                </div>
                <h3 className={styles.randomBandsSubH}>{band.name}</h3>
                <p className={styles.dataWrapper}>{band.genre}</p>
                <p>{slicedBio(band.bio, 150)}</p>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
