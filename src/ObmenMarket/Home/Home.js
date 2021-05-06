import { useEffect } from "react";
import { connect } from "react-redux";

import { setFormMode, setProfile } from "../../Redux/Reducers/home";

import {
  resetMetaState,
  onLotCreateFromForm,
  onLotCreateFormCancel,
  publishNewLotFromForm,
} from "../../Redux/Reducers/lots";

import { Warning } from "../Components/Warning/Warning";
import { Cta } from "../Components/CTA/CTA";
import { LotListCont } from "../Components/LotList/LotList";
import { FormFull } from "../Components/FormFull/FormFull";

import styles from "./home.module.scss";

const Home = ({
  isAuth,
  icons,
  user,
  ownerID,
  formFullUI,
  isFormModeOn,
  createLotId,
  setFormMode,
  setProfile,
  onLotCreateFromForm,
  onLotCreateFormCancel,
  publishNewLotFromForm,
  resetMetaState,
}) => {
  useEffect(() => {
    setFormMode(false);
    resetMetaState();
    setProfile(null);
  }, [setFormMode, resetMetaState, setProfile]);

  return (
    <div className={styles.home}>
      <h1 className={styles.welcome}>
        Обменяй ненужное <br />
        на нужное!
      </h1>

      <Cta
        icons={icons}
        isAuth={isAuth}
        isFormModeOn={isFormModeOn}
        setFormMode={setFormMode}
        createLotId={createLotId}
        onLotCreateFromForm={onLotCreateFromForm}
        onLotCreateFormCancel={onLotCreateFormCancel}
      />

      {!isFormModeOn && <LotListCont />}

      {!isAuth && isFormModeOn && <Warning />}

      {isAuth && isFormModeOn && (
        <FormFull
          user={user}
          ownerID={ownerID}
          createLotId={createLotId}
          cloudtail={true}
          icons={icons}
          formFullUI={formFullUI}
          // lotID={createLotId}
          update={false}
          formHandler={publishNewLotFromForm}
        />
      )}
    </div>
  );
};

const mstp = (state) => ({
  isAuth: state.auth.isAuth,
  icons: state.ui.icons,
  user: state.auth.user,
  ownerID: state.auth.ownerID,
  formFullUI: state.ui.formFull,
  isFormModeOn: state.home.isFormModeOn,
  createLotId: state.lots.createLotId,
});

export const HomeCont = connect(mstp, {
  resetMetaState,
  setFormMode,
  setProfile,
  onLotCreateFromForm,
  onLotCreateFormCancel,
  publishNewLotFromForm,
})(Home);
