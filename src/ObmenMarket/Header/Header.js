import { compose } from "redux";
import { connect } from "react-redux";
import { Button } from "../Components/Button/Button";
import { Link, withRouter } from "react-router-dom";

import { setFormMode } from "../../Redux/Reducers/home";

import logo from "../../Assets/Icons/logo.svg";

import styles from "./header.module.scss";

const User = ({ user }) => {
  return (
    <Link to="/profile" className={styles.user}>
      <p>{user.username}</p>
      <img src={user.avatar} alt={user.username} />
    </Link>
  );
};

export const Header = (props) => {
  const handleLoginButton = () => props.setFormMode(false);

  const loginButtonClicked = props.location.pathname === "/login";
  const loginButtonPath = props.location.pathname === "/login" ? "/" : "/login";

  return (
    <div className={styles.header}>
      <div className={styles.pad}>
        <Link to="/" className={styles.logo}>
          <img src={logo} alt={props.appName} />
        </Link>
      </div>

      <div className={styles.pad}>
        {!props.userLoading && props.isAuth && <User user={props.user} />}

        {!props.userLoading && !props.isAuth && (
          <Link to={loginButtonPath} className={styles.loginButton}>
            <Button
              width={83}
              height={40}
              title="Вход"
              handler={handleLoginButton}
              active={loginButtonClicked}
            />
          </Link>
        )}
        {/* <Link to={loginButtonPath} className={styles.loginButton}>
          <Button
            width={83}
            height={40}
            title="Вход"
            handler={handleLoginButton}
            active={loginButtonClicked}
          />
        </Link> */}
      </div>
    </div>
  );
};

const mstp = (state) => ({
  isAuth: state.auth.isAuth,
  user: state.auth.user,
  icons: state.ui.icons,
  isFormModeOn: state.home.isFormModeOn,
});

export const HeaderCont = compose(
  withRouter,
  connect(mstp, { setFormMode })
)(Header);
