import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { Welcome } from "./Welcome/Welcome";
import { Cta } from "./CTA/CTA";
import { Lots } from "./Lots/Lots";
import { Warning } from "./Warning/Warning";
import { FormFull } from "../Components/FormFull/FormFull";

import { setFormMode } from "../../Redux/Reducers/home";

import {
  onLotCreateFromForm,
  onLotCreateFormCancel,
  publishNewLotFromForm,
} from "../../Redux/Reducers/lots";

import styles from "./home.module.scss";

const Home = (props) => {
  if (props.isCurrentLot) return <Redirect to="/post" />;
  return (
    <div className={styles.home}>
      <Welcome />
      <Cta
        icons={props.icons}
        isAuth={props.isAuth}
        isFormModeOn={props.isFormModeOn}
        setFormMode={props.setFormMode}
        createLotId={props.createLotId}
        onLotCreateFromForm={props.onLotCreateFromForm}
        onLotCreateFormCancel={props.onLotCreateFormCancel}
      />
      <Lots isFormModeOn={props.isFormModeOn} />
      {!props.isAuth && props.isFormModeOn && <Warning />}
      {props.isAuth && (
        <FormFull
          isFormModeOn={props.isFormModeOn}
          icons={props.icons}
          furmFullUi={props.furmFullUi}
          createLotId={props.createLotId}
          publishNewLotFromForm={props.publishNewLotFromForm}
        />
      )}
    </div>
  );
};

const mstp = (state) => ({
  isAuth: state.auth.isAuth,
  icons: state.ui.icons,
  furmFullUi: state.ui.formFull,
  isFormModeOn: state.home.isFormModeOn,
  createLotId: state.lots.createLotId,
});

export const HomeCont = connect(mstp, {
  setFormMode,
  onLotCreateFromForm,
  onLotCreateFormCancel,
  publishNewLotFromForm,
})(Home);
