import loader from "../../../Assets/Images/loader.svg";

import styles from "./loading.module.scss";

export const Loading = () => {
  return (
    <div className={styles.loading}>
      <img src={loader} alt="" />
      <p>Загрузка...</p>
    </div>
  );
};
