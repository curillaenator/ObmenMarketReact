import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { fa } from "../Utils/firebase";

import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import { HeaderCont } from "./Header/Header";
import { LoginCont } from "./Login/Login";
import { HomeCont } from "./Home/Home";
import { ProfileCont } from "./Profile/Profile";
import { LotFullCont } from "./LotFull/LotFull";

import { googleSignIn } from "../Redux/Reducers/auth";

import styles from "./obmen.module.scss";

function Obmen({ googleSignIn, ...props }) {
  const [user, userLoading] = useAuthState(fa);
  useEffect(() => user && googleSignIn(user), [user, googleSignIn]);

  return (
    <div className={styles.container}>
      <HeaderCont isFormModeOn={props.isFormModeOn} userLoading={userLoading} />
      <Switch>
        <Route exact path="/" render={() => <HomeCont />} />
        <Route path="/posts/:id" render={() => <LotFullCont />} />
        <Route path="/login" render={() => <LoginCont />} />
        <Route path="/profile" render={() => <ProfileCont />} />
      </Switch>
    </div>
  );
}
const mstp = (state) => ({});

export const ObmenCont = connect(mstp, { googleSignIn })(Obmen);
