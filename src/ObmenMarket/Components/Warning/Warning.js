import styles from "./warning.module.scss";

import cloudtail from "../../../Assets/Icons/cloudtail.svg";

export const Warning = () => {
  return (
    <div className={styles.warning}>
      <img className={styles.cloudtail} src={cloudtail} alt="tail" />
      <div className={styles.form}>
        <h3 className={styles.title}>Чтобы создать лот для обмена, вам нужно авторизоваться</h3>
        <p className={styles.note}>
          Регистрация произойдёт автоматически, вам не придётся заполнять
          никаких форм!
        </p>
        <p>Воспользуйтесь кнопкой авторизации в правом верхнем углу.</p>
      </div>
    </div>
  );
};
