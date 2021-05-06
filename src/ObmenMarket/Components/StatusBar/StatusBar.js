import styles from "./statusbar.module.scss";

import offerspic from "../../../Assets/Icons/offers.svg";
import timepic from "../../../Assets/Icons/time.svg";

export const StatusBar = ({ expiryDate, offersQty }) => {
  const diff = new Date(expiryDate) - new Date();
  const date = new Date(diff);

  const hours = {
    tenTo20: "часов",
    one: "час",
    twoTo4: "часа",
    default: "часов",
  };
  const minutes = {
    tenTo20: "минут",
    one: "минута",
    twoTo4: "минуты",
    default: "минут",
  };
  const days = {
    tenTo20: "дней",
    one: "день",
    twoTo4: "дня",
    default: "дней",
  };
  const offers = {
    tenTo20: "предложений",
    one: "предложение",
    twoTo4: "предложения",
    default: "предложений",
  };
  const worder = (value, dict) => {
    switch (true) {
      case value > 10 && value < 21:
        return `${value} ${dict.tenTo20}`;
      case value % 10 === 1:
        return `${value} ${dict.one}`;
      case value % 10 > 1 && value % 10 < 5:
        return `${value} ${dict.twoTo4}`;
      default:
        return `${value} ${dict.default}`;
    }
  };

  const getLeftTime = () => {
    if (diff <= 0) return "Устарел";

    return date.getDate() - 1 === 0
      ? `${worder(date.getHours(), hours)} ${worder(
          date.getMinutes(),
          minutes
        )}`
      : worder(date.getDate() - 1, days);
  };

  return (
    <div className={styles.statusbar}>
      <div className={styles.offers}>
        <img src={offerspic} alt="O" />
        <p>{worder(offersQty, offers)}</p>
      </div>
      <div className={styles.timing}>
        <p>{getLeftTime()}</p>
        <img src={timepic} alt="T" />
      </div>
    </div>
  );
};
