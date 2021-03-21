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
  }, []); // сделать очистку слушателя

  return (
    !isFormModeOn && (
      <div className={styles.lots}>
        {lotList &&
          Object.keys(lotList).map((l) => <Lot data={lotList[l]} key={l} />)}
      </div>
    )
  );
};
