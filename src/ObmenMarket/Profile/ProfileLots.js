import { useState } from "react";

import { LotListCont } from "../Components/LotList/LotList";

import styles from "./profilelots.module.scss";

const Title = ({ isOwner, name, title, active, setSelected }) => {
  const activeHandler = () => setSelected(name);

  return (
    <div
      className={
        active === name
          ? `${styles.title} ${styles.title_active}`
          : styles.title
      }
      onClick={activeHandler}
      // style={isOwner ? { cursor: "pointer" } : {}}
    >
      {title}
    </div>
  );
};

export const ProfileLots = ({ isOwner }) => {
  const [selected, setSelected] = useState("published");

  return (
    <>
      <div className={styles.titles}>
        <Title
          name="published"
          title={isOwner ? "Мои лоты" : "Лоты автора"}
          active={selected}
          setSelected={setSelected}
          isOwner={isOwner}
        />

        {/* {isOwner && (
          <Title
            name="drafts"
            title="Черновики"
            active={selected}
            setSelected={setSelected}
            isOwner={isOwner}
          />
        )} */}
      </div>

      <LotListCont myLots={true} />
    </>
  );
};
