import { useEffect, useState } from "react";

import { ButtonGhost } from "../Button/ButtonGhost";

import cloudtailpic from "../../../Assets/Icons/cloudtail.svg";

import styles from "./controls.module.scss";

export const Controls = ({
  icons,
  isAuth,
  isAdmin,
  ownerID,
  isFormModeOn,
  lotMeta,
  history,
  editLot,
  removeLot,
}) => {
  const [isTitles, setIsTitles] = useState(window.innerWidth >= 640);

  useEffect(() => {
    const listener = () => setIsTitles(window.innerWidth >= 640);

    window.addEventListener("resize", listener);
    return () => {
      window.removeEventListener("resize", listener);
    };
  }, []);

  const titler = (ttl) => (isTitles ? ttl : "");

  return (
    <div className={styles.controls}>
      <ButtonGhost
        title={titler("Назад")}
        handler={history.goBack}
        icon={icons.back}
      />

      <div className={styles.options}>
        <ButtonGhost
          title={titler("Поделиться")}
          handler={() => {}}
          icon={icons.share}
          // disabled={true}
        />
        {isAuth && (ownerID === lotMeta.uid || isAdmin) && (
          <>
            <div className={styles.editbtn}>
              <ButtonGhost
                title={titler("Редактировать")}
                handler={editLot}
                icon={icons.edit}
                active={isFormModeOn}
                shape={true}
              />

              {isFormModeOn && (
                <img
                  className={styles.cloudtail}
                  src={cloudtailpic}
                  alt="tail"
                />
              )}
            </div>

            <ButtonGhost
              title={titler("Удалить")}
              handler={() => removeLot(lotMeta.postid, history)}
              icon={icons.delete}
              danger={true}
            />
          </>
        )}
      </div>
    </div>
  );
};
