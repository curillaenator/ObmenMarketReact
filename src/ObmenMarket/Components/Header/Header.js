import { compose } from "redux";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import { setFormMode } from "../../../Redux/Reducers/home";
import { setIsChatOn, setIsChatTouched } from "../../../Redux/Reducers/chat";

import { ButtonOutline } from "../Button/ButtonOutline";

// import logo from "../../../Assets/Icons/logo.svg";
import logo1 from "../../../Assets/Icons/logo/logo1.svg";
import logo2 from "../../../Assets/Icons/logo/logo2.svg";
import logo3 from "../../../Assets/Icons/logo/logo3.svg";
import chaticon from "../../../Assets/Icons/chat.svg";
import bellicon from "../../../Assets/Icons/bell.svg";

import styles from "./header.module.scss";

const ObmenMarketLogo = () => {
  return (
    <Link to="/" className={styles.logo}>
      <img className={styles.image} src={logo1} alt="" />
      <img className={styles.obmen} src={logo2} alt="" />
      <img className={styles.market} src={logo3} alt="" />
    </Link>
  );
};

const HeaderButton = ({ icon, iconpos = 0, notes, active, handler }) => {
  const canvasClass = active
    ? `${styles.canvas} ${styles.canvas_active}`
    : styles.canvas;

  return (
    <div className={styles.authbutton} onClick={handler}>
      <div className={canvasClass}>
        <img
          src={icon}
          alt=""
          style={{ transform: `translateY(${iconpos}px)` }}
        />
      </div>

      {notes > 0 && <div className={styles.note}>{notes}</div>}
    </div>
  );
};

const Authorized = ({
  user,
  roomsNewMsgs,
  isChatOn,
  setIsChatOn,
  setIsChatTouched,
}) => {
  const handleChatButton = () => {
    setIsChatTouched();
    setIsChatOn(true);
  };

  const notesCnt = Object.keys(roomsNewMsgs)
    .map((id) => roomsNewMsgs[id])
    .reduce((a, b) => a + b, 0);

  return (
    <div className={styles.authorized}>
      <Link to="/profile" className={styles.user}>
        <img src={user.avatar} alt={user.username} />
      </Link>

      <HeaderButton
        icon={chaticon}
        iconpos={2}
        notes={notesCnt}
        active={isChatOn}
        handler={handleChatButton}
      />

      <HeaderButton
        icon={bellicon}
        iconpos={0}
        notes={0}
        active={false}
        handler={() => {}}
      />
    </div>
  );
};

export const Header = ({
  user,
  isAuth,
  isInitialized,
  roomsNewMsgs,
  location,
  isChatOn,
  setFormMode,
  setIsChatOn,
  setIsChatTouched,
}) => {
  const handleLoginButton = () => setFormMode(false);

  const loginButtonClicked = location.pathname === "/login";
  const loginButtonPath = location.pathname === "/login" ? "/" : "/login";

  return (
    <div className={styles.header}>
      <ObmenMarketLogo />

      <div className={styles.pad}>
        {isInitialized && isAuth && (
          <Authorized
            user={user}
            roomsNewMsgs={roomsNewMsgs}
            setIsChatOn={setIsChatOn}
            isChatOn={isChatOn}
            setIsChatTouched={setIsChatTouched}
          />
        )}

        {isInitialized && !isAuth && (
          <Link to={loginButtonPath} className={styles.loginButton}>
            <ButtonOutline
              width={83}
              height={40}
              title="Войти"
              handler={handleLoginButton}
              active={loginButtonClicked}
            />
          </Link>
        )}
      </div>
    </div>
  );
};

const mstp = (state) => ({
  isAuth: state.auth.isAuth,
  user: state.auth.user,
  isInitialized: state.auth.isInitialized,
  isFormModeOn: state.home.isFormModeOn,
  isChatOn: state.chat.isChatOn,
  roomsNewMsgs: state.chat.roomsNewMsgs,
});

export const HeaderCont = compose(
  withRouter,
  connect(mstp, { setFormMode, setIsChatOn, setIsChatTouched })
)(Header);
