import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Route, Switch, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import ProgressBar from "@ramonak/react-progress-bar";
import { fa } from "../Utils/firebase";

import { HeaderCont } from "./Components/Header/Header";
import { LoginCont } from "./Login/Login";
import { HomeCont } from "./Home/Home";
import { ProfileCont } from "./Profile/Profile";
import { LotFullCont } from "./LotFull/LotFull";
import Chat from "./Components/Chat/Chat";
// import { Footer } from "./Components/Footer/Footer";

import { authCheck, onConnectDisconnect } from "../Redux/Reducers/auth";
import { setIsModalOn, setProgress } from "../Redux/Reducers/home";

import styles from "./obmen.module.scss";

const ObmenMarket = ({
  isInitialized,
  isAuth,
  ownerID,
  isModalOn,
  progress,
  setProgress,
  authCheck,
  setIsModalOn,
  onConnectDisconnect,
}) => {
  const history = useHistory();
  const [user, userLoading] = useAuthState(fa);

  useEffect(() => !userLoading && authCheck(user), [
    user,
    authCheck,
    userLoading,
  ]);

  useEffect(() => {
    onConnectDisconnect(ownerID);
  }, [ownerID, onConnectDisconnect]);

  useEffect(() => {
    progress === 100 && setTimeout(() => setProgress(null), 1000);
  }, [progress, setProgress]);

  history.listen(() => isModalOn && setIsModalOn(false));

  return (
    <div className={styles.app}>
      <div
        className={
          progress
            ? `${styles.progress} ${styles.progress_active}`
            : styles.progress
        }
      >
        <ProgressBar
          completed={progress || 0}
          bgColor="#7000ff"
          baseBgColor="#ffffff"
          transitionDuration="0.3s"
          isLabelVisible={false}
          height="2px"
        />
      </div>

      <div
        className={styles.container}
        style={isModalOn ? { filter: "blur(20px)" } : {}}
      >
        <HeaderCont />

        {isInitialized && isAuth && <Chat />}

        <Switch>
          <Route exact path="/" render={() => <HomeCont />} />
          <Route path="/posts/:lotid" render={() => <LotFullCont />} />
          {/* <Route path="/drafts/:id" render={() => <LotFullCont />} /> */}
          <Route path="/login" render={() => <LoginCont />} />
          <Route path="/profile/:id?" render={() => <ProfileCont />} />
        </Switch>

        {/* <Footer /> */}
      </div>
    </div>
  );
};
const mstp = (state) => ({
  progress: state.home.progress,
  isInitialized: state.auth.isInitialized,
  isAuth: state.auth.isAuth,
  ownerID: state.auth.ownerID,
  isModalOn: state.home.isModalOn,
});

export const ObmenMarketApp = connect(mstp, {
  setProgress,
  authCheck,
  setIsModalOn,
  onConnectDisconnect,
})(ObmenMarket);
