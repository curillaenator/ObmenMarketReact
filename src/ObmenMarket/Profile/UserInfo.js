import { ButtonOutline } from "../Components/Button/ButtonOutline";

import styles from "./userinfo.module.scss";

import country from "../../Assets/Icons/profile/country.svg";
import city from "../../Assets/Icons/profile/city.svg";
import mail from "../../Assets/Icons/profile/mail.svg";
import tel from "../../Assets/Icons/profile/tel.svg";

export const UserInfo = ({ ownerID, isOwner, profile, logout, handleEdit }) => {
  const handleLogout = () => logout(ownerID);

  return (
    <div className={styles.userInfo}>
      <div className={styles.shape}></div>
      <img
        className={styles.photo}
        src={profile.avatar}
        alt={profile.username}
      />

      <div className={styles.info}>
        <h2 className={styles.userName}>{profile.username}</h2>

        {isOwner && (
          <div className={styles.buttons}>
            <ButtonOutline
              width={160}
              height={40}
              title="Редактировать"
              handler={handleEdit}
            />

            <ButtonOutline
              width={95}
              height={40}
              title="Выйти"
              handler={handleLogout}
            />
          </div>
        )}

        <div className={styles.details}>
          {isOwner && (
            <div className={styles.item}>
              <img src={tel} alt="Телефон" />
              <p>{profile.tel ? profile.tel : "пользователь не указал"}</p>
            </div>
          )}

          {isOwner && (
            <div className={styles.item}>
              <img src={mail} alt="E-mail" />
              <p>{profile.email ? profile.email : "пользователь не указал"}</p>
            </div>
          )}

          <div className={styles.item}>
            <img src={country} alt="Страна" />
            <p>
              {profile.country ? profile.country : "пользователь не указал"}
            </p>
          </div>

          <div className={styles.item}>
            <img src={city} alt="Город" />
            <p>{profile.city ? profile.city : "пользователь не указал"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
