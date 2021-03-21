import styles from "./statusbar.module.scss";

import offerspic from "../../../Assets/Icons/offers.svg";
import timepic from "../../../Assets/Icons/time.svg";

export const StatusBar = (props) => {
  const diff = new Date(props.expiryDate) - new Date();
  const date = new Date(diff);

  const getLeftTime = () => {
    const hours = (value) => {
      switch (true) {
        case value % 10 === 1:
          return `${value} час`;
        case value % 10 > 1 && value % 10 < 5:
          return `${value} часа`;
        default:
          return `${value} часов`;
      }
    };
    const minutes = (value) => {
      switch (true) {
        case value % 10 === 1:
          return `${value} минута`;
        case value % 10 > 1 && value % 10 < 5:
          return `${value} минуты`;
        default:
          return `${value} минут`;
      }
    };
    const days = (value) => {
      switch (true) {
        case value % 10 === 1:
          return `${value} день`;
        case value % 10 > 1 && value % 10 < 5:
          return `${value} дня`;
        default:
          return `${value} дней`;
      }
    };

    if (diff <= 0) return "Устарел";

    return date.getDate() - 1 === 0
      ? `${hours(date.getHours())} ${minutes(date.getMinutes())}`
      : days(date.getDate() - 1);
  };
  
  return (
    <div className={styles.statusbar}>
      <div className={styles.offers}>
        <img src={offerspic} alt="O" />
        <p>{props.offersQty} предложений</p>
      </div>
      <div className={styles.timing}>
        <p>{getLeftTime()}</p>
        <img src={timepic} alt="T" />
      </div>
    </div>
  );
};
