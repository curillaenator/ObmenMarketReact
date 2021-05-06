import { Button } from "../Button/Button";
import { Search } from "../Search/Search";

import styles from "./cta.module.scss";

export const Cta = ({
  isAuth,
  isFormModeOn,
  setFormMode,
  icons,
  createLotId,
  onLotCreateFromForm,
  onLotCreateFormCancel,
}) => {
  const formModeHandlerUnauthed = () => setFormMode(!isFormModeOn);

  const formModeHandlerAuthed = () => {
    !isFormModeOn ? onLotCreateFromForm() : onLotCreateFormCancel(createLotId);
    setFormMode(!isFormModeOn);
  };

  return (
    <div
      className={styles.cta}
      style={isFormModeOn ? { marginBottom: "13px" } : {}}
    >
      <div className={styles.button}>
        <Button
          width={226}
          height={56}
          title={isFormModeOn ? "Передумал" : "Создать объявление"}
          icon={icons.cta}
          active={isFormModeOn}
          handler={isAuth ? formModeHandlerAuthed : formModeHandlerUnauthed}
        />
      </div>

      <Search icon={icons.search} />
    </div>
  );
};
