import { useState, useEffect } from "react";
import { Lot } from "../../Components/Lot/Lot";

import { db } from "../../../Utils/firebase";

import styles from "./lots.module.scss";

export const Lots = ({ isFormModeOn }) => {
  const [lotList, setLotList] = useState([]);
  useEffect(() => {
    db.ref("posts").on("value", (snapshot) => {
      setLotList(snapshot.val());
    });
  }, []);

  const lotsDisplay = isFormModeOn ? { display: "none" } : {};
  return (
    <div className={styles.lots} style={lotsDisplay}>
      {Object.keys(lotList).map((l) => (
        <Lot data={lotList[l]} key={l} />
      ))}
    </div>
  );
};
